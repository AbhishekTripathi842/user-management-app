import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import PrivateRoute from '../lib/front-end/withAuth';

export default function App({ Component, pageProps }: AppProps) {
  return <PrivateRoute>
  <Component {...pageProps} />
  </PrivateRoute> 
  


{/* <PrivateRoute>
  <Component {...pageProps} />
  </PrivateRoute> */}

 
}
