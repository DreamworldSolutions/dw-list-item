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
import '@dreamworld/dw-icon-button';
import '@dreamworld/dw-ripple';

//These are dw style needed by this element.
import { flexLayout } from '@dreamworld/flex-layout/flex-layout';
import { alignment } from '@dreamworld/flex-layout/flex-layout-alignment';
import { Typography } from '@dreamworld/material-styles/typography';
import { factors } from '@dreamworld/flex-layout/flex-layout-factors';

export class DwListItem extends LitElement {
  static get styles() {
    return [
      flexLayout,
      alignment,
      Typography,
      factors,
      css`
        :host{
          display: block;
        }

        :host([hidden]){
          display: none;
        }

        .ellipses{
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .mdc-list-item {
          height: 48px;
          position: relative;
          padding: 0 16px;
          overflow: hidden;
          outline: none;
        }

        :host([selected]) .mdc-list-item,
        :host([active]) .mdc-list-item,
        :host([selected]) .mdc-list-item .mdc-list-item__graphic,
        :host([active]) .mdc-list-item .mdc-list-item__graphic {
          color: var(--mdc-theme-primary, #6200ee);
          /* Used by dw-ripple */
          --mdc-theme-on-surface: var(--mdc-theme-primary, #6200ee);
        }

        .mdc-list-item__graphic {
          background-color: transparent;
          color: var(--dw-icon-color, rgba(0, 0, 0, 0.38));
          margin-left: 0;
          margin-right: 32px;
          /* width: 24px;
          height: 24px; */
        }

        .mdc-list-item__graphic.trailing-icon,
        :host([dense]) .mdc-list-item__graphic.trailing-icon{
          margin-right: 0;
        }

        .mdc-list-item__secondary-text {
          color: var(--mdc-theme-text-secondary, rgba(0, 0, 0, 0.54));
        }

        :host(:not([disabled])) .mdc-list-item::before{
          content: "";
          opacity: 0;
          pointer-events: none;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #000;
          transition: opacity 15ms linear, background-color 15ms linear;
          z-index: 1;
        }

        :host(:not([disabled])) .mdc-list-item:hover::before {
          opacity: 0.04;
        }

        :host(:not([disabled])[active]) .mdc-list-item::before {
          opacity: 0.12;
          background-color: var(--mdc-theme-primary, #6200ee);
        }

        :host(:not([disabled])[active][selected]) .mdc-list-item::before{
          opacity: 0.24;
        }

        :host(:not([disabled])[active]) .mdc-list-item:hover::before {
          opacity: 0.16;
        }

        :host(:not([disabled])[selected]) .mdc-list-item::before {
          opacity: 0.08;
          background-color: var(--mdc-theme-primary, #6200ee);
        }

        :host(:not([disabled])[selected]) .mdc-list-item:hover::before {
          opacity: 0.12;
        }

        :host([disabled]) .mdc-list-item__text {
          opacity: 0.38;
          color: var(--mdc-theme-text-disabled, #000);
        }

        :host([dense]) .mdc-list-item {
          height: 40px;
        }

        :host([dense]) .mdc-list-item__graphic {
          margin-left: 0;
          margin-right: 36px;
          width: 20px;
          height: 20px;
        }

        :host([twoline]) .mdc-list-item {
          height: 72px;
        }

        :host([twoline]).mdc-list--dense .mdc-list-item {
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
       * Set to true to show dense item.
       * Dense item will have less height compare to normal item
       */
      dense: { type: Boolean, reflect: true },

      /**
       * Name of icon to show as a leading icon
       */
      leadingIcon: { type: String },

      /**
       * Name of icon to show as a trailing icon
       */
      trailingIcon: { type: String },

      /**
       * Set to true to show twoLine item
       */
      twoLine: { type: Boolean, reflect: true},

       /**
       * Shows disabled style when true
       */
      disabled: { type: Boolean, reflect: true },

    };
  }

  constructor(){
    super();

    this.twoLine = false;
    this.dense = false;
  }

  render() {
    return html`
      <div class="mdc-list-item layout horizontal center" tabindex="0">

        ${this.disabled ? '' : html`<dw-ripple></dw-ripple>`}

        <!-- Leading icon -->
        ${this.leadingIcon ? this._leadingIconTemplate() : ''}

        <!-- Item text -->
        <span class="mdc-list-item__text layout vertical flex ellipses">
          <span class="mdc-list-item__primary-text ellipses">Two-line item</span>
          ${this.title2 && this.twoLine ? html`<span class="mdc-list-item__secondary-text body2 ellipses">Secondary text</span>` : ''}
        </span>

        <!-- Trailing Icon -->
        ${this.trailingIcon ? this._trailingIconTemplate() : ''}
      </div>
    `
  }

  _leadingIconTemplate(){
    return html`
      <dw-icon class="leading-icon mdc-list-item__graphic" ?disabled="${this.disabled}" name="${this.leadingIcon}"></dw-icon>
    `
  }

  _trailingIconTemplate(){
    return html`
      <dw-icon-button class="mdc-list-item__graphic trailing-icon" ?disabled="${this.disabled}" .icon="${this.trailingIcon}"></dw-icon-button>
    `
  }

}

window.customElements.define('dw-list-item', DwListItem);
