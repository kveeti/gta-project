import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../stitches.config";

const Doc = () => (
  <Html lang="en">
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <meta name="theme-color" content="#212121" /> {/* for mobile toolbar color */}
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Doc;
