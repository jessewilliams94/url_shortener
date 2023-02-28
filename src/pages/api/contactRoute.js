export default async function contactHandler(req, res) {
    if (req.body) {
  
      const body = JSON.parse(req.body);
  
      async function fetchGoogleVerification(body) {
        const gurl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${body.token}`;
        const response = await fetch(gurl, { method: 'POST' });
        const gResponse = await response.json();
  
        return gResponse;
      }
  
      const googleResponse = await fetchGoogleVerification(body);
  
      if (googleResponse.status = true) {
        //process any further logic here
        
  
      } else {
        console.log("Error: ", googleResponse);
        return res.status(500).json({ status: 'Bad Request' });
      }
  
    }
  
  }