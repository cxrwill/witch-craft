import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>WitchCraft - 赛博女巫日记 v2</title>
        <ScrollViewStyleReset />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // GitHub Pages SPA fallback
              var searchParams = new URLSearchParams(window.location.search);
              var redirect = searchParams.get('redirect');
              if (redirect) {
                var newPath = redirect;
                var base = window.location.pathname.match(/\\/witch-craft/);
                if (base) {
                  window.history.replaceState({}, '', newPath);
                } else {
                  window.history.replaceState({}, '', newPath);
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
