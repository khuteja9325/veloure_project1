import { jsxDEV as baseJsxDEV } from 'react/jsx-dev-runtime';
import { jsx } from './jsx-runtime';
export { Fragment } from 'react/jsx-runtime';
export const jsxDEV: typeof baseJsxDEV = (type, props, key) => jsx(type, props, key === undefined ? undefined : String(key));

export type { JSX } from 'react';

