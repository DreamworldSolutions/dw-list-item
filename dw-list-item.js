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
import '@dreamworld/dw-icon';
import '@dreamworld/dw-ripple';

//These are dw style needed by this element.
import { Typography } from '@dreamworld/material-styles/typography';
import { displayFlex, horizontal, vertical, flexFactor } from '@dreamworld/flex-layout/flex-layout-literals';
import { centerAligned } from '@dreamworld/flex-layout/flex-layout-alignment-literals';

export class DwListItem extends LitElement { 
  static get styles() {
    return [
      Typography,
      css`
        :host{
          display: block;
          user-select: none;
          outline: none;
          --dw-icon-color-active: var(--mdc-theme-primary, #6200ee)
        }

        :host([hidden]){
          display: none;
        }

        .ellipses{
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .list-item {
          ${displayFlex};
          ${horizontal};
          ${centerAligned};
          height: 48px;
          position: relative;
          padding: 0 16px;
          overflow: hidden;
          outline: none;
          cursor:pointer;
        }

        .item-text-container {
          ${displayFlex};
          ${vertical};
          ${flexFactor};
        }

        :host([selected]) .list-item{
          color: var(--mdc-theme-primary, #6200ee);
          --dw-icon-color: var(--dw-icon-color-active, #6200ee);
          /* Used by dw-ripple */
          --mdc-theme-on-surface: var(--mdc-theme-primary, #6200ee);
        }

        .list-item__icon {
          background-color: transparent;
          color: var(--dw-icon-color, rgba(0, 0, 0, 0.38));
          margin-left: 0;
          margin-right: 16px;
        }

        .list-item__icon.trailing-icon,
        :host([dense]) .list-item__icon.trailing-icon{
          margin-right: 0;
        }

        .secondary-text {
          color: var(--mdc-theme-text-secondary, rgba(0, 0, 0, 0.54));
        }

        :host(:not([disabled])) .list-item::before{
          content: "";
          opacity: 0;
          pointer-events: none;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #000;
          transition: opacity 75ms linear, background-color 75ms linear;
          z-index: 1;
        }

        :host(:not([disabled])) .list-item:hover::before {
          opacity: 0.04;
        }

        :host(:focus) .list-item::before,
        :host(:focus) .list-item:hover::before {
          opacity: 0.12;
        }

        :host(:focus[selected]:not([disabled])) .list-item::before,
        :host(:focus[selected]:not([disabled])) .list-item:hover::before{
          opacity: 0.24;
        }

        :host(:not([disabled])[selected]) .list-item::before {
          opacity: 0.08;
          background-color: var(--mdc-theme-primary, #6200ee);
        }

        :host(:not([disabled])[selected]) .list-item:hover::before {
          opacity: 0.12;
        }

        :host([disabled]) .list-item{
          cursor: normal;
          pointer-events: none;
        }

        :host([disabled]){
          pointer-events: none;
        }

        :host([disabled]) .item-text-container {
          color: var(--mdc-theme-text-disabled, rgba(0,0,0,0.38));
        }

        :host([dense]) .list-item {
          height: 40px;
        }

        :host([dense]) .list-item__icon {
          margin-left: 0;
          margin-right: 36px;
          width: 20px;
          height: 20px;
        }

        :host([twoline]) .list-item {
          height: 72px;
        }

        :host([twoline][dense]) .list-item {
          height: 60px;
        }
      `
    ];
  }

  static get properties() {
    return {
      
      /**
       * Input property (Mandatory)
       * Item's text to be shown
       */
      title1: { type: String },

      /**
       * Input property
       * Item's text to be shown in the second line. Used when `twoLine` is true
       */
      title2: { type: String },

      /**
       * Input property
       * Set to true to show dense item.
       * Dense item will have less height compare to normal item
       */
      dense: { type: Boolean, reflect: true },

      /**
       * Input property
       * Name of icon to show as a leading icon
       */
      leadingIcon: { type: String },

      /**
       * Input property
       * Name of icon to show as a trailing icon
       */
      trailingIcon: { type: String },

      /**
       * Input property
       * Set to true to show twoLine item
       */
      twoLine: { type: Boolean, reflect: true},

      /**
       * Input property
       * Shows disabled style when true
       */
      disabled: { type: Boolean, reflect: true },

      /**
       * Input property
       * Defines whether selection should be toggles or force select
       * Possible values: `toggle` & `select`
       * Default value is `toggle`
       */
      selectionMode: { type: String },

      /**
       * Input/Output property
       * Set to true to show item preselected
       * It will be set to true on click or enter
       */
      selected: { type: Boolean, reflect: true }

    };
  }

  set selected(value) { 
    if (value === this._selected) { 
      return;
    }

    let oldValue = this._selected;
    this._selected = value;
    this._triggerSelectionChangedEvent();
    this.requestUpdate('selected', oldValue);
  }

  get selected() { 
    return this._selected;
  }

  constructor(){
    super();

    this.twoLine = false;
    this.dense = false;
    this.disabled = false;
    this.selectionMode = 'toggle';
    this.selected = false;
    this._keydownHandler = this._keydownHandler.bind(this);
    this._selectItem = this._selectItem.bind(this);
    this.setAttribute('tabindex', 0);
  }

  render() {
    return html`
      <div class="list-item">

        ${this.disabled ? '' : html`<dw-ripple></dw-ripple>`}

        <!-- Leading icon -->
        ${this.leadingIcon ? this._leadingIconTemplate : ''}

        <!-- Item text -->
        <div class="item-text-container ellipses">
          <div class="primary-text subtitle1 ellipses">${this.title1}</div>
          ${this.title2 && this.twoLine ? html`<div class="secondary-text body2 ellipses">${this.title2}</div>` : ''}
        </div>

        <!-- Trailing Icon -->
        ${this.trailingIcon ? this._trailingIconTemplate : ''}
      </div>
    `
  }

  connectedCallback() { 
    super.connectedCallback();
    this.addEventListener('keydown', this._keydownHandler);
    this.addEventListener('click', this._selectItem);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._keydownHandler);
    this.removeEventListener('click', this._selectItem);
  }

  /**
   * Returns leading icon's template
   * Override this function to customize leading icon
   */
  get _leadingIconTemplate(){
    return html`
      <dw-icon class="leading-icon list-item__icon" ?disabled="${this.disabled}" .name="${this.leadingIcon}"></dw-icon>
    `
  }

  /**
   * Returns trailing icon's template
   * Override this function to customize trailing icon
   */
  get _trailingIconTemplate(){
    return html`
      <dw-icon class="list-item__icon trailing-icon" ?disabled="${this.disabled}" .name="${this.trailingIcon}"></dw-icon>
    `
  }

  /**
   * Handles keyboard events like `down`, `up`, `enter`
   */
  _keydownHandler(e) {
    // To prevent browser's scroll up/down 
    e.preventDefault();

    let keyCode = e.keyCode || e.which;

    //Down arrow key down
    if (keyCode === 40) {
      this._focusNextElement(e.target.nextElementSibling);
      return;
    }

    //Up arrow key down
    if(keyCode === 38) {
      this._focusPreviousElement(e.target.previousElementSibling);
      return;
    }

    //Enter keydown
    if (keyCode === 13) { 
      this._selectItem();
    }
  }

  /**
   * Focused next element. It skips disabled element
   */
  _focusNextElement(el) { 
    if (!el) { 
      return;
    }

    if (!el.disabled) { 
      el.focus && el.focus();
      return;
    }

    this._focusNextElement(el.nextElementSibling);
  }

  /**
   * Focused previous element. It skips disabled element
   */
  _focusPreviousElement(el) { 
    if (!el) { 
      return;
    }

    if (!el.disabled) { 
      el.focus && el.focus();
      return;
    }

    this._focusPreviousElement(el.previousElementSibling);
  }
  
  /**
   * Selects item based on `selectionMode`
   */
  _selectItem() { 
    if (this.disabled) { 
      return;
    }

    if (this.selectionMode === 'toggle' && this.selected) {
      this.selected = false;
      return;
    }

    this.selected = true;
  }

  /**
   * @event Triggers `selection-changed` events
   */
  _triggerSelectionChangedEvent() { 
    let event = new CustomEvent('selection-changed', {
      bubbles: true,
      composed: true
    });
    
    this.dispatchEvent(event);
  }

}

window.customElements.define('dw-list-item', DwListItem);
