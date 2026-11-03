import React from 'react';
import { jsx as baseJsx, jsxs as baseJsxs } from 'react/jsx-runtime';
import { translate, useLanguage } from '../context/LanguageContext';

export { Fragment } from 'react/jsx-runtime';

const translatedAttributes = ['aria-label', 'aria-description', 'title', 'placeholder', 'alt'];
const localize = (value: React.ReactNode): React.ReactNode => {
  if (typeof value === 'string') return translate(value);
  if (Array.isArray(value)) return value.map(localize);
  return value;
};
const elements = new Map<string, React.ComponentType<any>>();
function localizedType(type: any): any {
  if (typeof type !== 'string' || ['script', 'style', 'code', 'pre'].includes(type)) return type;
  if (!elements.has(type)) {
    const Element = (props: any) => {
      useLanguage();
      if (props.translate === 'no') return React.createElement(type, props);
      const next = { ...props, children: localize(props.children) };
      for (const attribute of translatedAttributes) {
        if (typeof props[attribute] === 'string') next[attribute] = translate(props[attribute]);
      }
      // Preserve the submitted value when an option uses its label as its value.
      if (type === 'option' && props.value === undefined && typeof props.children === 'string') {
        next.value = props.children;
      }
      return React.createElement(type, next);
    };
    Element.displayName = `Localized(${type})`;
    elements.set(type, Element);
  }
  return elements.get(type);
}
export const jsx = (type: any, props: any, key?: string) => baseJsx(localizedType(type), props, key);
export const jsxs = (type: any, props: any, key?: string) => baseJsxs(localizedType(type), props, key);

export type { JSX } from 'react';
