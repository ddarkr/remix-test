import type { ReactNode } from 'react';
import { useContext, useEffect } from 'react';
import type { MetaFunction } from '@remix-run/cloudflare';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { withEmotionCache } from '@emotion/react';
import ServerStyleContext from '~/styles/server.context';
import ClientStyleContext from '~/styles/client.context';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: "Doda's Remix testing",
  viewport: 'width=device-width,initial-scale=1',
});

interface DocumentProps {
  children: ReactNode;
  title?: string;
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

const Document = withEmotionCache(({ children, title }: DocumentProps, emotionCache) => {
  const serverStyleData = useContext(ServerStyleContext);
  const clientStyleData = useContext(ClientStyleContext);

  // Only executed on client
  useEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;

    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach(tag => {
      (emotionCache.sheet as any)._insertTag(tag);
    });

    // reset cache to re-apply global styles
    clientStyleData.reset();
  }, [clientStyleData, emotionCache.sheet]);

  return (
    <html lang="en">
      <head>
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        {serverStyleData?.map(({ key, ids, css }) => (
          <style
            key={key}
            data-emotion={`${key} ${ids.join(' ')}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: css }}
          />
        ))}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
});
