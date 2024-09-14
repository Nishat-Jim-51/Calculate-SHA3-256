const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Function to compute SHA3-256 hash for a given binary file
function computeSHA3_256(filePath) {
    const fileBuffer = fs.readFileSync(filePath);  // Read the binary file
    const hash = crypto.createHash('sha3-256');
    hash.update(fileBuffer);
    return hash.digest('hex');
}

// Path to the folder containing the extracted files
const folderPath = './hash_files';  // Update this to your folder path

// Read all the files in the folder (exactly 256)
const fileNames = fs.readdirSync(folderPath).filter(file => file.endsWith('.data'));

// Compute SHA3-256 for each file
let hashes = fileNames.map(file => computeSHA3_256(path.join(folderPath, file)));

// Sort the hashes in ascending order as strings
hashes.sort();

// Concatenate the sorted hashes
let concatenatedHashes = hashes.join('');

// Append the email (in lowercase)
let finalString = concatenatedHashes + 'cse051.nishat@gmail.com';

// Compute the SHA3-256 hash of the final concatenated string
let finalHash = crypto.createHash('sha3-256').update(finalString).digest('hex');

console.log('Final SHA3-256 hash:', finalHash);