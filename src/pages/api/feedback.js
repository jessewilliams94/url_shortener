// import fs from "fs";
// import path from "path";
import checkUrl from "helpers/validUrl";
// import { connectDatabase, insertDocument } from "helpers/db-util";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "config/ddbDocClient";
// import { useRouter } from "next/router";

// import { Storage } from "@aws-amplify/storage"

// await Storage.put("test.txt", "Hello");

const validateCaptcha = (response_key) => {
  return new Promise((resolve, reject) => {
    const secret_key = process.env.RECAPTCHA_SECRET_KEY

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`

    fetch(url, {
      method: 'post'
    })
      .then((response) => response.json())
      .then((google_response) => {
        if (google_response.success == true) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch((err) => {
        console.log(err)
        resolve(false)
      })
  })
}

async function handler(req, res) {
  const  {url, shortUrl, urlId} = req.body;



  // if (!(await validateCaptcha(req.body['g-recaptcha-response']))) {
  //   return res.redirect(`/captcha`)
  // }
  // delete req.body['g-recaptcha-response']

  if (req.method === "POST") {
  

    if (checkUrl(url)) {
      
      const params = {
        TableName: "Urls",
        Item: {
          user: "anonymous",
          id: urlId,
          dateAdded: new Date().toLocaleString(),
          dateModified: "",
          link_original: url,
          link_shortened: shortUrl
        },
      };
  
      try {
        const data = await ddbDocClient.send(new PutCommand(params));
        console.log("Success - item added", data);
        res.status(200).json({message: "success"})
        // alert("Data Added Successfully");
        // router.push("/viewdata");
        // document.getElementById("addData-form").reset();
      } catch (err) {
        console.log("Error", err.stack);
        res.status(400).json({message: 'failureeeee'})
      }

    } else {
      res.status(400).json({ message: "failure!" });
    }
  }
  // if (req.method === 'GET') {
  //   const params = {
  //     TableName: "Urls",
  //     Key: {
  //       'id': {N: }
  //     },
  //   };

  //   try {
  //     const data = await ddbDocClient.send(new PutCommand(params));
  //     console.log("Success - item added", data);
  //     res.status(200).json({message: "success"});
  //     // alert("Data Added Successfully");
  //     // router.push("/viewdata");
  //     // document.getElementById("addData-form").reset();
  //   } catch (err) {
  //     console.log("Error", err.stack);
  //     res.status(400).json({message: 'failureeeee'})
  //   }

  // } else {
  //   res.status(400).json({ message: "failure!" });
  // }
  // }
  
}
export default handler;
