import "bootstrap/dist/css/bootstrap.min.css";
import UrlForm from "@/components/ui/UrlForm";
import { withAuthenticator } from "@aws-amplify/ui-react";
import UrlModal from "@/components/ui/UrlModal";
import { useState } from "react";
import classes from './index.module.css';

const modalData = {
  style: 'modalSuccess',
  title: 'Success!',
  showCopyButton: true
};

const modalDataArray = [
  {style: classes.modalSuccess, title: 'Success!', showCopyButton: true},
  {style: 'modalWarning', title: 'warning', showCopyButton: false},
  {style: 'modalError', title: 'Error: Invalid URL.', showCopyButton: false}
]

function Home() {
  const [finalUrl, setFinalUrl] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalStyle, setModalStyle] = useState(modalDataArray[0]);
  const urlHandler = (result) => {
    let newUrl = ('localhost:3000/' + result);

    setFinalUrl(newUrl);
    if (newUrl) {
      setModalStyle(modalDataArray[0]);
      setShowModal(true);
    }
  };
  const errorCatcher = (error) => {
    if (error) {
      setFinalUrl('');
      setShowModal(true);
      setModalStyle(modalDataArray[2]);
    }
  };
  return (
    <div id={classes.mainpage}>
        <UrlForm errorSubmit={errorCatcher} urlSubmit={urlHandler}></UrlForm>
        <UrlModal open={showModal} onClose={() => setShowModal(false)} showButton={modalStyle.showCopyButton} styleId={modalStyle} displayURL={finalUrl}></UrlModal>
    </ div>
  );
}


export default Home;