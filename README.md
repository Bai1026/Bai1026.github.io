<div align="center">

## 🌐 Personal Website
_Explore my personal journey_

[![Website](https://img.shields.io/badge/Website-Intro_Page-blue?style=for-the-badge&logo=github-pages)](https://bai1026.github.io/)

</div>

---

Built with [Astro](https://astro.build). Terminal/engineer aesthetic, dark mode by default.

## Development

```bash
npm install      # first time only
npm run dev      # local dev server → http://localhost:4321
npm run build    # static build → dist/
```

## 📝 Where to update content

Almost all content lives in JSON data files — edit them and the pages re-render automatically:

| I want to update...          | Edit this file                        |
| ---------------------------- | ------------------------------------- |
| News / latest updates        | `src/data/news.json`                  |
| Work experience              | `src/data/work.json`                  |
| Research experience          | `src/data/research.json`              |
| Publications                 | `src/data/publications.json`          |
| Basketball teams & photos    | `src/data/basketball.json`            |
| Teaching                     | `src/pages/teaching.astro` (inline)   |

Other common edits:

- **Terminal typewriter lines** (homepage hero): the `script` array in `src/components/TerminalHero.astro`
- **About Me paragraph & `const vincent` code card**: `src/pages/index.astro`
- **Nav links / footer / ⌘K command palette entries**: `src/layouts/BaseLayout.astro`
- **Colors, fonts, spacing** (design tokens): top of `src/styles/global.css`
- **Images / CV / videos**: drop files into `public/assets/...` (referenced as `/assets/...`)

### Adding a news item

Prepend an entry to `src/data/news.json`:

```json
{
  "hash": "abc1234",          // any 7-char fake git hash
  "date": "2026-07",
  "title": "Something cool",
  "milestone": true,           // true = green dot (papers, big life events)
  "html": "Description, <a href=\"...\">links</a> allowed."
}
```
