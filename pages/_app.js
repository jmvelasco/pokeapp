import { GlobalStyles } from '../styles/globalStyles';
import '../utils/strings';

function MyApp({ Component, pageProps }) {
  
  return <>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
}

export default MyApp
