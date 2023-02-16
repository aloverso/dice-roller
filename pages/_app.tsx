import "@styles/index.scss";
import { ReactElement } from "react";
import { AppProps } from "next/app";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <div>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-QPVERP6PDK" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-QPVERP6PDK');
          `,
        }}
      />
      <Head>
        <title>RPG Dice Roller</title>
        <meta
          name="description"
          content="The simplest online RPG Dice Roller for tabletop games like Dungeons and Dragons (D&D). Roll any number or type of dice."
        />
      </Head>
      <Component {...pageProps} />
    </div>
  );
};

export default App;
