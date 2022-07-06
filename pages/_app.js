import '../public/resources/styles/style.css';
import { withRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withRouter(MyApp);
