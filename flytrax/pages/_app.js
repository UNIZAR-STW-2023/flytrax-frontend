import '../styles/globals.css'
import { Poppins } from "@next/font/google"
import { Layout } from '../components'
import { StateContext } from '../context/StateContext'
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
});

function MyApp({ Component, pageProps }) {
  return (
    <main className={poppins.className}>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </main>
  )
}

export default MyApp
