import { HtmlValidate } from 'html-validate';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? htmlFiles(join(directory, entry.name))
          : [join(directory, entry.name)],
      ),
    )
  )
    .flat()
    .filter((path) => path.endsWith('.html'));
}
const validator = new HtmlValidate(JSON.parse(await readFile('.htmlvalidate.json', 'utf8')));
const files = await htmlFiles('dist');
const issues = [];
for (const file of files) {
  const report = await validator.validateString(await readFile(file, 'utf8'), file);
  for (const result of report.results)
    for (const item of result.messages)
      issues.push({ file, rule: item.ruleId, message: item.message, selector: item.selector });
}
if (issues.length) {
  const counts = {};
  for (const item of issues) counts[item.rule] = (counts[item.rule] || 0) + 1;
  console.error(
    JSON.stringify({ issues: issues.length, counts, examples: issues.slice(0, 12) }, null, 2),
  );
  process.exitCode = 1;
} else
  console.log(
    `HTML validation passed: ${files.length} generated documents; no markup or accessibility-rule errors.`,
  );
