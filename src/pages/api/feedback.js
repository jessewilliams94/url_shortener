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
    const url = req.body.url;

    if (checkUrl(url)) {
      let result = "localhost:3000/";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
 
      const params = {
        TableName: "Urls",
        Item: {
          id: Math.floor(Math.random() * 10000),
          dateAdded: new Date().toLocaleString(),
          dateModified: "",
          link_original: url,
          link_shortened: result
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


      // const newFeedback = {
      //   id: new Date().toISOString(),
      //   url: url,
      //   shortUrl: result,
      // };

      // let client;

      // try {
      //   client = await connectDatabase();
      // } catch (error) {
      //   res.status(500).json({message: 'fucking failure'});
      //   return;
      // }

      // try {
      //   await insertDocument(client, 'urls', newFeedback);
      //   client.close();
      // } catch (error) {
      //   res.status(500).json({message: 'success', url: newUrl});
      // }


      // console.log(newFeedback);

      // const filePath = path.join(process.cwd(), "data", "feedback.json");
      // const fileData = fs.readFileSync(filePath);

      // const data = JSON.parse(fileData);
      // data.push(newFeedback);
      // fs.writeFileSync(filePath, JSON.stringify(data));
      // res.status(201).json({ message: "success!", feedback: newFeedback });
    } else {
      res.status(400).json({ message: "failure!" });
    }
  }
}

// const handleSubmit = async (event) => {
//   // Stop the form from submitting and refreshing the page.
//   event.preventDefault();

//   // Get data from the form.
//   const params = {
//     TableName: "URL",
//     Item: {
//       id: Math.floor(Math.random() * 10000),
//       dateAdded: new Date().toLocaleString(),
//       dateModified: "",
//       firstName: event.target.firstName.value,
//       lastName: event.target.lastName.value,
//       city: event.target.city.value,
//       phoneNumber: event.target.phoneNumber.value,
//     },
//   };

//   try {
//     const data = await ddbDocClient.send(new PutCommand(params));
//     console.log("Success - item added", data);
//     alert("Data Added Successfully");
//     router.push("/viewdata");
//     document.getElementById("addData-form").reset();
//   } catch (err) {
//     console.log("Error", err.stack);
//   }
// };
export default handler;
