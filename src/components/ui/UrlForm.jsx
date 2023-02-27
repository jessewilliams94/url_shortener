import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useRef } from "react";
import classes from "./UrlForm.module.css";
import { useState } from "react";
import checkUrl from "helpers/validUrl";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";


const UrlForm = (props) => {
  const urlRef = useRef();
  const [urlString, setUrlString] = useState("");
  const [validUrl, setValidUrl] = useState(true);
  const router = useRouter();
  const recaptchaRef = React.createRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    recaptchaRef.current.execute();

    const submittedURL = urlRef.current.value;

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ url: submittedURL }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    if (checkUrl(submittedURL) === false) {
      props.errorSubmit("error");
    }
    urlRef.current.value = "";
    setValidUrl(true);
  };

  const onReCAPTCHAChange = (captchaCode) => {
    if (!captchaCode) {
      return;
    }
  };

  return (
    <>
      <Row className={classes.row} class="d-grid gap-2 justify-content-xs-center text-center">
        <Col className={classes.column} xs="12" class="d-flex-row align-middle">
          <form className="min-vw-100" method="post" onSubmit={submitHandler}>
          <h2 className={classes.submitMessage}>Please submit your URL below.</h2>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={onReCAPTCHAChange}
            />
            <div class="d-grid">
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
            <div class="d-grid gap-2">
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
