import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Amplify} from "aws-amplify"
import awsconfig from "/src/aws-exports"
import '@aws-amplify/ui-react/styles.css'


// import * as AWS from 'aws-sdk';
// import { ConfigurationOptions } from 'aws-sdk';

// const configuration: ConfigurationOptions = {
//       region: 'us-east-2',
//       secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
//       accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID
// }

// AWS.config.update(configuration);

Amplify.configure({...awsconfig,ssr:true})

function MyApp({ Component, pageProps }) {
      return  <Component {...pageProps} />
   
}

export default MyApp