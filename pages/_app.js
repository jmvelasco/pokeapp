import { GlobalStyles } from '../styles/globalStyles';
import '../utils/strings';
import { NavigationMenu } from '../components/NavigationMenu';

function MyApp({ Component, pageProps }) {
  
  return <>
    <GlobalStyles />
    <NavigationMenu />
    <Component {...pageProps} />
  </>
}

export default MyApp
