import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LanguageProvider } from '../src/context/LanguageContext';
import { jsx, jsxs } from '../src/i18n/jsx-runtime';
import { jsxDEV } from '../src/i18n/jsx-dev-runtime';

function render(language: string, content: React.ReactNode, storageBlocked = false) {
  Object.defineProperty(globalThis, 'window', { configurable: true, value: {
    localStorage: { getItem: () => { if (storageBlocked) throw new Error('Blocked'); return language; } },
  } });
  return renderToStaticMarkup(React.createElement(LanguageProvider, { children: content }));
}
const content = jsxs('div', { children: [
  jsx('h1', { children: 'YOUR SCENT.' }),
  jsx('input', { placeholder: 'Email Address', 'aria-label': 'Search Fragrances', value: 'Shop', readOnly: true }),
  jsx('option', { children: 'Shop' }),
  jsx('span', { translate: 'no', children: 'Shop' }),
] });
const hindi = render('hi', content);
assert.match(hindi, /आपकी खुशबू/);
assert.match(hindi, /placeholder="ईमेल पता"/);
assert.match(hindi, /aria-label="खुशबू खोजें"/);
assert.match(hindi, /value="Shop"/);
assert.match(hindi, /<option value="Shop">खरीदारी<\/option>/);
assert.match(hindi, /translate="no">Shop/);
assert.match(render('en', content), /YOUR SCENT\./);
assert.match(render('invalid', content), /YOUR SCENT\./);
assert.match(render('hi', content, true), /YOUR SCENT\./);
assert.match(render('hi', jsxDEV('span', { children: 'Shop' }, undefined, false, undefined, undefined)), /खरीदारी/);
console.log('Localization checks passed: English, Hindi, attributes, form values, opt-out, development runtime, and blocked storage.');
