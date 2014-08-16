var spawn = require('child_process').spawn;

var node = 'c:\\Program Files (x86)\\Atom\\resources\\app\\apm\\node_modules\\atom-package-manager\\bin\\node';
var jscs = "c:\\Users\\junlel\\.atom\\packages\\linter-jscs\\node_modules\\jscs\\bin\\jscs";
jscs = './bin/jscs';
var args = [
  jscs,
  "-r",
  "checkstyle",
  "-c",
  "c:\\Users\\junlel\\.jscsrc",
  "C:\\Users\\junlel\\Repositories\\temp\\index.js"
];

var process = spawn(node, args);

process.stdout.setEncoding('utf-8');
process.stdout.on('data', function (data) {
  console.log('stdout: ');
  console.log(data);
});

process.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

process.on('close', function (code) {
  console.log('child process exited with code ' + code);
});
