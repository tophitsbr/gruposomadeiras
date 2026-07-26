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

const allTsxFiles = walkDir(appDir);
let fixedCount = 0;

for (const filePath of allTsxFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Replace text-[#3E2723] where dark:text is missing in className
  content = content.replace(/className="([^"]*text-\[\#3E2723\][^"]*)"/g, (match, p1) => {
    if (p1.includes('dark:text')) return match;
    // If it's a yellow badge (bg-[#F4B400]), dark mode text should be brown or dark
    if (p1.includes('bg-[#F4B400]') || p1.includes('bg-amber-400') || p1.includes('bg-primary')) {
      return match;
    }
    return `className="${p1} dark:text-amber-400"`;
  });

  // 2. Replace text-brown-dark where dark:text is missing
  content = content.replace(/className="([^"]*text-brown-dark[^"]*)"/g, (match, p1) => {
    if (p1.includes('dark:text')) return match;
    if (p1.includes('bg-[#F4B400]') || p1.includes('bg-amber-400') || p1.includes('bg-primary')) {
      return match;
    }
    return `className="${p1} dark:text-white"`;
  });

  // 3. Replace text-slate-800 or text-slate-900 where dark:text is missing
  content = content.replace(/className="([^"]*text-slate-[89]00[^"]*)"/g, (match, p1) => {
    if (p1.includes('dark:text')) return match;
    return `className="${p1} dark:text-slate-100"`;
  });

  // 4. Replace text-[#2D1B18] or text-[#1b4332] where dark:text is missing
  content = content.replace(/className="([^"]*text-\[\#2D1B18\][^"]*)"/g, (match, p1) => {
    if (p1.includes('dark:text')) return match;
    return `className="${p1} dark:text-[#F4B400]"`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    const relativePath = path.relative(path.join(__dirname, '..'), filePath);
    console.log(`✅ Otimizadas cores e contraste em: ${relativePath}`);
    fixedCount++;
  }
}

console.log(`🎉 Total de arquivos ajustados com alto contraste: ${fixedCount}`);
