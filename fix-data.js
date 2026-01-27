const fs = require('fs');
// Load the current data
const rawData = fs.readFileSync('./data.json');
const data = JSON.parse(rawData);

// Map through and force types
const fixedData = data.map(item => {
    // 1. Convert Integers (0/1) to Booleans (false/true)
    // The '!!' operator converts a value to its boolean equivalent
    if (item.iiif !== undefined) item.iiif = !!+item.iiif; 
    if (item.is_free_cultural_works_license !== undefined) item.is_free_cultural_works_license = !!+item.is_free_cultural_works_license;
    if (item.is_disabled !== undefined) item.is_disabled = !!+item.is_disabled;
    
    // 2. Ensure Lat/Lng are strings (schema requirement)
    if (item.lat !== null && item.lat !== undefined) item.lat = String(item.lat);
    if (item.lng !== null && item.lng !== undefined) item.lng = String(item.lng);

    return item;
});

// Save back to data.json with pretty printing
fs.writeFileSync('./data.json', JSON.stringify(fixedData, null, 4));
console.log('✅ Data scrubbed: Converted 0/1 to true/false.');