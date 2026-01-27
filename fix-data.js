const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data.json'));

const fixed = data.map(i => {
    // 1. Fix Booleans
    if (i.iiif !== undefined) i.iiif = !!+i.iiif;
    if (i.is_free_cultural_works_license !== undefined) i.is_free_cultural_works_license = !!+i.is_free_cultural_works_license;
    if (i.is_disabled !== undefined) i.is_disabled = !!+i.is_disabled;
    
    // 2. Fix Coordinates
    if (i.lat) i.lat = String(i.lat);
    if (i.lng) i.lng = String(i.lng);

    // 3. Fix Quantity (Standardize to Few / Dozens / Hundreds / Thousands)
    if (i.quantity) {
        const q = i.quantity.toLowerCase();
        
        if (q.includes('few')) i.quantity = 'Few';              // < 24
        else if (q.includes('many')) i.quantity = 'Dozens';     // 24 - 99
        else if (q.includes('huge')) i.quantity = 'Thousands';  // Merged into Thousands
        else if (q.includes('hundreds')) i.quantity = 'Hundreds';
        else if (q.includes('thousands')) i.quantity = 'Thousands';
        else i.quantity = 'Unknown';
    } else {
        i.quantity = 'Unknown';
    }

    return i;
});

fs.writeFileSync('./data.json', JSON.stringify(fixed, null, 4));
console.log('✅ Data scrubbed: Quantities standardized to Dozens/Hundreds/Thousands.');