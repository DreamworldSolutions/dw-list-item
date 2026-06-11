# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
yarn install

# Run the demo with hot-reload
yarn start
# Equivalent: wds --node-resolve --app-index demo/index.html --open --watch
```

There are no tests configured (`npm test` exits with an error by default).

## Architecture

This is a single-file Web Component library published as `@dreamworld/dw-list-item`.

**Entry point:** [dw-list-item.js](dw-list-item.js) — contains the entire `DwListItem` class and registers `<dw-list-item>`. There are no build steps; the component is consumed directly as an ES module.

### Key design patterns

- **LitElement reactive properties** — all public props declared in `static get properties()`. Attribute reflection is opt-in per property (e.g. `dense`, `twoLine`, `disabled`, `selected` reflect; `highlight`, `selectionMode`, icons do not).
- **Custom setters with side effects** — `selected`, `disabled`, and `focusable` use hand-written setters. `selected` fires `selection-changed`. `disabled` sets `tabindex=-1`. `focusable` directly calls `setAttribute`/`removeAttribute` on the host, bypassing the render cycle for immediate DOM effect.
- **Template getter overrides** — `_leadingIconTemplate` and `_trailingIconTemplate` are prototype getters. Subclasses override these to inject custom icon elements without touching `render()`.
- **Slot fallback pattern** — `title1Template` / `title2Template` return either a property-bound text node (when `title1`/`title2` props are set) or a `<slot>` element, letting consumers use either attribute/property or slotted HTML content.

### Highlighting flow

When `highlight` is set, `_getTitle(text)` converts the text to an in-memory DOM node via `textToHtml`, runs `mark.js` against it with `[...highlight.split(' '), highlight]` as keywords, and returns the resulting HTML string via `htmlTrim`. This is rendered with LitElement's `unsafeHTML` directive — only ever applied to the component's own `title1`/`title2` property values, not user-supplied slot content.

### Key dependencies

| Package | Role |
|---------|------|
| `@dreamworld/dw-icon` | Icon rendering (FILLED / OUTLINED / Symbol variants) |
| `@dreamworld/dw-ripple` | Material Design ink ripple |
| `@dreamworld/dw-ellipsis` | Text overflow detection with tooltip |
| `@dreamworld/material-styles/typography` | Material typography CSS (`subtitle1`, `body2`) |
| `@dreamworld/web-util/textToHtml` | Converts plain text to in-memory HTML for mark.js |
| `@dreamworld/web-util/htmlTrim` | Strips whitespace from the processed HTML string |
| `mark.js` | In-text keyword highlighting |

### Demo

[demo/dw-list-item-demo.js](demo/dw-list-item-demo.js) and [demo/dw-list.js](demo/dw-list.js) are standalone demo components loaded by [demo/index.html](demo/index.html). The dev server config at [web-dev-server.config.mjs](web-dev-server.config.mjs) uses `@rollup/plugin-commonjs` to handle CommonJS modules (needed for mark.js).

## Release

Releases are automated via `semantic-release` on the `master` branch. Feature branches matching `feature/*` publish pre-release versions using the branch name as the channel/tag.
