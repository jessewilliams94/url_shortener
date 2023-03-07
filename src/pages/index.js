import "bootstrap/dist/css/bootstrap.min.css";

import NewForm from "@/components/ui/NewForm";
import { withAuthenticator } from "@aws-amplify/ui-react";
import React from "react";
import UrlModal from "@/components/ui/UrlModal";
import { useState } from "react";
import classes from "./index.module.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";


import * as mutations from "../../src/graphql/mutations";
import * as queries from "../../src/graphql/queries";

const modalDataArray = [
  { style: classes.modalSuccess, title: "Success!", showCopyButton: true, type: "success" },
  { style: "modalError", title: "Error: Invalid URL.", showCopyButton: false, type: "error" },
];

function Home() {
  const [finalUrl, setFinalUrl] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalStyle, setModalStyle] = useState(modalDataArray[0]);


  const onCreateUrl = (shortenedUrl) => {
    setFinalUrl(shortenedUrl);
    setModalStyle(modalDataArray[0]);
    setShowModal(true);
  };

  const errorCatcher = (error) => {
    if (error) {
      setFinalUrl("");
      setModalStyle(modalDataArray[1]);
      setShowModal(true);
    }
  };

  return (
    <main className={classes.main}>
      <NewForm onSubmit={onCreateUrl} errorSubmit={errorCatcher}></NewForm>
      <UrlModal
        open={showModal}
        onClose={() => setShowModal(false)}
        showButton={modalStyle.showCopyButton}
        styleId={modalStyle}
        displayURL={finalUrl}
      ></UrlModal>
    </main>
  );
}

export default Home;

// export async function getStaticProps() {
//   const urlData = await API.graphql({
//     query: queries.listURLS,
//   });

//   return {
//     props: {
//       urls: urlData.data.listURLS.items,
//     },
//   };
// }
