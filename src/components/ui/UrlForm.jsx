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

  const generateShortUrlHandler = () => {
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

    console.log(urlRef.current.value);
  };
  return (
    <>
      
        <Row className="d-grid gap-2 justify-content-md-center text-center">
          <Col className="d-flex-row align-middle">
            <h2>Please submit your URL below.</h2>
            <form action="submit" onSubmit={submitHandler}>
              <div className="d-grid">
                {/* <label htmlFor="url-input">
                </label> */}
                <input type="text" ref={urlRef} />
              </div>
              <div className="d-grid gap-2">
                <Button
                  onClick={generateShortUrlHandler}
                  variant="outline-danger"
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
