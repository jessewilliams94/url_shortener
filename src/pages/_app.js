import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Amplify} from "aws-amplify"
import awsconfig from "../aws-exports"
import '@aws-amplify/ui-react/styles.css'
import Container from 'react-bootstrap/Container'

Amplify.configure({...awsconfig,ssr:true})

function MyApp({ Component, pageProps }) {
      return <Container>
            <Component {...pageProps} />
      </Container>
}

export default MyApp