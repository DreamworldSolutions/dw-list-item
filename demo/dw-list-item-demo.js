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
import '../dw-list-item';
import './dw-list';

export class DwListItemDemo extends LitElement {
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

        div {
          display: flex;
        }

        div dw-list {
          flex: 1;
        }

        .regular-icon {
          --mdc-icon-size: 24px;
        }

        span {
          background-color: #fde293;
        }

        .child-items {
          display: flex;
          flex-direction: column;
          padding-left: 16px;
        }
      `,
    ];
  }

  static get properties() {
    return {
      _basicItemList: { type: Array },
      _denseItemList: { type: Array },
      _multiItemList: { type: Array },
      _disabledItemList: { type: Array },
    };
  }

  constructor() {
    super();
    this._clickIndex = -1;
    this._basicItemList = [
      "show tooltip on hover of title1 if ellipsis applied to title1. hover to see the tooltip",
      "Item2",
      "Item3",
      "Item4",
      "Item5",
    ];
    this._denseItemList = ["Item1", "Item2", "Item3", "Item4", "Item5"];
    this._multiItemList = [
      "Item1",
      "Item2",
      "show tooltip on hover of title1 if ellipsis applied to title1. hover to see the tooltip",
      "Item4",
    ];
    this._disabledItemList = ["Item1", "Item2"];
  }

  render() {
    return html`
      <div>
        <dw-list header="Basic">
          ${this._basicItemList.map(
            (item, index) => html`
              <dw-list-item title1="${item}" .focusable=${false} trailingIcon="edit" hasTrailingIcon></dw-list-item>
            `
          )}
          <dw-list-item disabled title1="test"></dw-list-item>
          <dw-list-item activated
            ><div slot="title1">Hello <span>World</span></div></dw-list-item
          >
          <dw-list-item title1="Dream World, dreamworld !" .highlight=${"dream"}></dw-list-item>
        </dw-list>

        <dw-list header="Dense">
          ${this._denseItemList.map(
            (item, index) => html` <dw-list-item dense title1="${item}"></dw-list-item> `
          )}
        </dw-list>
      </div>

      <div>
        <dw-list header="Multi line">
          ${this._multiItemList.map(
            (item, index) => html`
              <dw-list-item
                leadingIcon="favorite"
                twoLine
                title1="${item}"
                title2="show tooltip on hover of title2 if ellipsis applied to title2. hover to see the tooltip"
              ></dw-list-item>
            `
          )}
        </dw-list>

        <dw-list header="With icons">
          ${this._basicItemList.map(
            (item, index) => html`
              <dw-list-item
                title1="${item}"
                hasLeadingIcon
                leadingIcon="brightness_4"
                leadingIconFont="OUTLINED"
              ></dw-list-item>
            `
          )}
        </dw-list>
      </div>

      <div>
        <dw-list header="Dense with icons (icon size 24px)">
          ${this._basicItemList.map(
            (item, index) => html`
              <dw-list-item
                dense
                class="regular-icon"
                title1="${item}"
                hasLeadingIcon
                leadingIcon="brightness_4"
                leadingIconFont="OUTLINED"
              ></dw-list-item>
            `
          )}
        </dw-list>

        <dw-list header="Dense with icons (icon size 20px)">
          ${this._basicItemList.map(
            (item, index) => html`
              <dw-list-item
                dense
                title1="${item}"
                hasLeadingIcon
                leadingIcon="brightness_4"
                leadingIconFont="OUTLINED"
              ></dw-list-item>
            `
          )}
        </dw-list>
      </div>

      <dw-list header="Disabled">
        ${this._disabledItemList.map((item, index) => html`
          <dw-list-item disabled title1="${item}" trailingIcon="account_circle" trailingIconFont="OUTLINED"></dw-list-item>
        `)}
      </dw-list>

      <div>
        <dw-list header="Child item with focus traversal">
          ${this._denseItemList.map((item, index) => html`
            <dw-list-item title1="${item}"></dw-list-item>
            ${index === 2 ? html`
              <div class="child-items" hasChild>
                ${this._disabledItemList.map((item, index) => html`
                  <dw-list-item  title1="${item}"></dw-list-item>
                `)}
              </div>
            ` : ``}
          `)}
        </dw-list>

        <dw-list header="Disabled child item">
          ${this._denseItemList.map((item, index) => html`
            <dw-list-item title1="${item}"></dw-list-item>
            ${index === 2 ? html`
              <div class="child-items" hasChild>
                ${this._disabledItemList.map((item, index) => html`
                  <dw-list-item disabled title1="${item}"></dw-list-item>
                `)}
              </div>
            ` : ``}
          `)}
        </dw-list>
      </div>
    `;
  }
}

window.customElements.define("dw-list-item-demo", DwListItemDemo);
