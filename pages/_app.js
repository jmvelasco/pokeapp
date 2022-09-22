import { GlobalStyles } from "../styles/globalStyles";
import "../utils/strings";
import { NavigationMenu } from "../components/NavigationMenu";
import { Theme, Themes } from '@ocs/styles';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Theme theme={Themes["los-angeles-1932"]}>
        <GlobalStyles />
        <NavigationMenu />
        <Component {...pageProps} />
      </Theme>
    </>
  );
}

export default MyApp;
