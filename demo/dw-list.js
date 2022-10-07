/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from '@dreamworld/pwa-helpers/lit.js';

export class DwList extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: inline-block;
        }

        :host[hidden] {
          display: none;
        }

        .wrapper {
          width: 500px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          margin-bottom: 24px;
        }

        h2 {
          margin-top: 0;
        }
      `,
    ];
  }

  static get properties() {
    return {
      header: { type: String },

      totalItems: { type: Number },
    };
  }

  constructor() {
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
    this.addEventListener("selection-changed", this._onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this.removeEventListener("selection-changed", this._onClick);
  }

  _onClick(e) {
    if (this._previousItem) {
      this._previousItem.removeAttribute("selected");
    }

    this._previousItem = e.target;
  }
}

window.customElements.define("dw-list", DwList);
