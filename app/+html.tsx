import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>WitchCraft - 赛博女巫日记</title>
        <ScrollViewStyleReset />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Fix base URL for GitHub Pages subdirectory
              var base = '/witch-craft';
              var currentPath = window.location.pathname;
              if (currentPath === base + '/' || currentPath === base) {
                window.history.replaceState({}, '', base + '/');
              }
            })();
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
