import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useRef } from "react";
import classes from "./UrlForm.module.css";
import { useState } from "react";
import checkUrl from "helpers/validUrl";
// import "bootstrap/dist/css/bootstrap.min.css";

// async function saveUrl(url) {
//   const response = await fetch("/api/validation/url", {
//     method: "POST",
//     body: JSON.stringify(url),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const data = response.json();
//   if (!response.ok) {
//     // console.log(data.message);
//     throw new Error(data.message || "something went wrong");
//   }

//   return data;
// }

const UrlForm = (props) => {
  const urlRef = useRef();
  const [urlString, setUrlString] = useState("");
  const [validUrl, setValidUrl] = useState(true);
 

  // const generateShortUrlHandler = () => {
  //   if (urlRef.current.value.length === 0) {
  //     console.log("error");
  //     return;
  //   }
  //   let result = "";
  //   const characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   const charactersLength = characters.length;
  //   for (let i = 0; i < 6; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   // console.log(result);
  //   setUrlString(result);
  //   props.urlSubmit(result);
  // };

  const submitHandler = async (event) => {
    event.preventDefault();

    const submittedURL = urlRef.current.value;

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({url: submittedURL}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => console.log(data));
    if (checkUrl(submittedURL) === false) {
      props.errorSubmit('error');
    }
    urlRef.current.value = "";
    setValidUrl(true);
  };
  return (
    <>
      <Row className="d-grid gap-2 justify-content-md-center text-center">
        <Col className="d-flex-row align-middle">
          <h2>Please submit your URL below.</h2>
          <form method="post" onSubmit={submitHandler}>
            <div className="d-grid">
              {/* <label htmlFor="url-input">
                </label> */}
              <input
                name="url"
                type="string"
                className={`${validUrl && classes.url} ${
                  !validUrl && classes.invalid
                }`}
                ref={urlRef}
              />
            </div>
            <div className="d-grid gap-2">
              <Button
                // onClick={generateShortUrlHandler}
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
