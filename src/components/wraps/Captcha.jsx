import {
    GoogleReCaptchaProvider,
    useGoogleReCaptcha
  } from 'react-google-recaptcha-v3';
  
  const YourReCaptchaComponent = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
  
    // Create an event handler so you can call the verification on button click event or form submit
    const handleReCaptchaVerify = useCallback(async () => {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
        return;
      }
  
      const token = await executeRecaptcha('yourAction');
      // Do whatever you want with the token
    }, [executeRecaptcha]);
  
    // You can use useEffect to trigger the verification as soon as the component being loaded
    useEffect(() => {
      handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);
  
    return <div>
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
        <YourReCaptchaComponent />
          </GoogleReCaptchaProvider><button onClick={handleReCaptchaVerify}>Verify recaptcha</button>
    </div>;
  };


  export default YourReCaptchaComponent;