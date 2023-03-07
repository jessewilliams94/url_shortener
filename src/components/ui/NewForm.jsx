import React from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useRef } from "react";
import classes from "./UrlForm.module.css";
import { useState, useEffect } from "react";
import checkUrl from "helpers/validUrl";
import ReCAPTCHA from "react-google-recaptcha";

const NewForm = (props) => {
  const urlRef = useRef();
  const [validUrl, setValidUrl] = useState(true);
  const recaptchaRef = useRef(null);
  const [verified, setVerified] = useState(false);
  // const [fname, setFName] = useState("");
  // const recaptchaRef = useRef(null);


  const submitHandler = async (event) => {
    event.preventDefault();

    if (grecaptcha.getResponse() === '') {
      event.preventDefault()
      alert("Please click <I'm not a robot> before sending the job")
      return;
    }

    const captchaToken = recaptchaRef.current.value;
    // let data = { fname };

    // recaptchaRef.current.execute();

    const submittedURL = urlRef.current.value;

    if (checkUrl(submittedURL) === false) {
      props.errorSubmit("error");
      return;
    }

    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const shortenedUrl = "https://dev.d1crardsd758eu.amplifyapp.com/" + result;

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        urlId: result,
        url: submittedURL,
        shortUrl: shortenedUrl
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    props.onSubmit(shortenedUrl);
    urlRef.current.value = "";
    setValidUrl(true);
  };

  // function onReCAPTCHAChange(token) {
  //   console.log(token);
  // }
  // const onVerify = useCallback((token) => {
  //   setToken(token);
  // });

  const handleChange = (value) => {
    // console.log('captcha value: ', value); 
    setVerified(true);
  };

  const formStyle = {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "2em",
    boxShadow: "0.5px 0.5px 2px black",
    margin: "1em",
  };

  return (
    <>
      <Form
        id="demo-form"
        style={formStyle}
        variant="primary"
        className="max-vw-100"
        method="post"
        onSubmit={submitHandler}
      >
        <h2 id={classes.h2}>Please submit your URL below.</h2>
        
        <div className="d-grid">
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
          {/* <GoogleReCAPTCHA
            onVerify={onVerify}
            ref={recaptchaRef}
            // onChange={onReCAPTCHAChange}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          /> */}
          {verified && <Button variant="primary" type="submit">
            Submit
          </Button> || <Button disabled variant="primary" type="submit">Submit</Button>}
          

          <ReCAPTCHA
          ref={recaptchaRef}
          size="normal"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={handleChange}
        />
        </div>
      
      </Form>
    </>
  );
};

export default NewForm;
