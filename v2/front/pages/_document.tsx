import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../stitches.config";

export default () => {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />

        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
