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
        .ellipses{
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .mdc-list-item {
          height: 48px;
          position: relative;
          justify-content: flex-start;
          padding: 0 16px;
          overflow: hidden;
          outline: none;
        }

        .mdc-list-item__graphic {
          background-color: transparent;
          color: var(--dw-icon-color, rgba(0, 0, 0, 0.38));
          margin-left: 0;
          margin-right: 32px;
          /* width: 24px;
          height: 24px; */
          flex-shrink: 0;
          fill: currentColor;
        }

        .mdc-list-item--selected,
        .mdc-list-item--activated,
        .mdc-list-item--selected .mdc-list-item__graphic,
        .mdc-list-item--activated .mdc-list-item__graphic {
          color: var(--mdc-theme-primary, #6200ee);
        }

        .mdc-list-item--disabled .mdc-list-item__text {
          opacity: 0.38;
          color: var(--mdc-theme-text-disabled, #000);
        }

        .mdc-list-item__primary-text {
          display: block;
          margin-top: 0;
          line-height: normal;
          display: block;
        }

        .mdc-list--dense .mdc-list-item__primary-text {
          display: block;
          margin-top: 0;
          line-height: normal;
          margin-bottom: -20px;
        }

        .mdc-list-item__secondary-text {
          color: var(--mdc-theme-text-secondary, rgba(0, 0, 0, 0.54));
          font-family: Roboto, sans-serif;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-size: 0.875rem;
          line-height: 1.25rem;
          font-weight: 400;
          letter-spacing: 0.0178571429em;
          text-decoration: inherit;
          text-transform: inherit;
          display: block;
          margin-top: 0;
          line-height: normal;
          display: block;
        }

        .mdc-list--dense .mdc-list-item__secondary-text {
          display: block;
          margin-top: 0;
          line-height: normal;
          font-size: inherit;
        }

        .mdc-list--dense .mdc-list-item {
          height: 40px;
        }

        .mdc-list--dense .mdc-list-item__graphic {
          margin-left: 0;
          margin-right: 36px;
          width: 20px;
          height: 20px;
        }


        .mdc-list--avatar-list .mdc-list-item {
          height: 56px;
        }

        .mdc-list--avatar-list .mdc-list-item__graphic {
          margin-left: 0;
          margin-right: 16px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .mdc-list--two-line .mdc-list-item__text {
          align-self: flex-start;
        }

        .mdc-list--two-line .mdc-list-item {
          height: 72px;
        }

        .mdc-list--two-line.mdc-list--dense .mdc-list-item,
        .mdc-list--avatar-list.mdc-list--dense .mdc-list-item {
          height: 60px;
        }

        .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic {
          margin-left: 0;
          margin-right: 20px;
          width: 36px;
          height: 36px;
        }


        :not(.mdc-list-item--disabled).mdc-list-item::before{
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          content: "";
          top: calc(50% - 100%);
          left: calc(50% - 100%);
          width: 200%;
          height: 200%;
          background-color: #000;
        }

        :not(.mdc-list-item--disabled).mdc-list-item::before {
          transition: opacity 15ms linear, background-color 15ms linear;
          z-index: 1;
        }

        :not(.mdc-list-item--disabled).mdc-list-item:hover::before {
          opacity: 0.04;
        }

        :not(.mdc-list-item--disabled).mdc-list-item--activated{
          --mdc-theme-on-surface: red;

        }

        :not(.mdc-list-item--disabled).mdc-list-item--activated::before {
          opacity: 0.12;
        }


        :not(.mdc-list-item--disabled).mdc-list-item--activated::before{
          background-color: var(--mdc-theme-primary, #6200ee);
        }

        :not(.mdc-list-item--disabled).mdc-list-item--activated:hover::before {
          opacity: 0.16;
        }

        :not(.mdc-list-item--disabled).mdc-list-item--selected::before {
          opacity: 0.08;
        }

        :not(.mdc-list-item--disabled).mdc-list-item--selected::before{
          background-color: var(--mdc-theme-primary, #6200ee);
        }

        :not(.mdc-list-item--disabled).mdc-list-item--selected:hover::before {
          opacity: 0.12;
        }

        .mdc-list-item--disabled::before{
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          content: "";
          top: calc(50% - 100%);
          left: calc(50% - 100%);
          width: 200%;
          height: 200%;
          background-color: #000;
        }

        .mdc-list-item--disabled::before {
          transition: opacity 15ms linear, background-color 15ms linear;
          z-index: 1;
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
    <div class="mdc-list-item layout horizontal center" tabindex="0">
      <dw-ripple></dw-ripple>
      ${this.leadingIcon ? this._leadingIconTemplate() : ''}
      <span class="mdc-list-item__text layout vertical flex ellipses">
        <span class="mdc-list-item__primary-text ellipses">Two-line item</span>
        ${this.title2 && this.twoLine ? html`<span class="mdc-list-item__secondary-text ellipses">Secondary text</span>` : ''}
      </span>
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
      <dw-icon-button class="mdc-list-item__graphic" ?disabled="${this.disabled}" .icon="${this.trailingIcon}"></dw-icon-button>
    `
  }

}

window.customElements.define('dw-list-item', DwListItem);
