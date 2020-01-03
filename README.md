# dw-list-item

A material design item used to show single item of the list [More detail](https://material.io/components/lists/#)

It also supports keyboard navigation. On `top/down` arrow key press it focuses next/previous sibling element. On `enter` key press it selectes element.

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
- `selectionMode` - whether selection should be toggles or force select. Possible value: `toggle`(Default) & `selection`. 

## Events

- `selection-changed` - Triggers when selection is changed