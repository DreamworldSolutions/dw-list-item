# dw-list-item

A material design item used to show single item of the list [More detail](https://material.io/components/lists/#)

It also supports keyboard navigation. On `Up/Down` arrow key press it focuses next/previous sibling element. On `Enter` key press it selects the currently focused element.

## Installation

```
npm install --save @dreamworld/dw-list-item
```

## Usage

```js
  import '@dreamworld/dw-list-item/dw-list-item';
```

### Basic (Single Line)

```html
  <dw-list-item title1="Item 1"></dw-list-item>
```

### Two line

```html
  
  <dw-list-item title1="Main title" title2="Sub title" twoLine></dw-list-item>
  <!-- Though, title2 isn't specified, will occupy 2 line height -->
  <dw-list-item title1="Main title"  twoLine></dw-list-item>
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
- `selected` - When true shows selected item's style
- `selectionMode` - whether selection should be toggled or default/forced. Possible values: `default`, `toggle`, `none`.. In `default` mode, if item isn't yet selected, it becomes selected. If item is already selected, no change in the selection state. While in toggle mode, selection is toggled.  while in `none` mode, selection won't work so it's view-only item in this mode.

## Events

- `selection-changed` - Triggers when selection is changed.

## CSS Custom Properties

| Name  | Description |
| ----  | ----------- |
| --mdc-theme-primary | Selected item's background color and icon color. Default is `#6200ee` |
| --mdc-theme-text-primary | Primary title's text color. Default is `rgba(0, 0, 0, 0.87)` |
| --mdc-theme-text-secondary | Sub title's text color. Default is `rgba(0, 0, 0, 0.6)` |
| --mdc-theme-text-disabled | Disabled text color when item is disabled. Default is `rgba(0, 0, 0, 0.38)` |
| --dw-icon-color | Icon color in `normal` mode. Default is `rgba(0, 0, 0, 0.38)` In `selection` mode `--mdc-theme-primary` color will be used |
