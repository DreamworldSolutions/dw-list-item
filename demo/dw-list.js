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

export class DwList extends LitElement{

  static get styles() {
    return [
      css`
        :host {
          display: inline-block;
        }

        :host[hidden] {
          display: none;
        }

        .wrapper{
          width: 500px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          margin-bottom: 24px;
        }

        h2{
          margin-top: 0;
        }
      `
    ];
  }

  static get properties() {
    return {
      header: { type: String },
      
      totalItems: {type: Number}
    };
  }

  constructor(){
    super();
    this._clickIndex = -1;
  }

  render() {
    return html`
        <h2>${this.header}</h2>

        <div class="wrapper">
          <slot></slot>
        </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this._addKeyEventListeners();
    this.items = this.querySelectorAll('dw-list-item');
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this._removeKeyEventListeners();
  }

  _onClick(e) { 
    if (this._previousItem) { 
      this._previousItem.removeAttribute('selected');
      this._previousItem.removeAttribute('active');
    }
    this.items[this._clickIndex] && this.items[this._clickIndex].removeAttribute('active');

    let clickedIndex = e.target.getAttribute('index');

    this._clickIndex = Number(clickedIndex);
    e.target.setAttribute('selected', true);
    e.target.setAttribute('active', true);
    this._previousItem = e.target;
  }

  _addKeyEventListeners() {
    this.addEventListener('keydown', this._onKeyDown);
    this.addEventListener('click', this._onClick);
  }

  _removeKeyEventListeners() {
    this.removeEventListener('keydown', this._onKeyDown);
    this.removeEventListener('click', this._onClick);
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
  
  _onUpArrowKey() {
    this.items[this._clickIndex].removeAttribute('active');
    this._clickIndex = this._clickIndex > 0 ? this._clickIndex - 1 : this._clickIndex;
    this.items[this._clickIndex].setAttribute('active', true);
  }

  _onDownArrowKey() {
    this.items[this._clickIndex].removeAttribute('active');
    this._clickIndex = this._clickIndex < this.items.length - 1 ? this._clickIndex + 1 : this._clickIndex;
    this.items[this._clickIndex].setAttribute('active', true);
  }

}

window.customElements.define('dw-list', DwList);