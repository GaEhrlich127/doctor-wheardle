import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'


function MyApp({ Component, pageProps }) {
  return (
    <div data-version='1.2.0'>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
