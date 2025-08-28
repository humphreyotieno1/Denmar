import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/tablogo.png" sizes="any" type='image/png' />
        <link rel="icon" href="/tablogo.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/tablogo.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/tablogo.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
