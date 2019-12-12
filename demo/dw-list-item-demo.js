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
import { flexLayout, alignment, factors } from '@dreamworld/flex-layout';

export class DwListItemDemo extends LitElement{

  static get styles() {
    return [
      flexLayout,
      alignment,
      factors,
      css`
        :host {
          display: block;
        }

        :host[hidden] {
          display: none;
        }

        .wrapper{
          width: 500px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          margin-bottom: 24px;
        }

      `
    ];
  }

  static get properties() {
    return {
      _clickIndex: {type: Number},

      _itemList: { type: Array },
    };
  }

  constructor(){
    super();
    this._clickIndex = -1;
    this._itemList = ['Item1','Item1','Item1'];
  }

  render() {
    return html`
      <div>
        <h2>Basic</h2>
        <div class="wrapper">
          ${this._itemList.map((item,index) => html`

            <dw-list-item 
              title1="${item}" 
              index=${index}
              ?selected = "${this._eq(index,this._clickIndex)}"
              @click="${this._onClick}">
            </dw-list-item>

          `)}

        </div>

        <!-- <div class="wrapper">
          <dw-list-item title1="Item1" @click="${this._onClick}" index=0></dw-list-item>
          <dw-list-item title1="Item1" @click="${this._onClick}" index=1></dw-list-item>
          <dw-list-item title1="Item1" @click="${this._onClick}" index=2></dw-list-item>
        </div> -->

      </div>
    `;
  }

  _onClick(e) { 
    let clickedIndex = e.target ? e.target.getAttribute('index') : e;
    this._clickIndex = Number(clickedIndex);
  }

  _eq(val1,val2){
    return val1 === val2;
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this._addKeyEventListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this._removeKeyEventListeners();
  }

  _addKeyEventListeners() {
    this.addEventListener('keydown', this._onKeyDown);
  }

  _removeKeyEventListeners() {
    this.removeEventListener('keydown', this._onKeyDown);
  }

  _onKeyDown(e) {
    let keyCode = e.keyCode || e.which;

    //Down arrow key down
    if(keyCode === 40) {
      this._onDownArrowKey(e);
      return;
    }

    //Up arrow key down
    if(keyCode === 38) {
      this._onUpArrowKey(e);
      return;
    }
  }

  /**
   * Manages focus index on up arrow key press based on selected columns
   */
  _onUpArrowKey(e) {
    this._clickIndex = this._clickIndex > 0 ? this._clickIndex - 1 : this._clickIndex ;
  }

  /**
   * Manages focus index on down arrow key press based on selected columns
   */
  _onDownArrowKey(e) {
    this._clickIndex = this._clickIndex < this._itemList.length - 1 ? this._clickIndex + 1 : this._clickIndex ;
  }

}

window.customElements.define('dw-list-item-demo', DwListItemDemo);