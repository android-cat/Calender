import React from 'react';

declare module 'react' {
  interface CSSProperties {
    [key: string]: any;
  }
}
