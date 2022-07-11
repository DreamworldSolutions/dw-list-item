/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css } from 'lit-element';
import { LitElement } from '@dreamworld/pwa-helpers/lit-element.js';
import '@dreamworld/dw-icon';
import '@dreamworld/dw-ripple';
import '@dreamworld/dw-tooltip';

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
          user-select: none;
          outline: none;
          ${displayFlex};
          ${horizontal};
          ${centerAligned};
          height: 48px;
          position: relative;
          padding: 0 16px;
          overflow: hidden;
          outline: none;
          cursor:pointer;
          position: relative;
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

        .item-text-container {
          ${displayFlex};
          ${vertical};
          ${flexFactor};
          color: var(--mdc-theme-text-primary, rgba(0, 0, 0, 0.87));
        }

        :host([selected]){
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

        :host(:not([disabled]))::before{
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

        :host(:not([disabled]):hover)::before {
          opacity: 0.04;
        }

        :host(:focus)::before,
        :host(:focus:hover)::before,
        :host([activated])::before {
          opacity: 0.12;
        }

        :host(:focus[selected]:not([disabled]))::before,
        :host(:focus[selected]:not([disabled]):hover)::before{
          opacity: 0.24;
        }

        :host(:not([disabled])[selected])::before {
          opacity: 0.08;
          background-color: var(--mdc-theme-primary, #6200ee);
        }

        :host(:not([disabled])[selected]:hover)::before {
          opacity: 0.12;
        }

        :host([disabled]){
          cursor: normal;
          pointer-events: none;
        }

        :host([disabled]) .item-text-container {
          color: var(--mdc-theme-text-disabled, rgba(0,0,0,0.38));
        }

        :host([dense]) {
          height: 40px;
          --mdc-icon-size: 20px;
        }

        :host([dense]) .list-item__icon {
          margin-left: 0;
          margin-right: 36px;
          width: var(--mdc-icon-size, 20px);
          height: var(--mdc-icon-size, 20px);
        }

        :host([twoline]) {
          height: 72px;
        }

        :host([twoline][dense]) {
          height: 60px;
        }

        /* This is to show ripple on click.
         * By default "dw-ripple" sets relative position to the parent element which is not host element.
         * But it isn't sets relative position on the host element.
         * So, to show ripple we need to make ripple element to fit within host element.
         * Setting important here, because "dw-ripple" elements sets relative position as a inline style on itself in case of parent element is host.
         */
        dw-ripple{
          position: absolute !important;
          top: 0px;
          right: 0px;
          bottom: 0px;
          left: 0px;
        }
        
        :host(:not([dense])[hasLeadingIcon]) .leading-icon-container {
          width: var(--mdc-icon-size, 24px);
          height: var(--mdc-icon-size, 24px);
          margin-right: 16px;
        }

        :host([dense][hasLeadingIcon]) .leading-icon-container {
          width: var(--mdc-icon-size, 20px);
          height: var(--mdc-icon-size, 20px);
          margin-right: 16px;
        }

        /**
         * When selectioMode is none we have no need to set foucus color. So override this style.
         */
        :host(:focus:hover)::before {
          opacity: 0;
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
      twoLine: { type: Boolean, reflect: true },

      /**
       * Input property
       * Shows disabled style when true
       */
      disabled: { type: Boolean, reflect: true },

      /**
       * Input property
       * Defines whether selection should be toggles or force select
       * Possible values: `toggle`, `default` & `none`.
       * Default value is `default`
       */
      selectionMode: { type: String },

      /**
       * Input/Output property
       * Set to true to show item preselected
       * It will be set to true on click or enter
       */
      selected: { type: Boolean, reflect: true },

      /**
       * Input property.
       * set to true when item has leading icon.
       */
      hasLeadingIcon: { type: Boolean, reflect: true },

      /**
       * Input property.
       * Type of the leading icon. By default it shows FILLED icon.
       * Possible values: FILLED and OUTLINED
       */
      leadingIconFont: { type: String },

      /**
       * Input property.
       * Type of the trailing icon. By default it shows FILLED icon.
       * Possible values: FILLED and OUTLINED
       */
      trailingIconFont: { type: String },

      /**
       * Input property.
       * set to true when item has trailing icon..
       */
      hasTrailingIcon: { type: Boolean },

      /**
       * When ellipsis is active for title1, show content into tooltip.
       */
      _tooltipTitle1: { type: String },

      /**
       * When ellipsis is active for title2, show content into tooltip.
       */
      _tooltipTitle2: { type: String },

      /**
       * Input property.
       * use to set placement of tooltip.
       */
      tooltipPlacement : { type: String },

      /**
       * Input property.
       * Set it to true to show ripples on the selected item.
       */
      showSelectedRipple : { type: Boolean },

      /**
       * Whether or not list-item is focusable.
       * Default `true`
       */
      focusable: { type: Boolean },

      /**
       * Whether or not list-item is activated.
       * same style as focused.
       * default `false`
       */
      activated: { type: Boolean },
    };
  }

  set selected(value) { 
    if (value === this._selected) { 
      return;
    }

    let oldValue = this._selected;
    this._selected = value;
    this.requestUpdate('selected', oldValue);
    this._triggerSelectionChangedEvent();
  }

  get selected() { 
    return this._selected;
  }

  set disabled(value) { 
    this.setAttribute('tabindex', -1);

    let oldValue = this._disabled;

    this._disabled = value;
    this.requestUpdate('disabled', oldValue);
  }

  get disabled() { 
    return this._disabled;
  }

  set focusable(value) {
    let oldValue = this._focusable;
    if(value === oldValue) {
      return;
    }

    value ? this.setAttribute('tabindex', 0) : this.removeAttribute('tabindex');

    this._focusable = value;
    this.requestUpdate('focusable', oldValue)
  }

  get focusable() {
    return this._focusable;
  }

  constructor(){
    super();

    this.twoLine = false;
    this.dense = false;
    this.disabled = false;
    this.selectionMode = 'default';
    this.selected = false;
    this._keydownHandler = this._keydownHandler.bind(this);
    this._selectItem = this._selectItem.bind(this);
    this.leadingIconFont = "FILLED";
    this.trailingIconFont = "FILLED";
    this.focusable = true;
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('title1') || changedProps.has('title2')) {
      this._setTooltipText();
    }
  }

  render() {
    return html`

      ${this.disabled ? '' : html`<dw-ripple .primary=${this.showSelectedRipple}></dw-ripple>`}

      <!-- Leading icon -->
      ${this.hasLeadingIcon ? this._leadingIconTemplate : ''}

      <!-- Item text -->
      <div class="item-text-container ellipses">
        <div id="title1" class="primary-text subtitle1 ellipses">${this.title1Template}</div>
        ${this._tooltipTitle1 ? html`
          <dw-tooltip 
            .for=${"title1"}
            .content=${this._tooltipTitle1} 
            .extraOptions=${{delay: [500, 0]}}
            .placement=${this.tooltipPlacement}>
          </dw-tooltip>
        ` : ''}
        ${this.title2 && this.twoLine ? html`
          <div id="title2" class="secondary-text body2 ellipses">${this.title2Template}</div>
          ${this._tooltipTitle2 ? html`
            <dw-tooltip 
              .for=${"title2"}
              .content=${this._tooltipTitle2} 
              .extraOptions=${{delay: [500, 0]}}
              .placement=${this.tooltipPlacement}>
            </dw-tooltip>
          ` : ''}
        ` : ''}
      </div>

      <!-- Trailing Icon -->
      ${this.hasTrailingIcon ? this._trailingIconTemplate : ''}
    `;
  }

  get title1Template() {
    if(this.title1) {
      return html`${this.title1}`
    }

    return html`<slot name="title1"></slot>`
  }

  get title2Template() {
    if(this.title2) {
      return html`${this.title2}`
    }

    return html`<slot name="title2"></slot>`
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
      <div class="leading-icon-container">
        <dw-icon class="leading-icon list-item__icon" ?disabled="${this.disabled}" .name="${this.leadingIcon}" .iconFont="${this.leadingIconFont}"></dw-icon>
      </div>
    `;
  }

  /**
   * Returns trailing icon's template
   * Override this function to customize trailing icon
   */
  get _trailingIconTemplate(){
    return html`
      <dw-icon class="list-item__icon trailing-icon" ?disabled="${this.disabled}" .name="${this.trailingIcon}" .iconFont="${this.trailingIconFont}"></dw-icon>
    `;
  }

  /**
   * Handles keyboard events like `down`, `up`, `enter`
   */
  _keydownHandler(e) {
    let keyCode = e.keyCode || e.which;

    //Down Arrows
    if (keyCode === 40) {
      // To prevent browser's scroll up/down 
      e.preventDefault();
      this._focusNextElement(e.target.nextElementSibling);
      return;
    }

    //Up Arrow 
    if (keyCode === 38) {
      // To prevent browser's scroll up/down 
      e.preventDefault();
      this._focusPreviousElement(e.target.previousElementSibling);
      return;
    }

    //Enter
    if (keyCode === 13) { 
      this._selectItem();
      this._dispatchClickEvent();
    }
  }

  /**
   * 
   * Dispatch `click` event when selection mode is `none`.
   */
  _dispatchClickEvent(){
    if(this.selectionMode !== 'none'){
      return;
    }

    this.dispatchEvent(new CustomEvent('click', {
      composed: true
    }));
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
   * Updates selection based on `selectionMode`. Skips if `disabled`.
   */
  _selectItem() { 
    if (this.disabled) { 
      return;
    }

    if(this.selectionMode === 'none'){
      return;
    }

    this.selected = this.selectionMode === 'toggle' ? !this.selected : true;
  }

  /**
   * @event Triggers `selection-changed` events
   */
  _triggerSelectionChangedEvent() { 
    let event = new CustomEvent('selection-changed');
    
    this.dispatchEvent(event);
  }

  /**
   * @return {String} `title1` if ellipsis applied to title1 or `title2` if ellipsis applied to title2.
   * @protected
   */
   _setTooltipText() {
    const title1Tooltip = this.renderRoot.querySelector('.primary-text');
    this._tooltipTitle1 = title1Tooltip && (title1Tooltip.offsetWidth < title1Tooltip.scrollWidth) ? this.title1 : '';

    const title2Tooltip = this.renderRoot.querySelector('.secondary-text');
    this._tooltipTitle2 = title2Tooltip && (title2Tooltip.offsetWidth < title2Tooltip.scrollWidth) ? this.title2 : '';
  }
}

window.customElements.define('dw-list-item', DwListItem);
