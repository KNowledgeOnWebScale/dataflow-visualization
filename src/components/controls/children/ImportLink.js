import {Form, FormControl} from "react-bootstrap";
import {useState} from "react";

const ImportLink = () => {

    const [permalink, setPermalink] = useState("");

    function importPermalink(e) {
        console.log("in importpermalink")
        e.preventDefault();

        alert(permalink)
    }

    return <>
        <Form onSubmit={importPermalink}>
            <FormControl type="text" placeholder="Enter permalink" onChange={e => setPermalink(e.target.value)}
                         style={{width: "20%", marginRight: "2%"}}></FormControl>
        </Form>

    </>
}

export default ImportLink;
