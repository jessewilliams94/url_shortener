import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useRef } from "react";
import classes from "./UrlForm.module.css";
import { useState } from "react";
useState;
// import "bootstrap/dist/css/bootstrap.min.css";

const UrlForm = (props) => {
  const urlRef = useRef();
  const [urlString, setUrlString] = useState("");
  const [validUrl, setValidUrl] = useState(true);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  const generateShortUrlHandler = () => {
    if (urlRef.current.value.length === 0) {
      console.log('error');
      return;
    }
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result);
    setUrlString(result);
    props.urlSubmit(result);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let submittedURL = urlRef.current.value;
    // if (urlRef.length > 0) {
    //   setValidUrl(true);
    // }
    if (submittedURL.trim().length === 0) {
      setValidUrl(false);
      setError(true);
      props.errorSubmit(error);
      console.log('you need to type something')
      return;
    }
    if (!submittedURL.includes('www.')) {
      setValidUrl(false);
      setError(true);
      console.log('needs to be a full website')
      return;
    }
    if (!submittedURL.includes('.com') || !submittedURL.includes('.ca') || !submittedURL.includes('.org')) {
      setValidUrl(false);
      setError(true);
      console.log('needs a webpage ending');
      return;
    }

    console.log(submittedURL);
    urlRef.current.value = '';
    setValidUrl(true);
  };
  return (
    <>
      
        <Row className="d-grid gap-2 justify-content-md-center text-center">
          <Col className="d-flex-row align-middle">
            <h2>Please submit your URL below.</h2>
            <form method="post" action="/api/form" onSubmit={submitHandler}>
            
              <div className="d-grid">
                {/* <label htmlFor="url-input">
                </label> */}
                <input name="url" className={`${validUrl && classes.url} ${!validUrl && classes.invalid}`}  ref={urlRef} /> 
              </div>
              <div className="d-grid gap-2">
                <Button
                  onClick={generateShortUrlHandler}
                  variant="outline-primary"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Col>
        </Row>

      
    </>
    // <Form>
    //   <Form.Group className="mb-3">
    //     <Form.Control placeholder="https://www.please-enter-your-URL-here.com" type="url"></Form.Control>
    //   </Form.Group>
    //   <Button variant="primary">Submit</Button>
    // </Form>
  );
};

export default UrlForm;
