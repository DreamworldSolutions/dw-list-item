import { css } from 'lit-element';

export  const listItemStyles = 
 [
  css `

.mdc-list-item {
  height: 48px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  padding: 0 16px;
  overflow: hidden;
}



.mdc-list-item__graphic {
  display: inline-flex;
  background-color: transparent;
  color: var(--dw-icon-color, rgba(0, 0, 0, 0.38));
  margin-left: 0;
  margin-right: 32px;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
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
  color: var(--mdc-theme-on-surface, #000);
}

.mdc-list-item__text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}


.mdc-list-item__primary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  margin-top: 0;
  /* @alternate */
  line-height: normal;
  display: block;
}

/* .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
} */


.mdc-list--dense .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  /* @alternate */
  line-height: normal;
  margin-bottom: -20px;
}

/* .mdc-list--dense .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 24px;
  content: "";
  vertical-align: 0;
}

.mdc-list--dense .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
} */

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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  margin-top: 0;
  /* @alternate */
  line-height: normal;
  display: block;
}

/* .mdc-list-item__secondary-text::before {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: 0;
} */

.mdc-list--dense .mdc-list-item__secondary-text {
  display: block;
  margin-top: 0;
  /* @alternate */
  line-height: normal;
  font-size: inherit;
}
/* .mdc-list--dense .mdc-list-item__secondary-text::before {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: 0;
} */

.mdc-list--dense .mdc-list-item {
  height: 40px;
}

.mdc-list--dense .mdc-list-item__graphic {
  /* @noflip */
  margin-left: 0;
  /* @noflip */
  margin-right: 36px;
  width: 20px;
  height: 20px;
}


.mdc-list--avatar-list .mdc-list-item {
  height: 56px;
}

.mdc-list--avatar-list .mdc-list-item__graphic {
  /* @noflip */
  margin-left: 0;
  /* @noflip */
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
  /* @noflip */
  margin-left: 0;
  /* @noflip */
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
  /* @noflip */
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
  /* @noflip */
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
 ]
