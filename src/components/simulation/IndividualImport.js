import Dropdown from "react-bootstrap/Dropdown";
import {useRef, useState} from "react";
import {Button} from "react-bootstrap";

const IndividualImport = ({maxNumber, setData, setLanguage}) => {

    const [number, setNumber] = useState(0);

    const inputFile = useRef(null)

    function handleImport(e) {
        e.preventDefault();
        inputFile.current.click();
    }


    function handleFileChange(e) {
        const fileObject = e.target.files && e.target.files[0];
        if (!fileObject) {
            return;
        }

        const reader = new FileReader();
        reader.readAsText(fileObject);

        reader.onload = () => {
            let fileAsJson;
            try {
                fileAsJson = JSON.parse(reader.result);
            } catch (e) {
                alert("Error when loading in JSON file. Could not parse as JSON.")
                console.warn(e);
                return;
            }

            setData(
                number, // Only set content of specific editor
                fileAsJson["globalDefaults"],
                fileAsJson["nodes"],
                fileAsJson["edges"]);

            setLanguage("json");
        }

        reader.onerror = () => {

            alert("Could not open file.");
            console.warn("Error while reading the imported file.");
        }

        // Reset file input
        e.target.value = null;

    }


    return <>

        <div style={{display: "flex"}}>

            <Button onClick={handleImport}>Import individual</Button>
            <input type='file' id='file' ref={inputFile} onChange={handleFileChange} style={{display: 'none'}}/>

            <Dropdown onSelect={e => setNumber(parseInt(e))}>
                <Dropdown.Toggle id="dropdown-basic">
                    {number}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        [...Array(maxNumber).keys()].map(n => (
                            <Dropdown.Item eventKey={n} onClick={() => setNumber(n)}>{n}</Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>

        </div>

    </>

}

export default IndividualImport;
