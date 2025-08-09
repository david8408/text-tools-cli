# Text Tools CLI

[![CI](https://github.com/david8408/text-tools-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/david8408/text-tools-cli/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Open-source, zero-dependency CLI for common text transformations (uppercase, lowercase, title case, slugify, word/char count, unique lines, sorting, etc.).

## Features
- Uppercase / Lowercase / Title Case
- Slugify (kebab-case)
- Word and character counts
- Trim whitespace
- Unique lines (deduplicate while preserving first occurrence)
- Sort lines (lexicographic, case-insensitive, numeric, descending)
- Reverse text

## Install
- Local for development:
  ```bash
  node bin/text-tools.js help
  ```
- Global after publishing to npm (optional, later):
  ```bash
  npm i -g text-tools-cli
  text-tools help
  ```
- Link locally during development:
  ```bash
  npm link
  text-tools help
  ```

## Usage
- Pass text as an argument:
  ```bash
  text-tools upper "hello world"    # => HELLO WORLD
  ```
- Or via stdin:
  ```bash
  echo "b\na\na" | text-tools unique
  ```
- Or run the script directly:
  ```bash
  node bin/text-tools.js slug "Hello, World!"
  ```

### Available commands
- `upper`, `lower`, `title`, `slug`
- `words`, `chars`, `trim`
- `unique`
- `sort`, `sort:ci`, `sort:num`, `sort:desc`
- `reverse`

## CI Links
- Actions dashboard: https://github.com/david8408/text-tools-cli/actions
- Workflow file: https://github.com/david8408/text-tools-cli/actions/workflows/ci.yml

## Docs
- Augment Code request (copy-ready): `docs/augment-code.md`

## Contributing
See `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.

## Development
- Run tests:
  ```bash
  npm test
  ```

## License
MIT — see `LICENSE`. 