import {Button} from "react-bootstrap";
import {useState} from "react";
import {yaml2json} from "../../../lib/jsonYamlConversionUtil";

const CopyPermalink = ({nodes, edges, globalDefaults, nodesData, edgesData, language}) => {

    const [isCopied, setIsCopied] = useState(false);

    function getPermaLink() {
        /*let rawLink = [window.location.href]

        if (nodes.length > 0) {
            if (rawLink[0].slice(-1) !== "/") {
                rawLink.push("/")
            }
            rawLink.push("#/rawdata?nodes=");
            rawLink.push(encodeURIComponent(JSON.stringify(nodes)));
            rawLink.push("&edges=");
            rawLink.push(encodeURIComponent(JSON.stringify(edges)));

            rawLink = rawLink.join("");
        }*/

        let customLink = [window.location.href]

        if (customLink[0].slice(-1) !== "/") {
            customLink.push("/")
        }
        customLink.push("#/customdata?globaldefaults=");

        customLink.push(encodeURIComponent(language === "yaml" ? JSON.stringify(JSON.parse(yaml2json(globalDefaults))) : JSON.stringify(JSON.parse(globalDefaults))));
        customLink.push("&nodes=");
        customLink.push(encodeURIComponent(language === "yaml" ? JSON.stringify(JSON.parse(yaml2json(nodesData))) : JSON.stringify(JSON.parse(nodesData))));
        customLink.push("&edges=");
        customLink.push(encodeURIComponent(language === "yaml" ? JSON.stringify(JSON.parse(yaml2json(edgesData))) : JSON.stringify(JSON.parse(edgesData))));

        customLink = customLink.join("");

       // if ((customLink.length < rawLink.length) || rawLink.length === 1) {
            return customLink;
        //}
        //return rawLink;

    }


    function handleCopyPermaLink(e) {
        // https://blog.logrocket.com/implementing-copy-clipboard-react-clipboard-api/
        e.preventDefault();

        copyTextToClipboard(getPermaLink())
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch(e => {
                console.error("Error while copying to clipboard:", e)
            })

    }

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    return <>
        <Button variant={"secondary"} onClick={handleCopyPermaLink}>{isCopied ? "Copied!" : "Copy permalink"}</Button>
    </>
}

export default CopyPermalink
