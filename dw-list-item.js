import { LitElement, html, css } from "@dreamworld/pwa-helpers/lit.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import "@dreamworld/dw-icon";
import "@dreamworld/dw-ripple";
import "@dreamworld/dw-ellipsis";
import textToHtml from '@dreamworld/web-util/textToHtml';
import htmlTrim from '@dreamworld/web-util/htmlTrim';
import Mark from 'mark.js/src/vanilla.js';

//These are dw style needed by this element.
import { Typography } from "@dreamworld/material-styles/typography";

export class DwListItem extends LitElement {
  static get styles() {
    return [
      Typography,
      css`
        :host {
          box-sizing: border-box;
          user-select: none;
          outline: none;
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 48px;
          position: relative;
          padding: 0 16px;
          overflow: hidden;
          outline: none;
          cursor: pointer;
          position: relative;
          --dw-icon-color-active: var(--mdc-theme-primary, #6200ee);
        }

        :host([hidden]) {
          display: none;
        }

        .item-text-container {
          display: flex;
          flex-direction: column;
          flex: 1;
          flex-basis: 0.000000001px;
          color: var(--mdc-theme-text-primary, rgba(0, 0, 0, 0.87));
          overflow: hidden;
        }

        :host([selected]) {
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
        :host([dense]) .list-item__icon.trailing-icon {
          margin-right: 0;
        }

        .secondary-text {
          color: var(--mdc-theme-text-secondary, rgba(0, 0, 0, 0.54));
        }

        :host(:not([disabled]))::before {
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

        :host([selected]),
        :host([activated]) {
          --mdc-theme-on-surface: var(--mdc-theme-primary);
        }

        :host(:focus)::before,
        :host([activated])::before,
        :host(:not([disabled])[selected])::before  {
          opacity: 0.08;
          background-color: var(--mdc-theme-primary);
        }

        :host(:focus:hover)::before,
        :host([activated]:hover)::before,
        :host(:not([disabled])[selected]:hover)::before  {
          opacity: 0.12;
        }

        :host([disabled]) {
          cursor: normal;
          pointer-events: none;
        }

        :host([disabled]) .item-text-container {
          color: var(--mdc-theme-text-disabled, rgba(0, 0, 0, 0.38));
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
        dw-ripple {
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

        .highlight {
          color: var(--dw-select-highlight-text-color);
          background-color: var(--dw-select-highlight-bg-color);
          font-weight: var(--dw-select-highlight-font-weight);
        }
      `,
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
       * set to true when item has trailing icon.
       */
      hasTrailingIcon: { type: Boolean },

      /**
       * Input property.
       * use to set placement of tooltip.
       */
      tooltipPlacement: { type: String },

      /**
       * Input property.
       * Set it to true to show ripples on the selected item.
       */
      showSelectedRipple: { type: Boolean },

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

      /**
       * Highlight words
       */
      highlight: { type: String },

      /**
       * Input property.
       * set to true when item has leading Symbol.
       */
      leadingIconSymbol: { type: Boolean },

      /**
       * Input property.
       * set to true when item has trailing Symbol
       */
      trailingIconSymbol: { type: Boolean },
    };
  }

  set selected(value) {
    if (value === this._selected) {
      return;
    }

    let oldValue = this._selected;
    this._selected = value;
    this.requestUpdate("selected", oldValue);
    this._triggerSelectionChangedEvent();
  }

  get selected() {
    return this._selected;
  }

  set disabled(value) {
    this.setAttribute("tabindex", -1);

    let oldValue = this._disabled;

    this._disabled = value;
    this.requestUpdate("disabled", oldValue);
  }

  get disabled() {
    return this._disabled;
  }

  set focusable(value) {
    let oldValue = this._focusable;
    if (value === oldValue) {
      return;
    }

    value ? this.setAttribute("tabindex", 0) : this.removeAttribute("tabindex");

    this._focusable = value;
    this.requestUpdate("focusable", oldValue);
  }

  get focusable() {
    return this._focusable;
  }

  constructor() {
    super();

    this.twoLine = false;
    this.dense = false;
    this.disabled = false;
    this.selectionMode = "default";
    this.selected = false;
    this._keydownHandler = this._keydownHandler.bind(this);
    this._selectItem = this._selectItem.bind(this);
    this.leadingIconFont = "FILLED";
    this.trailingIconFont = "FILLED";
    this.tooltipPlacement = 'bottom';
  }

  render() {
    const title2hasContent = this.querySelector('[slot="title2"]') !== null;
    
    return html`
      ${this.disabled ? "" : html`<dw-ripple .primary=${this.showSelectedRipple}></dw-ripple>`}

      <!-- Leading icon -->
      ${this.hasLeadingIcon ? this._leadingIconTemplate : ""}

      <!-- Item text -->
      <div class="item-text-container">
        <dw-ellipsis
          id="title1"
          class="primary-text subtitle1"
          .placement=${this.tooltipPlacement}
          >${this.title1Template}</dw-ellipsis
        >
        ${(this.title2 || title2hasContent) && this.twoLine
          ? html`
              <dw-ellipsis
                id="title2"
                class="secondary-text body2"
                .placement=${this.tooltipPlacement}
                >${this.title2Template}</dw-ellipsis
              >
            `
          : ""}
      </div>

      <!-- Trailing Icon -->
      ${this.hasTrailingIcon ? this._trailingIconTemplate : ""}
    `;
  }

  get title1Template() {
    if (this.title1) {
      return html`${unsafeHTML(this._getTitle(this.title1))}`;
    }

    return html`<slot name="title1"></slot>`;
  }

  get title2Template() {
    if (this.title2) {
      return html`${this.title2}`;
    }

    return html`<slot name="title2"></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("keydown", this._keydownHandler);
    this.addEventListener("click", this._selectItem);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._keydownHandler);
    this.removeEventListener("click", this._selectItem);
  }

  /**
   * Returns leading icon's template
   * Override this function to customize leading icon
   */
  get _leadingIconTemplate() {
    return html`
      <div class="leading-icon-container">
        <dw-icon
          class="leading-icon list-item__icon"
          ?disabled="${this.disabled}"
          .name="${this.leadingIcon}"
          .iconFont="${this.leadingIconFont}"
          .symbol="${this.leadingIconSymbol}"
        ></dw-icon>
      </div>
    `;
  }

  /**
   * Returns trailing icon's template
   * Override this function to customize trailing icon
   */
  get _trailingIconTemplate() {
    return html`
      <dw-icon
        class="list-item__icon trailing-icon"
        ?disabled="${this.disabled}"
        .name="${this.trailingIcon}"
        .iconFont="${this.trailingIconFont}"
        .symbol="${this.trailingIconSymbol}"
      ></dw-icon>
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
      let nextFocusableElement = this._getNextFocusableElement(e.target);
      this._focusNextElement(nextFocusableElement);
      return;
    }

    //Up Arrow
    if (keyCode === 38) {
      // To prevent browser's scroll up/down
      e.preventDefault();
      let previousFocusableElement = this._getPreviousFocusableElement(e.target);
      this._focusPreviousElement(previousFocusableElement);
      return;
    }

    //Enter
    if (keyCode === 13) {
      this._selectItem();
      this._dispatchClickEvent();
    }
  }

  _getNextFocusableElement(el) {
    if (
      el.nextElementSibling &&
      (el.nextElementSibling.hasAttribute("opened") ||
        el.nextElementSibling.hasAttribute("hasChild"))
    ) {
      return el.nextElementSibling.children[0];
    }

    if (el.nextElementSibling) {
      return el.nextElementSibling;
    }

    if (
      el.parentElement &&
      (el.parentElement.hasAttribute("opened") || el.parentElement.hasAttribute("hasChild"))
    ) {
      return el.parentElement.nextElementSibling;
    }

    return el;
  }

  _getPreviousFocusableElement(el) {
    if (
      el.previousElementSibling &&
      (el.previousElementSibling.hasAttribute("opened") ||
        el.previousElementSibling.hasAttribute("hasChild"))
    ) {
      let lastChildren = el.previousElementSibling.children.length - 1;
      return el.previousElementSibling.children[lastChildren];
    }

    if (el.previousElementSibling) {
      return el.previousElementSibling;
    }

    if (
      el.parentElement &&
      (el.parentElement.hasAttribute("opened") || el.parentElement.hasAttribute("hasChild"))
    ) {
      return el.parentElement.previousElementSibling;
    }

    return el;
  }

  /**
   *
   * Dispatch `click` event when selection mode is `none`.
   */
  _dispatchClickEvent() {
    if (this.selectionMode !== "none") {
      return;
    }

    this.dispatchEvent(
      new CustomEvent("click", {
        composed: true,
      })
    );
  }

  /**
   * Focused next element. It skips disabled element
   */
  _focusNextElement(el) {
    if (!el) {
      return;
    }

    if (el.hasAttribute("disabled") || el.disabled) {
      let nextFocusableElement = this._getNextFocusableElement(el);
      this._focusNextElement(nextFocusableElement);
      return;
    }

    el.focus && el.focus();
  }

  /**
   * Focused previous element. It skips disabled element
   */
  _focusPreviousElement(el) {
    if (!el) {
      return;
    }

    if (el.hasAttribute("disabled") || el.disabled) {
      let previousFocusableElement = this._getPreviousFocusableElement(el);
      this._focusPreviousElement(previousFocusableElement);
      return;
    }

    el.focus && el.focus();
  }

  /**
   * Updates selection based on `selectionMode`. Skips if `disabled`.
   */
  _selectItem() {
    if (this.disabled) {
      return;
    }

    if (this.selectionMode === "none") {
      return;
    }

    this.selected = this.selectionMode === "toggle" ? !this.selected : true;
  }

  /**
   * @event Triggers `selection-changed` events
   */
  _triggerSelectionChangedEvent() {
    let event = new CustomEvent("selection-changed");

    this.dispatchEvent(event);
  }

  /**
   * Convert text into HTML Template with Highlight text using query string
   * @param {String} text
   * @returns {HTMLTemplateElement}
   */
  _getTitle(text) {
    if (!this.highlight || !text) {
      return text;
    }

    const keywords = [...this.highlight.split(' '), this.highlight];
    
    const newHtml = textToHtml(text);
    const instance = new Mark(newHtml);
    instance.mark(keywords, {
      "element": "span",
      "className": "highlight",
      "acrossElements": true
    });
    return htmlTrim(newHtml);
  }
}

customElements.define("dw-list-item", DwListItem);
