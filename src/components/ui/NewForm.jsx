import React from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

import { useRef } from "react";
import classes from "./UrlForm.module.css";
import { useState } from "react";
import checkUrl from "helpers/validUrl";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";

const NewForm = (props) => {
  const urlRef = useRef();
  const [urlString, setUrlString] = useState("");
  const [validUrl, setValidUrl] = useState(true);
  const router = useRouter();
  const recaptchaRef = React.createRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    recaptchaRef.current.execute();


    const submittedURL = urlRef.current.value;

    if (checkUrl(submittedURL) === false) {
      props.errorSubmit("error");
      return;
    }

    let result = "https://dev.d1crardsd758eu.amplifyapp.com/";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

    const shortenedUrl = result;

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ url: submittedURL, shortUrl: shortenedUrl }),
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

  const onReCAPTCHAChange = (captchaCode) => {
    if (!captchaCode) {
      return;
    }
  };
  const formStyle = {backgroundColor: "white", border: "1px solid black", borderRadius: "5px" , padding: "2em", boxShadow: "0.5px 0.5px 2px black", margin: "1em"};

  return (
    <Form style={formStyle} variant="primary" className="max-vw-100" method="post" onSubmit={submitHandler}>
      <h2 >Please submit your URL below.</h2>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={onReCAPTCHAChange}
      />
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
    </Form>
    // <Form>
    //   <Form.Group className="mb-3">
    //     <Form.Control placeholder="https://www.please-enter-your-URL-here.com" type="url"></Form.Control>
    //   </Form.Group>
    //   <Button variant="primary">Submit</Button>
    // </Form>
  );
};

export default NewForm;
