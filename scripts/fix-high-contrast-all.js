const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'src', 'app');

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, fileList);
    } else if (filePath.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = walkDir(appDir);
let modifiedCount = 0;

for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace low-contrast stone/gray/slate-400 or 500 paragraph text with high-contrast text
  content = content.replace(/text-stone-500 dark:text-stone-400/g, 'text-stone-800 dark:text-stone-100 font-medium');
  content = content.replace(/text-stone-600 dark:text-stone-300/g, 'text-stone-900 dark:text-stone-100 font-medium');
  content = content.replace(/text-slate-500 dark:text-slate-400/g, 'text-slate-900 dark:text-slate-100 font-medium');
  content = content.replace(/text-neutral-500 dark:text-neutral-400/g, 'text-neutral-900 dark:text-neutral-100 font-medium');
  content = content.replace(/text-gray-500 dark:text-gray-400/g, 'text-gray-900 dark:text-gray-100 font-medium');

  // Specific fix for Technical Info Strip in PortasClient.tsx & subpages
  content = content.replace(/text-xs font-light text-stone-500 dark:text-stone-400 leading-relaxed/g, 'text-xs font-medium text-stone-900 dark:text-stone-100 leading-relaxed');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    const rel = path.relative(path.join(__dirname, '..'), filePath);
    console.log(`✨ Alto contraste aplicado em: ${rel}`);
    modifiedCount++;
  }
}

console.log(`🎉 Sucesso! ${modifiedCount} arquivos atualizados com texto de altíssima legibilidade.`);
