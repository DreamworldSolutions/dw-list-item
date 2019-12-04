# dw-list-item

- A material design item used to show single item of the list [More detail](https://material.io/components/lists/#)

## Installation

``` html
npm install --save @dreamworld/dw-list-item
```

## Usage

``` html
  import '@dreamworld/dw-list-item/dw-list-item';
```

## Usage pattern

``` html
  import { DwDialog } from '@dreamworld/dw-list-item/dw-list-item';

  <dw-list-item></dw-list-item>
  }
```

## Example Usage

### Basic

```html

  <dw-list-item title1="Item 1"></dw-list-item>

```

### Two line

```html
  
  <dw-list-item title1="Main title" title2="Sub title" twoLine></dw-list-item>
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

## Attributes

- active - When true shows active item's style
- selected - When true shows selected item's style

## CSS Custom Properties

| Name  | Description |
| ----  | ----------- |
| --dw-list-item-hover-background | Background color of the hovered item  |
| --dw-list-item-selected-background | Background color of the selected item  |
| --dw-list-item-selected-focused-background | Background color of the selected focused item |
| --dw-list-item-disabled-background | Background color of the disabled item |

