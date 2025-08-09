const assert = require("assert");
const { spawnSync } = require("child_process");
const path = require("path");

const bin = path.join(__dirname, "..", "bin", "text-tools.js");

function run(args, input) {
  const res = spawnSync(process.execPath, [bin, ...args], { input, encoding: "utf8" });
  if (res.error) throw res.error;
  return { stdout: res.stdout.trim(), stderr: res.stderr.trim(), status: res.status };
}

assert.strictEqual(run(["upper", "abc"]).stdout, "ABC");
assert.strictEqual(run(["lower", "ABC"]).stdout, "abc");
assert.strictEqual(run(["title", "hello world"]).stdout, "Hello World");
assert.strictEqual(run(["slug", "Hello, World!"]).stdout, "hello-world");
assert.strictEqual(run(["words"], "one two three").stdout, "3");
assert.strictEqual(run(["chars"], "12345").stdout, "5");
assert.strictEqual(run(["trim", "  a  "]).stdout, "a");
assert.strictEqual(run(["unique"], "a\na\na\nb").stdout, "a\nb");
assert.strictEqual(run(["sort"], "b\na").stdout, "a\nb");
assert.strictEqual(run(["sort:ci"], "b\nA").stdout, "A\nb");
assert.strictEqual(run(["sort:num"], "10\n2").stdout, "2\n10");
assert.strictEqual(run(["sort:desc"], "a\nb").stdout, "b\na");
assert.strictEqual(run(["reverse", "abc"]).stdout, "cba");

console.log("All tests passed."); 