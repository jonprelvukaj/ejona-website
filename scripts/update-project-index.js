#!/usr/bin/env node
/**
 * Auto-generates the project index from all JSON files in content/projects/
 * Run this script after adding new projects via CMS
 */

const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '..', 'content', 'projects');
const indexFile = path.join(__dirname, '..', 'content', 'project-index.json');

// Get all JSON files except index.json
const projectFiles = fs.readdirSync(projectsDir)
    .filter(file => file.endsWith('.json') && file !== 'index.json')
    .sort();

// Create index object
const index = {
    projects: projectFiles
};

// Write index file
fs.writeFileSync(indexFile, JSON.stringify(index, null, 2) + '\n');

console.log(`Updated project index with ${projectFiles.length} projects:`);
projectFiles.forEach(f => console.log(`  - ${f}`));
