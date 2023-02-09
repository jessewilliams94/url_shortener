import { Inter } from "@next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import UrlForm from "@/components/ui/UrlForm";
import { withAuthenticator } from "@aws-amplify/ui-react";
import UrlModal from "@/components/ui/UrlModal";
import { useState } from "react";
import classes from './index.module.css';
import LinkCreateForm from "@/ui-components/LinkCreateForm";

const inter = Inter({ subsets: ["latin"] });

const modalClass = 'classes.modalWarning';

function Home() {
  const [finalUrl, setFinalUrl] = useState();
  const urlHandler = (result) => {
    const newUrl = ('https://www.test.com/' + result);
    console.log(newUrl);
    setFinalUrl(newUrl);
  };
  return (
    <div id={classes.mainpage}>
      {/* <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous"
        />
      </Head> */}
      <UrlForm urlSubmit={urlHandler}></UrlForm>
      <UrlModal id={modalClass} displayURL={finalUrl}></UrlModal>
    </ div>
  );
}


export default Home;