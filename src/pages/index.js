import "bootstrap/dist/css/bootstrap.min.css";
import UrlForm from "@/components/ui/UrlForm";
import { withAuthenticator } from "@aws-amplify/ui-react";
import UrlModal from "@/components/ui/UrlModal";
import { useState } from "react";
import classes from "./index.module.css";

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

  const onCreateUrl = async (url, generatedUrl) => {
    const newUrl = {
      original: url,
      shortened: 'test',
    };
    try {
      await API.graphql({
        query: mutations.createURL,
        variables: { input: newUrl },
      });

      SpeechRecognitionResultList((list) => [...list, { ...newUrl }]);
      console.log("successfully created URL");
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const urlHandler = (result) => {
    let newUrl = "localhost:3000/" + result;

    setFinalUrl(newUrl);
    if (newUrl) {
      setModalStyle(modalDataArray[0]);
      setShowModal(true);
    }
  };
  const errorCatcher = (error) => {
    if (error) {
      setFinalUrl("");
      setShowModal(true);
      setModalStyle(modalDataArray[2]);
    }
  };
  return (
    <div id={classes.mainpage}>
      <UrlForm 
        errorSubmit={errorCatcher} 
        urlSubmit={onCreateUrl}
        // urlSubmit={urlHandler}
        ></UrlForm>
      <UrlModal
        open={showModal}
        onClose={() => setShowModal(false)}
        showButton={modalStyle.showCopyButton}
        styleId={modalStyle}
        displayURL={finalUrl}
      ></UrlModal>
    </div>
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
