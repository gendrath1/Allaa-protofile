# Alaa Aldin Portfolio

Arabic portfolio for Alaa Aldin Jamal Saudi, a Palestinian filmmaker and production manager.

## Preview locally

Serve this directory with any static HTTP server, for example:

```sh
python -m http.server 4173
```

Open http://localhost:4173.

## Files

- `index.html`: portfolio content and project links
- `editorial.css`: white editorial design and responsive layout (extends `art-direction.css`)
- `assets/`: current original photographs and film stills

No build step or package installation is required. Displayed photographs use responsive WebP exports from the supplied Drive originals and full embedded slide media. See `ASSET_SOURCES.md` and `image-sources.json` for the permanent reference and source mapping.

The site uses Google Fonts and links to Instagram and YouTube.

The header language switch translates the portfolio between Arabic and English, changes reading direction, and remembers the selection in browser storage. Links can select a language with `?lang=ar` or `?lang=en`. Arabic remains the default for new visitors.
