// import fs from "fs";
// import path from "path";
import checkUrl from "helpers/validUrl";
// import { connectDatabase, insertDocument } from "helpers/db-util";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "config/ddbDocClient";
// import { useRouter } from "next/router";

// import { Storage } from "@aws-amplify/storage"

// await Storage.put("test.txt", "Hello");

async function handler(req, res) {
  // const router = useRouter();
  if (req.method === "POST") {
    const  {url, shortUrl, urlId} = req.body;

    console.log(url);


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
