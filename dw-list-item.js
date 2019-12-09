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
        :host {
          height: 48px;
          padding: 0px 16px;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          align-items: center;
          position: relative;
          transition: background-color 75ms linear;
        }

        :host(:hover){
          background-color: var(--dw-list-item-hover-background, rgba(0,0,0,0.04));
        }

        :host([active]) {
          background-color: var(--dw-list-item-active-background, rgba(0,0,0,0.08));
        }

        :host([selected]) {
          background-color: var(--dw-list-item-selected-background);
        }

        :host([active][selected]){
          background-color: var(--dw-list-item-selected-focused-background);
        }
        
        :host([dense]) {
          height: 36px;
        }

        :host([disabled]) .title1,
        :host([disabled]) .title2 {
          color: var(--dw-list-item-disabled-background, rgba(0,0,0,0.38));
        }

        :host([disabled]) {
          pointer-events: none;
        }

        :host([selected]) .title-container .title1,
        :host([selected]) .title-container .title2 {
          font-weight: bold;
        }

        :host([twoLine]) {
          height: 72px;
        }

        .leading-icon {
          margin-right: 32px;
        }

        .title-container {
          overflow: hidden;
        }

        .title-container .title2 {
          color: var(--mdc-theme-text-secondary, rgba(0,0,0,0.54));
        }

        .title-container .title1 {
          color: var(--mdc-theme-text-primary, rgba(0,0,0,0.87));
        }

        .title-container .title1.ellipsis,
        .title-container .title2.ellipsis {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        dw-ripple {
          position: absolute !important;
          overflow: hidden;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
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
      twoLine: { type: Boolean, reflect: true },

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
      <dw-ripple></dw-ripple>
      ${this.leadingIcon ? this._leadingIconTemplate() : html``}
      <div class="layout vertical title-container flex">
        <div class="title1 ellipsis body1">${this.title1}</div>
        ${this.title2 && this.twoLine ? html`<div class="title2 body2 ellipsis">${this.title2}</div>` : ''}
      </div>
      ${this.trailingIcon ? this._trailingIconTemplate() : html``}
    `
  }

  _leadingIconTemplate(){
    return html`
      <dw-icon class="leading-icon" ?disabled="${this.disabled}" name="${this.leadingIcon}"></dw-icon>
    `
  }

  _trailingIconTemplate(){
    return html`
      <dw-icon-button ?disabled="${this.disabled}" .icon="${this.trailingIcon}"></dw-icon-button>
    `
  }

}

window.customElements.define('dw-list-item', DwListItem);
