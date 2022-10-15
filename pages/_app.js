import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import NonSSRWrapper from '../components/NonSSRWrapper'


function MyApp({ Component, pageProps }) {
  return (
    <NonSSRWrapper>
      <Component {...pageProps} />
    </NonSSRWrapper>
  )
}

export default MyApp
