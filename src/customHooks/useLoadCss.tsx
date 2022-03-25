import {useState,useLayoutEffect} from 'react'

function useLoadCss(path:string) {
    const [cssPath, setCssPath] = useState(path)

   useLayoutEffect(() => {
    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = process.env.PUBLIC_URL + cssPath;

    head.appendChild(link);

    return () => { head.removeChild(link); }
    }, [cssPath])
    return setCssPath
}

export default useLoadCss
