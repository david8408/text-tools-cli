#!/usr/bin/env node
"use strict";

const fs = require("fs");

function readStdin() {
  return new Promise((resolve, reject) => {
    if (process.stdin.isTTY) {
      resolve("");
      return;
    }
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", chunk => data += chunk);
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);
  });
}

function toTitleCase(s) {
  return s.replace(/\S+/g, word => word[0] ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word);
}

function toSlug(s) {
  return s
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s\-_.]/g, " ")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

function uniqueLines(s) {
  const seen = new Set();
  const out = [];
  for (const line of s.split(/\r?\n/)) {
    if (!seen.has(line)) {
      seen.add(line);
      out.push(line);
    }
  }
  return out.join("\n");
}

function sortLines(s, numeric = false, reverse = false, caseInsensitive = false) {
  const collator = new Intl.Collator(undefined, { sensitivity: caseInsensitive ? "accent" : "variant", numeric });
  const lines = s.split(/\r?\n/);
  lines.sort(collator.compare);
  if (reverse) lines.reverse();
  return lines.join("\n");
}

function wordCount(s) {
  const words = s.trim().split(/\s+/).filter(Boolean);
  return String(words.length);
}

function charCount(s) {
  return String(s.length);
}

function help() {
  const text = `
Text Tools CLI

Usage:
  text-tools <command> [options] [text]
  echo "Hello world" | text-tools <command> [options]

Commands:
  upper                 Convert to UPPERCASE
  lower                 Convert to lowercase
  title                 Convert to Title Case
  slug                  Convert to slug (kebab-case)
  words                 Count words
  chars                 Count characters
  trim                  Trim leading/trailing whitespace
  unique                Remove duplicate lines (keeps first occurrences)
  sort                  Sort lines (lexicographic)
  sort:ci               Sort lines case-insensitively
  sort:num              Sort lines numerically
  sort:desc             Sort lines descending
  reverse               Reverse text
  help                  Show this help

Examples:
  text-tools upper "hello"
  echo "b\na\na" | text-tools unique
  text-tools slug "Hello, World!"
  text-tools sort:ci "b\\nA"
`;
  process.stdout.write(text);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const command = args[0] || "help";
  const rest = args.slice(1);
  let inlineText = rest.join(" ").trim();
  if (inlineText.startsWith('"') && inlineText.endsWith('"')) {
    inlineText = inlineText.slice(1, -1);
  }
  return { command, inlineText };
}

async function main() {
  const { command, inlineText } = parseArgs(process.argv);
  const stdinText = await readStdin();
  const input = stdinText ? stdinText : inlineText;

  if (command === "help" || command === "--help" || command === "-h" || !command) {
    help();
    process.exit(0);
  }

  if (!input && !["words", "chars", "help"].includes(command)) {
    process.stderr.write("No input text provided. Pipe text or pass it as an argument.\n");
    help();
    process.exit(1);
  }

  switch (command) {
    case "upper":
      process.stdout.write(input.toUpperCase());
      break;
    case "lower":
      process.stdout.write(input.toLowerCase());
      break;
    case "title":
      process.stdout.write(toTitleCase(input));
      break;
    case "slug":
      process.stdout.write(toSlug(input));
      break;
    case "words":
      process.stdout.write(wordCount(input));
      break;
    case "chars":
      process.stdout.write(charCount(input));
      break;
    case "trim":
      process.stdout.write(input.trim());
      break;
    case "unique":
      process.stdout.write(uniqueLines(input));
      break;
    case "sort":
      process.stdout.write(sortLines(input));
      break;
    case "sort:ci":
      process.stdout.write(sortLines(input, false, false, true));
      break;
    case "sort:num":
      process.stdout.write(sortLines(input, true));
      break;
    case "sort:desc":
      process.stdout.write(sortLines(input, false, true));
      break;
    case "reverse":
      process.stdout.write([...input].reverse().join(""));
      break;
    default:
      process.stderr.write(`Unknown command: ${command}\n`);
      help();
      process.exit(1);
  }
}

main().catch(err => {
  process.stderr.write(String(err.stack || err) + "\n");
  process.exit(1);
}); 