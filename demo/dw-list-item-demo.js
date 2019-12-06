/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';
import '../dw-list-item';

export class DwListItemDemo extends LitElement{

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        
        :host([hidden]){
          display: none;
        }

        dw-list-item{
          width: 400px;
        }

      `
    ]
  }

  render(){
    return html`
      <h3>Basic</h3>
      <dw-list-item title1="Item 1"></dw-list-item>

      <h3>Two line</h3>
      <dw-list-item title1="Main title" title2="Sub title" twoLine></dw-list-item>

      <h3>With leading icon</h3>
      <dw-list-item title1="Item 1" leadingIcon="favorite"></dw-list-item>

      <h3>With trailing icon</h3>
      <dw-list-item title1="Item 1" trailingIcon="done"></dw-list-item>

      <h3>dense</h3>
      <dw-list-item title1="Item 1" dense></dw-list-item>

      <h3>Disabled</h3>
      <dw-list-item title1="Item 1" disabled></dw-list-item>
    `
  }
}

window.customElements.define('dw-list-item-demo', DwListItemDemo);