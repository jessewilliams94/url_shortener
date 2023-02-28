import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Amplify } from "aws-amplify";
import awsconfig from "/src/aws-exports";
import "@aws-amplify/ui-react/styles.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

// import * as AWS from 'aws-sdk';
// import { ConfigurationOptions } from 'aws-sdk';

// const configuration: ConfigurationOptions = {
//       region: 'us-east-2',
//       secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
//       accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID
// }

// AWS.config.update(configuration);

Amplify.configure({ ...awsconfig, ssr: true });

function MyApp({ Component, pageProps }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY}
      scriptProps={{
        async: false, // optional, default to false,
        defer: true, // optional, default to false
        appendTo: "body", // optional, default to "head", can be "head" or "body",
        nonce: undefined,
      }}
    >
      <Component {...pageProps} />
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
