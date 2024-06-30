const fs = require('fs');
const path = require('path');

// sounds directory
const soundDir = "../sounds";

// converting file names to valid variable names
const toValidVarName = (str) => str.replace(/[^a-zA-Z0-9_]/g, '_');

// reading in files
const files = fs.readdirSync(soundDir);

// creating import statements and mappings to variable names
let importStatements = '';
let mappings = 'const soundFiles = {\n';
files.forEach((file) => {
    const baseName = path.basename(file, path.extname(file));
    const varName = toValidVarName(baseName);
    importStatements += `import ${varName} from '${soundDir}/${file}';\n`;
    mappings += `   '${baseName}': ${varName},\n`;
});
mappings += '}\nexport default soundFiles;\n';

// writing to soundImports.js
const generatedCode = `${importStatements}\n${mappings}`;
fs.writeFileSync('./soundImports.js', generatedCode);

console.log("Sound imports and mappings successfully generated.");