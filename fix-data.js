const fs = require('fs');
console.log('📂 Loading data.json...');
const data = JSON.parse(fs.readFileSync('./data.json'));
console.log(`✅ Loaded ${data.length} records\n`);

let urlFixCount = 0;
let urlBrokenCount = 0;
let urlEncodedCount = 0;

const fixed = data.map((i, index) => {
    // 1. Existing Fixes (Booleans & Quantities)
    if (i.is_part_of !== undefined) i.is_part_of = !!+i.is_part_of;
    if (i.iiif !== undefined) i.iiif = !!+i.iiif;
    if (i.is_free_cultural_works_license !== undefined) i.is_free_cultural_works_license = !!+i.is_free_cultural_works_license;

    // Remove deprecated fields
    delete i.has_post;
    delete i.post_url;
    delete i.library_name_slug;
    delete i.last_edited;
    delete i.notes;
    delete i.created_at;
    delete i.updated_at;
    delete i.lat;
    delete i.lng;
    delete i.is_disabled;

    // 2. IMPROVED: URL Sanitizer with encoding
    if (i.website) {
        const originalUrl = i.website;
        let url = i.website.toString().trim();
        console.log(`\n🔗 Record #${index + 1}: Processing URL`);
        console.log(`   Original: ${originalUrl}`);

        // Remove invalid URL characters (square brackets, curly braces, pipes, etc.)
        const beforeClean = url;
        url = url.replace(/[\[\]{}|\\^`"]/g, '');
        if (beforeClean !== url) {
            console.log(`   ✂️  Removed invalid chars: ${beforeClean} → ${url}`);
        }

        // Decode HTML entities
        const beforeDecode = url;
        url = url.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'");
        if (beforeDecode !== url) {
            console.log(`   🔤 Decoded entities: ${beforeDecode} → ${url}`);
        }

        // Handle protocol-relative URLs
        if (url.startsWith('//')) {
            console.log(`   🌐 Added https protocol to protocol-relative URL`);
            url = 'https:' + url;
        }

        // Fix missing protocol (www. or domain-like -> https://)
        if (!url.startsWith('http') && url.includes('.')) {
            console.log(`   🌐 Added https:// protocol to domain`);
            url = 'https://' + url;
        }

        // Split URL into base and query/fragment parts
        try {
            const urlObj = new URL(url);

            // Encode query parameters that contain special characters
            if (urlObj.search) {
                console.log(`   📋 Found query parameters, encoding...`);
                const params = new URLSearchParams();
                urlObj.search.slice(1).split('&').forEach(param => {
                    const [key, value] = param.split('=');
                    if (key && value !== undefined) {
                        // Decode first to avoid double-encoding, then encode properly
                        params.append(decodeURIComponent(key), decodeURIComponent(value));
                    }
                });
                urlObj.search = params.toString();
                urlEncodedCount++;
            }

            url = urlObj.toString();
            console.log(`   ✅ Valid URL parsed successfully`);
        } catch (e) {
            console.log(`   ⚠️  URL parsing failed, fallback encoding: ${e.message}`);
            // If URL parsing fails, fallback to basic encoding
            const [base, query] = url.split('?');
            if (query) {
                url = base + '?' + encodeURI(query).replace(/%25/g, '%');
            }
        }

        // Remove trailing slashes
        if (url.endsWith('/')) {
            console.log(`   ✂️  Removed trailing slash`);
            url = url.replace(/\/$/, '');
        }

        // Handle completely broken URLs
        if (url.length < 10 || !url.match(/https?:\/\/.+\..+/)) {
            console.log(`   ❌ BROKEN URL detected - using placeholder`);
            url = 'http://url-pending-update.com';
            urlBrokenCount++;
        }

        if (originalUrl !== url) {
            urlFixCount++;
            console.log(`   🔄 Final: ${url}`);
        }

        i.website = url;
    }

    return i;
});

fs.writeFileSync('./data.json', JSON.stringify(fixed, null, 4));

console.log(`\n${'='.repeat(50)}`);
console.log('📊 SUMMARY:');
console.log(`${'='.repeat(50)}`);
console.log(`✅ Total records processed: ${data.length}`);
console.log(`🔧 URLs fixed: ${urlFixCount}`);
console.log(`📋 URLs with parameters encoded: ${urlEncodedCount}`);
console.log(`❌ Broken URLs replaced: ${urlBrokenCount}`);
console.log(`${'='.repeat(50)}`);
console.log('✅ Data cleaned: URLs encoded and sanitized.');
