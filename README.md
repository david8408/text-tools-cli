# Text Tools CLI

[![CI](https://github.com/david8408/text-tools-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/david8408/text-tools-cli/actions)

أداة CLI مفتوحة المصدر وسريعة بدون تبعيات لتنفيذ تحويلات نصية شائعة (uppercase، lowercase، Title Case، slug، عدّ الكلمات/الأحرف، إزالة التكرارات، الفرز، وغيرها).

Open-source, zero-dependency CLI for common text transformations (uppercase, lowercase, title case, slugify, word/char count, unique lines, sort, etc.).

## Features / المزايا
- Uppercase / Lowercase / Title Case
- Slugify (kebab-case)
- Word and character counts
- Trim whitespace
- Unique lines (إزالة التكرارات)
- Sort lines (عادي، حساس/غير حساس لحالة الأحرف، رقمي، تنازلي)
- Reverse text

## Install / التثبيت
- محليًا للتطوير:
  ```bash
  node bin/text-tools.js help
  ```
- رابط عالمي بعد النشر على npm (اختياري لاحقًا):
  ```bash
  npm i -g text-tools-cli
  text-tools help
  ```
- ربط محلي أثناء التطوير:
  ```bash
  npm link
  text-tools help
  ```

## Usage / الاستخدام
- تمرير النص كوسيطة:
  ```bash
  text-tools upper "hello world"    # => HELLO WORLD
  ```
- أو عبر stdin:
  ```bash
  echo "b\na\na" | text-tools unique
  ```
- أو تشغيل السكربت مباشرة:
  ```bash
  node bin/text-tools.js slug "Hello, World!"
  ```

أوامر متاحة:
- `upper`, `lower`, `title`, `slug`
- `words`, `chars`, `trim`
- `unique`
- `sort`, `sort:ci`, `sort:num`, `sort:desc`
- `reverse`

## CI Links
- Actions dashboard: https://github.com/david8408/text-tools-cli/actions
- Workflow file: https://github.com/david8408/text-tools-cli/actions/workflows/ci.yml

## Development / التطوير
- تشغيل الاختبارات:
  ```bash
  npm test
  ```

## Contributing / المساهمة
- الانفتاح على القبول بالمساهمات: إصلاحات، تحسينات، وثائق.
- افتح `issue` أو `pull request`.

## License / الرخصة
- MIT. انظر `LICENSE`. 