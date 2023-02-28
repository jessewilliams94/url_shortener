import "bootstrap/dist/css/bootstrap.min.css";
import UrlForm from "@/components/ui/UrlForm";
import NewForm from "@/components/ui/NewForm";
import { withAuthenticator } from "@aws-amplify/ui-react";
import React from "react";
import UrlModal from "@/components/ui/UrlModal";
import { useState } from "react";
import classes from "./index.module.css";
import SEO from "@/components/wraps/seo";

import { API } from "aws-amplify";

import * as mutations from "../../src/graphql/mutations";
import * as queries from "../../src/graphql/queries";

const modalDataArray = [
  { style: classes.modalSuccess, title: "Success!", showCopyButton: true },
  { style: "modalWarning", title: "warning", showCopyButton: false },
  { style: "modalError", title: "Error: Invalid URL.", showCopyButton: false },
];

function Home() {
  const [finalUrl, setFinalUrl] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalStyle, setModalStyle] = useState(modalDataArray[0]);
  const recaptchaRef = React.createRef();

  const onCreateUrl = (shortenedUrl) => {
    setFinalUrl(shortenedUrl);
    setModalStyle(modalDataArray[0]);
    setShowModal(true);
  };

  // const urlHandler = (result) => {
  //   let newUrl = "localhost:3000/" + result;

  //   setFinalUrl(newUrl);
  //   if (newUrl) {
  //     setModalStyle(modalDataArray[0]);
  //     setShowModal(true);
  //   }
  // };
  const errorCatcher = (error) => {
    if (error) {
      setFinalUrl("");
      setModalStyle(modalDataArray[2]);
      setShowModal(true);
    }
  };

  const onReCAPTCHAChange = (captchaCode) => {
    if (!captchaCode) {
      return;
    }
  };
  return (
    
    <main className={classes.main}>
      <SEO
        pageTitle="Short"
        pageDescription="Welcome to my URL shortener application."
      />
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

export async function getStaticProps() {
  const urlData = await API.graphql({
    query: queries.listURLS,
  });

  return {
    props: {
      urls: urlData.data.listURLS.items,
    },
  };
}
