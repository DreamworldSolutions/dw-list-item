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

export class DwListItem extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        :host[hidden] {
          display: none;
        }
      `
    ];
  }

  static get properties() {
    return {
      
    }
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
      disabled: { type: Boolean, reflect: true }
    };
  }

  render() {
    return html`
      
    `;
  }

}

window.customElements.define('dw-list-item', DwListItem);
