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
              var path = window.location.pathname;
              var search = window.location.search;

              // If on GitHub Pages subdirectory, fix the base path
              if (path.indexOf(base) === 0) {
                // Remove base prefix for router
                var relativePath = path.substring(base.length);
                if (!relativePath.startsWith('/')) {
                  relativePath = '/' + relativePath;
                }
                // Update document base
                var baseEl = document.createElement('base');
                baseEl.href = base + '/';
                document.head.appendChild(baseEl);

                // If on root, redirect to proper path
                if (path === base || path === base + '/') {
                  window.history.replaceState({}, '', base + '/');
                }
              }
            })();
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
