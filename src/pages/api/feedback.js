import fs from 'fs';
import path from 'path';
import checkUrl from 'helpers/validUrl';

function handler(req, res) {
    
    if (req.method === 'POST') {
        const url = req.body.url;

        if (checkUrl(url)) {
            let result = "localhost:3000/";
                const characters =
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                const charactersLength = characters.length;
                for (let i = 0; i < 6; i++) {
                  result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
            const newFeedback = {
                id: new Date().toISOString(),
                url: url,
                shortUrl: result
            };

            console.log(newFeedback);
    
            //store in a database/file
            const filePath = path.join(process.cwd(), 'data', 'feedback.json');
            const fileData = fs.readFileSync(filePath);
    
            const data = JSON.parse(fileData);
            data.push(newFeedback);
            fs.writeFileSync(filePath, JSON.stringify(data));
            res.status(201).json({message: 'success!', feedback: newFeedback})
        } else {
            res.status(400).json({message: 'failure!'});
        }   
        }

        
}

export default handler;