import React from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useRef } from "react";
import classes from "./UrlForm.module.css";
import { useState } from "react";
import checkUrl from "helpers/validUrl";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Script from "next/script";

const NewForm = (props) => {
  const urlRef = useRef();
  const [validUrl, setValidUrl] = useState(true);
  const [fname, setFName] = useState('');



  const submitHandler = async (event) => {
    event.preventDefault();

    let data = {fname};

    grecaptcha.ready(function () {
      grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' })
        .then(function (token) {

          data.token = token
          fetch('/api/contactRoute', {
            method: 'POST',
            body: JSON.stringify(data),
          })
            .then(response => {
              console.log("Client Side Response: ", response)
              if (response.status === 500) {
                //error handler
              } else {
                //all good
              }
            })
            .catch(err => {
              console.log("Error: ", err);
            })
        })
    })

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
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

    const shortenedUrl = "https://dev.d1crardsd758eu.amplifyapp.com/" + result;

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ urlId: result, url: submittedURL, shortUrl: shortenedUrl }),
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


  const formStyle = {backgroundColor: "white", border: "1px solid black", borderRadius: "5px" , padding: "2em", boxShadow: "0.5px 0.5px 2px black", margin: "1em"};


  return (
    <>
  <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}></Script>
    <Form id="demo-form" style={formStyle} variant="primary" className="max-vw-100" method="post" onSubmit={submitHandler}>
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
        <Button
          variant="outline-primary"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </Form>
    </>
  );
};

export default NewForm;
