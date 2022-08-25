import {Form, FormControl} from "react-bootstrap";
import {useState} from "react";
import {json2yaml} from "../../../lib/jsonYamlConversionUtil";

const ImportLink = ({language, setData, setNodes, setEdges}) => {

    const [permalink, setPermalink] = useState("");

    function importPermalink(e) {
        e.preventDefault();

        if (permalink.indexOf(window.location.origin) === 0) {

            if (permalink.indexOf("customdata?") !== -1 &&
                permalink.indexOf("globaldefaults") !== -1 &&
                permalink.indexOf("nodes") !== -1 &&
                permalink.indexOf("edges") !== -1) {

                alert("goeie link")

                const urlSearchParams = new URLSearchParams(permalink.slice(permalink.lastIndexOf("?")));
                const params = Object.fromEntries(urlSearchParams.entries());

                let gd = language === "yaml" ? json2yaml(JSON.parse(params["globaldefaults"])) : JSON.stringify(JSON.parse(params["globaldefaults"]), null, 4);
                let nd = language === "yaml" ? json2yaml(JSON.parse(params["nodes"])) : JSON.stringify(JSON.parse(params["nodes"]), null, 4);
                let ed = language === "yaml" ? json2yaml(JSON.parse(params["edges"])) : JSON.stringify(JSON.parse(params["edges"]), null, 4);

                setData(gd, nd, ed);
            } else if (permalink.indexOf("rawdata") !== -1 &&
                permalink.indexOf("nodes") !== -1 &&
                permalink.indexOf("edges") !== -1) {

                const urlSearchParams = new URLSearchParams(permalink.slice(permalink.lastIndexOf("?")));
                const params = Object.fromEntries(urlSearchParams.entries());

                let nd = JSON.parse(params["nodes"]);
                let ed = JSON.parse(params["edges"]);

                // Note that it won't be filled in the editors
                // (because it is raw data, it will not be the same as the JSON described in the DOCS. This would confuse the user)

                setNodes(nd);
                setEdges(ed);

            }

        }
    }

    return <>
        <Form onSubmit={importPermalink}>
            <FormControl type="text" placeholder="Enter permalink" onChange={e => setPermalink(e.target.value)}
                         style={{width: "20%", marginRight: "2%"}}></FormControl>
        </Form>

    </>
}

export default ImportLink;
