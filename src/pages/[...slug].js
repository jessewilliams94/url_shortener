import { useRouter } from "next/router";
import { redirects } from "next.config";


const RedirectPage = ({children, href}) => {
    const router = useRouter();

    const {source, destination, permanent} = redirects;
    
    console.log(source)
    return <h2>hi</h2>
};

export default RedirectPage;