import { useRouter } from "next/router";
import { redirects } from "next.config";


const RedirectPage = ({children, href}) => {
    const router = useRouter();

    const {pid} = router.query;
    
    console.log(pid)
    return <h2>hi</h2>
};

export default RedirectPage;