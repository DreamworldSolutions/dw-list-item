# `<dw-list-item>` [![Published on npm](https://img.shields.io/npm/v/@dreamworld/dw-list-item.svg)](https://www.npmjs.com/package/@dreamworld/dw-list-item)

A material design item used to show single item of the list [More detail](https://material.io/components/lists/#)

It also supports keyboard navigation. On `Up/Down` arrow key press it focuses next/previous sibling element. On `Enter` key press it selects the currently focused element.

## Installation

```
npm install --save @dreamworld/dw-list-item
```

## Usage

```js
import "@dreamworld/dw-list-item/dw-list-item";
```

### Basic (Single Line)

```html
<dw-list-item title1="Item 1"></dw-list-item>
```

### Two line

```html
<dw-list-item title1="Main title" title2="Sub title" twoLine></dw-list-item>
<!-- Though, title2 isn't specified, will occupy 2 line height -->
<dw-list-item title1="Main title" twoLine></dw-list-item>
```

### WIth leading and trailing icon

```html
<dw-list-item title1="Item 1" leadingIcon="favorite" trailingIcon="done"></dw-list-item>
```

### Disabled

```html
<dw-list-item title1="Item 1" disabled></dw-list-item>
```

### Dense

```html
<dw-list-item title1="Item 1" dense></dw-list-item>
```

## Property

| Name                 | Type            | Default     | Description                                                                                                                                                                                                                                                                                                                                                |
| -------------------- | --------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title1`             | `String`        | `undefined` | Item's text to be shown in first line                                                                                                                                                                                                                                                                                                                      |
| `title2`             | `String`        | `undefined` | Item's text to be shown in the second line.                                                                                                                                                                                                                                                                                                                |
| `dense`              | `Boolean`       | `false`     | Set to true to show dense item. Dense item will have less height compare to normal item                                                                                                                                                                                                                                                                    |
| `leadingIcon`        | `String`        | `undefined` | Name of icon to show as a leading icon                                                                                                                                                                                                                                                                                                                     |
| `trailingIcon`       | `String`        | `undefined` | Name of icon to show as a trailing icon                                                                                                                                                                                                                                                                                                                    |
| `twoLine`            | `Boolean`       | `false`     | Set to true to show twoLine item                                                                                                                                                                                                                                                                                                                           |
| `disabled`           | `Boolean`       | `false`     | Shows disabled style when true                                                                                                                                                                                                                                                                                                                             |
| `selected`           | `Boolean`       | `false`     | Set to true to show item preselected. It will be set to true on click or enter.                                                                                                                                                                                                                                                                            |
| `selectionMode`      | `SelectionMode` | `default`   | Whether selection should be toggled or default/forced. if item isn't yet selected, it becomes selected. If item is already selected, no change in the selection state. While in toggle mode, selection is toggled. while in `none` mode, selection won't work so it's view-only item in this mode. <br /> Possible values: `default`, `toggle`, and `none` |
| `hasLeadingIcon`     | `Boolean`       | `false`     | Set to true when item has leading icon.                                                                                                                                                                                                                                                                                                                    |
| `hasTrailingIcon`    | `Boolean`       | `false`     | set to true when item has trailing icon.                                                                                                                                                                                                                                                                                                                   |
| `leadingIconFont`    | `IconFont`      | `FILLED`    | Type of the leading icon. <br /> Possible values: `FILLED`, and `OUTLINED`                                                                                                                                                                                                                                                                                 |
| `trailingIconFont`   | `IconFont`      | `FILLED`    | Type of the trailing icon. <br /> Possible values: `FILLED`, and `OUTLINED`                                                                                                                                                                                                                                                                                |
| `tooltipPlacement`   | `String`        | `undefined` | Use to set placement of tooltip.                                                                                                                                                                                                                                                                                                                           |
| `showSelectedRipple` | `Boolean`       | `false`     | Set it to true to show ripples on the selected item.                                                                                                                                                                                                                                                                                                       |
| `focusable`          | `Boolean`       | `true`      | Whether or not list-item is focusable.                                                                                                                                                                                                                                                                                                                     |
| `activated`          | `Boolean`       | `false`     | Whether or not list-item is activated. Same style as focused.                                                                                                                                                                                                                                                                                              |
| `highlight`          | `String`        | `undefined` | Contains highlight words                                                                                                                                                                                                                                                                                                                                   |

## Events

| Name                | Target         | Detail | Description                         |
| ------------------- | -------------- | ------ | ----------------------------------- |
| `selection-changed` | `dw-list-item` | none   | Triggers when selection is changed. |

## CSS Custom Properties

| Name                                | Default               | Description                                                                               |
| ----------------------------------- | --------------------- | ----------------------------------------------------------------------------------------- |
| `--mdc-theme-primary`               | `#6200ee`             | Selected item's background color and icon color.                                          |
| `--mdc-theme-text-primary`          | `rgba(0, 0, 0, 0.87)` | Primary title's text color.                                                               |
| `--mdc-theme-text-secondary`        | `rgba(0, 0, 0, 0.6)`  | Sub title's text color.                                                                   |
| `--mdc-theme-text-disabled`         | `rgba(0, 0, 0, 0.38)` | Disabled text color when item is disabled.                                                |
| `--dw-icon-color`                   | `rgba(0, 0, 0, 0.38)` | Icon color in `normal` mode. In `selection` mode `--mdc-theme-primary` color will be used |
| `--dw-icon-color-active`            | `#6200ee`             | Leading and Trailing icon color.                                                          |
| `--dw-select-highlight-text-color`  | `inherit`             | Highlight span text color                                                                 |
| `--dw-select-highlight-bg-color`    | `inherit`             | Highlight span backgroound color                                                          |
| `--dw-select-highlight-font-weight` | `inherit`             | Highlight span text font weight                                                           |
