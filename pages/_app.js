import '@/styles/globals.css'
import {Footer, Header, Nav} from "@/components";
import { wrapper } from '@/modules/store'
const App = ({ Component, pageProps }) => {
  return <>
   <Header/>
  <Nav/><div className='AppMinHeight'>
  <Component {...pageProps} />
  </div>
  <Footer/>
  </>
}

export default wrapper.withRedux(App)
