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
import './dw-list';

export class DwListItemDemo extends LitElement{

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
        }

        :host[hidden] {
          display: none;
        }

        div{
          display: flex;
        }

        div dw-list{
          flex:1
        }

      `
    ];
  }

  static get properties() {
    return {
      _basicItemList: { type: Array },
      _denseItemList: { type: Array },
      _multiItemList: { type: Array },
      _disabledItemList: { type: Array }
    };
  }

  constructor(){
    super();
    this._clickIndex = -1;
    this._basicItemList = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];
    this._denseItemList = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];
    this._multiItemList = ['Item1', 'Item2', 'Item3', 'Item4'];
    this._disabledItemList = ['Item1','Item2'];
  }

  render() {
    return html`
      <div>
        <dw-list header="Basic">
          ${this._basicItemList.map((item, index) => html`
            <dw-list-item title1="${item}"></dw-list-item>
          `)}
          <dw-list-item disabled title1="test"></dw-list-item>
          <dw-list-item title1="test"></dw-list-item>
          
        </dw-list>

        <dw-list header="Dense">
          ${this._denseItemList.map((item, index) => html`
            <dw-list-item dense title1="${item}"></dw-list-item>
          `)}
        </dw-list>
      </div>

      <div>
        <dw-list header="Multi line">
          ${this._multiItemList.map((item, index) => html`
            <dw-list-item leadingIcon="favorite" twoLine title1="${item}" title2="9 Jan 2018"></dw-list-item>
          `)}
        </dw-list>

        <dw-list header="With icons">
          ${this._basicItemList.map((item, index) => html`
            <dw-list-item title1="${item}" hasLeadingIcon leadingIcon="brightness_4" leadingIconFont="OUTLINED"></dw-list-item>
          `)}
        </dw-list>
      </div>

        <dw-list header="Disabled">
          ${this._disabledItemList.map((item, index) => html`
            <dw-list-item disabled title1="${item}" trailingIcon="account_circle" trailingIconFont="OUTLINED"></dw-list-item>
          `)}
        </dw-list>

    `;
  }
}

window.customElements.define('dw-list-item-demo', DwListItemDemo);