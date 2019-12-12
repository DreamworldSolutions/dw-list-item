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
          user-select: none;
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
          height: 48px;
          position: relative;
          padding: 0 16px;
          overflow: hidden;
          outline: none;
          cursor:pointer;
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
          margin-right: 32px;
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

        :host(:not([disabled])[active]) .list-item::before,
        :host(:not([disabled])[active]) .list-item:hover::before {
          opacity: 0.12;
        }

        :host(:not([disabled])[active][selected]) .list-item::before,
        :host(:not([disabled])[active][selected]) .list-item:hover::before{
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
    this.disabled = false;
  }

  render() {
    return html`
      <div class="list-item layout horizontal center" tabindex="0">

        ${this.disabled ? '' : html`<dw-ripple></dw-ripple>`}

        <!-- Leading icon -->
        ${this.leadingIcon ? this._leadingIconTemplate : ''}

        <!-- Item text -->
        <span class="item-text-container layout vertical flex ellipses">
          <span class="primary-text subtitle1 ellipses">${this.title1}</span>
          ${this.title2 && this.twoLine ? html`<span class="secondary-text body2 ellipses">${this.title2}</span>` : ''}
        </span>

        <!-- Trailing Icon -->
        ${this.trailingIcon ? this._trailingIconTemplate : ''}
      </div>
    `
  }

  /**
   * Returns leading icon's template
   * Override this function to customize leading icon
   */
  get _leadingIconTemplate(){
    return html`
      <dw-icon class="leading-icon list-item__icon" ?disabled="${this.disabled}" name="${this.leadingIcon}"></dw-icon>
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

}

window.customElements.define('dw-list-item', DwListItem);
