# `<dw-list-item>` [![Published on npm](https://img.shields.io/npm/v/@dreamworld/dw-list-item.svg)](https://www.npmjs.com/package/@dreamworld/dw-list-item)

A Material Design list item Web Component built with LitElement. Renders single-line or two-line items with optional leading/trailing icons, selection modes, text highlighting, and ellipsis-with-tooltip for overflowing text.

---

## 1. User Guide

### Installation & Setup

```bash
yarn add @dreamworld/dw-list-item
```

Import the component before use:

```js
import "@dreamworld/dw-list-item/dw-list-item";
```

The custom element `<dw-list-item>` is registered automatically on import.

---

### Basic Usage

#### Single line

```html
<dw-list-item title1="Item 1"></dw-list-item>
```

#### Two line

```html
<dw-list-item title1="Main title" title2="Sub title" twoLine></dw-list-item>

<!-- Reserves two-line height without a subtitle -->
<dw-list-item title1="Main title" twoLine></dw-list-item>
```

#### With leading and trailing icons

```html
<dw-list-item
  title1="Item 1"
  hasLeadingIcon
  leadingIcon="favorite"
  hasTrailingIcon
  trailingIcon="done"
></dw-list-item>
```

#### Outlined icon variant

```html
<dw-list-item
  title1="Item 1"
  hasLeadingIcon
  leadingIcon="brightness_4"
  leadingIconFont="OUTLINED"
></dw-list-item>
```

#### Dense

```html
<dw-list-item title1="Item 1" dense></dw-list-item>
```

#### Disabled

```html
<dw-list-item title1="Item 1" disabled></dw-list-item>
```

#### Pre-selected

```html
<dw-list-item title1="Item 1" selected></dw-list-item>
```

#### Activated (persistent focus style)

```html
<dw-list-item title1="Item 1" activated></dw-list-item>
```

#### Text highlighting

Highlights occurrences of the given string (and each space-separated word) inside `title1` and `title2`:

```html
<dw-list-item
  title1="Dream World, dreamworld!"
  .highlight=${"dream"}
></dw-list-item>
```

Style the highlighted spans with CSS custom properties:

```css
dw-list-item {
  --dw-select-highlight-bg-color: #fde293;
  --dw-select-highlight-text-color: #000;
  --dw-select-highlight-font-weight: 600;
}
```

#### Slot-based content (HTML titles)

When `title1` or `title2` properties are not set, the component renders named slots instead. This allows arbitrary HTML inside the title areas:

```html
<dw-list-item activated>
  <div slot="title1">Hello <span>World</span></div>
</dw-list-item>

<dw-list-item twoLine>
  <span slot="title1">Primary Text</span>
  <span slot="title2">Secondary <strong>Text</strong></span>
</dw-list-item>
```

> **Note:** The `title2` slot is only rendered when `twoLine` is `true`.

---

### API Reference

#### Properties

| Name | Type | Default | Reflected | Description |
|------|------|---------|-----------|-------------|
| `title1` | `String` | `undefined` | No | Primary text label. **Mandatory** unless the `title1` slot is used. |
| `title2` | `String` | `undefined` | No | Secondary text label. Rendered only when `twoLine` is `true`. |
| `twoLine` | `Boolean` | `false` | Yes | Enables two-line layout (72px / 60px dense). |
| `dense` | `Boolean` | `false` | Yes | Compact variant with reduced height and smaller icons. |
| `disabled` | `Boolean` | `false` | Yes | Disables interaction and applies disabled styling. Sets `tabindex="-1"`. |
| `selected` | `Boolean` | `false` | Yes | Selection state. Acts as both input and output. Set programmatically to pre-select, or read after user interaction. |
| `selectionMode` | `String` | `"default"` | No | Controls click-to-select behavior. See [selectionMode](#selectionmode) below. |
| `hasLeadingIcon` | `Boolean` | `false` | Yes | Must be `true` to reserve layout space and render the leading icon. |
| `leadingIcon` | `String` | `undefined` | No | Material icon name for the leading icon. |
| `leadingIconFont` | `String` | `"FILLED"` | No | Leading icon style. Possible values: `"FILLED"`, `"OUTLINED"`. |
| `leadingIconSymbol` | `Boolean` | `false` | No | Use symbol font rendering for the leading icon. |
| `hasTrailingIcon` | `Boolean` | `false` | No | Must be `true` to render the trailing icon. |
| `trailingIcon` | `String` | `undefined` | No | Material icon name for the trailing icon. |
| `trailingIconFont` | `String` | `"FILLED"` | No | Trailing icon style. Possible values: `"FILLED"`, `"OUTLINED"`. |
| `trailingIconSymbol` | `Boolean` | `false` | No | Use symbol font rendering for the trailing icon. |
| `tooltipPlacement` | `String` | `"bottom"` | No | Placement of the ellipsis tooltip when text overflows. Forwarded to `dw-ellipsis`. |
| `showSelectedRipple` | `Boolean` | `false` | No | When `true`, ripple uses the primary color on selected items. |
| `focusable` | `Boolean` | `true` | No | Controls keyboard focusability. `true` sets `tabindex="0"`, `false` removes `tabindex`. |
| `activated` | `Boolean` | `false` | No | Applies the same persistent visual style as keyboard focus without requiring focus. |
| `highlight` | `String` | `undefined` | No | Space-separated keywords to highlight within `title1` and `title2`. The full string and each individual word are matched. |

#### `selectionMode`

| Value | Behavior |
|-------|----------|
| `"default"` | Click sets `selected` to `true`. Already-selected items remain selected. |
| `"toggle"` | Click toggles `selected` between `true` and `false`. |
| `"none"` | Click has no effect on `selected`. Item is view-only. |

#### Events

| Name | Target | Detail | Description |
|------|--------|--------|-------------|
| `selection-changed` | `dw-list-item` | none | Fired whenever the `selected` property changes, whether set programmatically or by user interaction. |

#### Slots

| Name | Description |
|------|-------------|
| `title1` | Rendered as primary content when the `title1` property is not set. |
| `title2` | Rendered as secondary content when `title2` property is not set and `twoLine` is `true`. |

#### CSS Custom Properties

| Name | Default | Description |
|------|---------|-------------|
| `--mdc-theme-primary` | `#6200ee` | Background overlay color for selected/activated items; active icon color. |
| `--mdc-theme-text-primary` | `rgba(0, 0, 0, 0.87)` | Primary title text color. |
| `--mdc-theme-text-secondary` | `rgba(0, 0, 0, 0.54)` | Secondary title text color. |
| `--mdc-theme-text-disabled` | `rgba(0, 0, 0, 0.38)` | Text color when item is disabled. |
| `--dw-icon-color` | `rgba(0, 0, 0, 0.38)` | Icon color in the normal (unselected) state. |
| `--dw-icon-color-active` | `#6200ee` | Leading and trailing icon color in the selected state. |
| `--mdc-icon-size` | `24px` (normal) / `20px` (dense) | Icon dimensions. Override to use a custom icon size. |
| `--dw-select-highlight-text-color` | `inherit` | Text color of highlighted keyword spans. |
| `--dw-select-highlight-bg-color` | `inherit` | Background color of highlighted keyword spans. |
| `--dw-select-highlight-font-weight` | `inherit` | Font weight of highlighted keyword spans. |

#### Layout Heights

| Variant | Height |
|---------|--------|
| Normal (single-line) | 48px |
| Dense (single-line) | 40px |
| Two-line | 72px |
| Two-line + Dense | 60px |

---

### Advanced Usage

#### Text highlighting with mark.js

The `highlight` property accepts a string. The component splits it on spaces and passes all resulting tokens — plus the original full string — to `mark.js`. Matches are wrapped in `<span class="highlight">` inside Shadow DOM.

```html
<!-- Highlights "dream", "world", and "dream world" -->
<dw-list-item
  title1="Dream World Solutions"
  title2="dreamworld.io"
  twoLine
  .highlight=${"dream world"}
></dw-list-item>
```

```css
dw-list-item {
  --dw-select-highlight-bg-color: yellow;
  --dw-select-highlight-font-weight: bold;
}
```

#### Toggle selection mode

```html
<dw-list-item
  title1="Toggle me"
  selectionMode="toggle"
  @selection-changed="${(e) => console.log('selected:', e.target.selected)}"
></dw-list-item>
```

#### Dense with custom icon size

By default, dense items use 20px icons. Override with `--mdc-icon-size`:

```html
<style>
  .regular-icon { --mdc-icon-size: 24px; }
</style>
<dw-list-item
  dense
  class="regular-icon"
  title1="Item"
  hasLeadingIcon
  leadingIcon="brightness_4"
  leadingIconFont="OUTLINED"
></dw-list-item>
```

#### Extending: custom icon templates

`DwListItem` exposes two overridable getter properties for subclasses:

```js
import { DwListItem } from "@dreamworld/dw-list-item/dw-list-item";
import { html } from "lit";

class MyListItem extends DwListItem {
  // Replace the leading icon with a custom element
  get _leadingIconTemplate() {
    return html`<my-avatar .src="${this.avatarSrc}"></my-avatar>`;
  }

  // Replace the trailing icon with a custom action button
  get _trailingIconTemplate() {
    return html`<my-action-button .label="${this.action}"></my-action-button>`;
  }
}
customElements.define("my-list-item", MyListItem);
```

---

## 2. Developer Guide / Architecture

### Architecture Overview

`dw-list-item` follows a **Composition** pattern built on the **LitElement reactive property** model.

#### Design Patterns

| Pattern | Where Applied |
|---------|---------------|
| **Reactive Properties (LitElement)** | All public props declared in `static get properties()`. Attribute reflection is opt-in per property. |
| **Custom Property Setters** | `selected`, `disabled`, and `focusable` use hand-written setters to produce side-effects (event dispatch, tabindex management) in addition to triggering re-renders. |
| **Composition / Delegation** | Icon rendering delegates to `<dw-icon>`, ripple to `<dw-ripple>`, text truncation + tooltip to `<dw-ellipsis>`. |
| **Template Getter Overrides** | `_leadingIconTemplate` and `_trailingIconTemplate` are prototype getters, enabling subclass customization without modifying `render()`. |
| **Slot Fallback Pattern** | `title1Template` / `title2Template` getters return either a property-bound text node or a `<slot>` element, giving consumers the choice between attribute/property and slot-based content. |

#### Module Responsibilities

| File | Responsibility |
|------|---------------|
| `dw-list-item.js` | Component definition, rendering, selection logic, text highlighting |
| `@dreamworld/dw-icon` | Icon rendering (FILLED / OUTLINED / Symbol variants) |
| `@dreamworld/dw-ripple` | Material Design ink ripple effect |
| `@dreamworld/dw-ellipsis` | Text overflow detection with tooltip |
| `@dreamworld/material-styles/typography` | Material Design typography CSS (`subtitle1`, `body2`) |
| `@dreamworld/web-util/textToHtml` | Converts plain text to an in-memory HTML element for mark.js |
| `@dreamworld/web-util/htmlTrim` | Strips whitespace from the processed HTML string |
| `mark.js` | In-text keyword highlighting |

#### Key Internal Flow

1. **Click → selection**: `connectedCallback` attaches a `click` listener that calls `_selectItem()`. `_selectItem` reads `selectionMode` and updates `this.selected` accordingly. The `selected` setter fires `selection-changed`.
2. **Highlighting**: When `highlight` is set, `_getTitle(text)` converts text to a DOM node via `textToHtml`, runs `mark.js` against it with the keyword array, and returns the resulting HTML string via `htmlTrim`. This is rendered with LitElement's `unsafeHTML` directive.
3. **Focusability**: The `focusable` setter directly calls `setAttribute("tabindex", 0)` or `removeAttribute("tabindex")` on the host, bypassing LitElement's render cycle for immediate DOM effect.

### Running the Demo

```bash
yarn start
# Runs: wds --node-resolve --app-index demo/index.html --open --watch
```

Opens `demo/index.html` in the browser with hot-reload via `@web/dev-server`.
