import 'tailwindcss/tailwind.css'
import {AuthProvider} from '../hooks/Authentication'

function MyApp({ Component, pageProps }) {
  return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
  )
}

export default MyApp