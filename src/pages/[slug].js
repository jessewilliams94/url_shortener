import { useRouter } from "next/router";
import { redirects } from "next.config";


const RedirectPage = ({children, href}) => {
    const router = useRouter();

    const {slug} = router.query;
    
    console.log("https://dev.d1crardsd758eu.amplifyapp.com/" + slug);
    return <h2>{`https://dev.d1crardsd758eu.amplifyapp.com/${slug}`}</h2>
};

export default RedirectPage;