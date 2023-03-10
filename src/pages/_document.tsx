import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { extractCritical } from "@emotion/server";
import { resetServerContext } from "react-beautiful-dnd";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const page = await ctx.renderPage();
    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(page.html);
    resetServerContext();
    return { ...initialProps, ...page, ...styles };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="http://fonts.googleapis.com/css?family=Rubik"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="http://fonts.googleapis.com/css?family=Consolas"
            rel="stylesheet"
            type="text/css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
