import {Button} from "react-bootstrap";
import {useRef} from "react";

const ImportSimulationConfig = ({setData, setLanguage}) => {

    const inputFile = useRef(null)


    // Fill in in all the editors
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

            setData(fileAsJson["globalDefaultsConfigs"], fileAsJson["nodesConfigs"], fileAsJson["edgesConfigs"]);

            /*
            can't do that because setState is asynchronous

             for (let i = 0; i < fileAsJson["globalDefaultsConfigs"].length; i++) {
                // alert(JSON.stringify(fileAsJson["globalDefaultsConfigs"][i]))
                 setData(
                     i,
                     JSON.stringify(fileAsJson["globalDefaultsConfigs"][i], null, 4),
                     JSON.stringify(fileAsJson["nodesConfigs"][i], null, 4),
                     JSON.stringify(fileAsJson["edgesConfigs"][i], null, 4)
                 )
             }*/

            //TODO: gwn naar yaml omzetten
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
        <Button variant={"success"} onClick={handleImport}>Import</Button>
        <input type='file' id='file' ref={inputFile} onChange={handleFileChange} style={{display: 'none'}}/>
    </>

}

export default ImportSimulationConfig;
