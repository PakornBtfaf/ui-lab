// add-qp01.js
// Adds the test "QP-01 customer" (the 29 commands of lab Step 1.6) to ui-lab.side.
// Run it inside the folder that holds ui-lab.side:   node add-qp01.js
const fs = require('fs');
const crypto = require('crypto');

const FILE = 'ui-lab.side';
const BASE = 'https://quickpizza.grafana.com';
const NAME = 'QP-01 customer';

const MAXCAL = "xpath=//label[normalize-space()='Max Calories per Slice']/../input";
const KNIFE_OPT = "xpath=//select/option[normalize-space()='Knife']";
const NAME_P = "xpath=//p[starts-with(., 'Name:')]";
const TOOL_P = "xpath=//p[starts-with(., 'Tool:')]";
const CAL_P = "xpath=//p[starts-with(., 'Calories per slice:')]";

const SCRIPT = [
  'const d = new Date();',
  "const two = (n) => String(n).padStart(2, '0');",
  'const day = d.getFullYear() + two(d.getMonth() + 1) + two(d.getDate());',
  'const time = two(d.getHours()) + two(d.getMinutes()) + two(d.getSeconds());',
  "return 'Lab Pizza ' + day + '-' + time;",
].join('\n');

// [command, target, value]
const rows = [
  // step 1
  ['open', BASE + '/', ''],
  ['waitForElementVisible', 'css=h1', '10000'],
  ['assertText', 'css=h1', 'Looking to break out of your pizza routine?'],
  // step 2
  ['click', "xpath=//label[.//span[normalize-space()='Advanced']]", ''],
  ['waitForElementVisible', MAXCAL, '10000'],
  ['waitForElementVisible', 'css=select', '10000'],
  ['waitForElementVisible', 'id=default-checkbox', '10000'],
  ['waitForElementVisible', 'css=input#pizza-name', '10000'],
  // pizza name of this run
  ['executeScript', SCRIPT, 'pizzaName'],
  ['echo', '${pizzaName}', ''],
  // step 3
  ['type', MAXCAL, '600'],
  ['waitForElementPresent', KNIFE_OPT, '10000'],
  ['addSelection', 'css=select', 'label=Knife'],
  ['click', 'id=default-checkbox', ''],
  ['type', 'css=input#pizza-name', '${pizzaName}'],
  // checks of step 3
  ['assertValue', MAXCAL, '600'],
  ['assertSelectedLabel', 'css=select', 'Knife'],
  ['assertChecked', 'id=default-checkbox', ''],
  ['assertValue', 'css=input#pizza-name', '${pizzaName}'],
  // step 4
  ['click', 'name=pizza-please', ''],
  ['waitForElementVisible', NAME_P, '10000'],
  ['assertText', NAME_P, 'Name: ${pizzaName}'],
  ['assertNotText', TOOL_P, 'Tool: Knife'],
  ['storeText', CAL_P, 'calories'],
  ['executeScript', "return parseInt(${calories}.split(':')[1]) <= 600;", 'caloriesOk'],
  ['assert', 'caloriesOk', 'true'],
  // step 5
  ['click', 'name=rate-5', ''],
  ['waitForElementVisible', 'id=rate-result', '10000'],
  ['assertText', 'id=rate-result', 'Please log in first.'],
];

if (rows.length !== 29) {
  console.error('Internal error: expected 29 commands, got ' + rows.length);
  process.exit(1);
}

if (!fs.existsSync(FILE)) {
  console.error('Cannot find ' + FILE + ' in this folder. Run this script inside selenium-ide.');
  process.exit(1);
}

const raw = fs.readFileSync(FILE, 'utf8').replace(/^\uFEFF/, '');
const project = JSON.parse(raw);
fs.writeFileSync(FILE + '.bak', raw);

const uuid = () => crypto.randomUUID();
project.tests = project.tests || [];
project.suites = project.suites || [];

// remove an older copy of the test, if any
const old = project.tests.filter((t) => t.name === NAME).map((t) => t.id);
project.tests = project.tests.filter((t) => t.name !== NAME);
project.suites.forEach((s) => {
  s.tests = (s.tests || []).filter((id) => !old.includes(id));
});

const test = {
  id: uuid(),
  name: NAME,
  commands: rows.map(([command, target, value]) => ({
    id: uuid(),
    comment: '',
    command,
    target,
    targets: [],
    value,
  })),
};
project.tests.push(test);

if (project.suites.length === 0) {
  project.suites.push({
    id: uuid(),
    name: 'Default Suite',
    persistSession: false,
    parallel: false,
    timeout: 300,
    tests: [],
  });
}
project.suites[0].tests.push(test.id);

project.url = BASE;
project.urls = Array.from(new Set([...(project.urls || []), BASE]));

fs.writeFileSync(FILE, JSON.stringify(project, null, 2));
console.log('Done. Added "' + NAME + '" with ' + test.commands.length + ' commands to ' + FILE + '.');
console.log('Tests in the project now: ' + project.tests.map((t) => t.name).join(', '));
console.log('A copy of the old file was saved as ' + FILE + '.bak (delete it when everything works).');
