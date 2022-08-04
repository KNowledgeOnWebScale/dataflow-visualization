import Editor from "@monaco-editor/react";
import {globalDefaultSchema} from "./schemaValidation";
import {useState} from "react";


/*export let nodesModelUri;
export let nodesModel;

export let edgesModelUri;
export let edgesModel;*/


const GlobalDefaultsEditor = ({language, globalDefaults, setGlobalDefaults}) => {


    const [myEditor, setMyEditor] = useState(null);
    const [myMonaco, setMyMonaco] = useState(null);
    const [myModel, setMyModel] = useState(null)
    const [myModelUri, setMyModelUri] = useState(null)


    function handleEditorDidMountGlobalDefault(editor, monaco) {
        // https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-configure-json-defaults

        //console.log(monaco)

        //monacoRefGlobalDefault.current = editor;

        const modelUri = monaco.Uri.parse('global-default-editor-model.json'); // a made up unique URI for our model
        const model = monaco.editor.createModel(globalDefaults, 'json', modelUri);


        setMyEditor(editor);
        setMyMonaco(monaco);
        setMyModel(model);
        setMyModelUri(modelUri)


        /*nodesModelUri = monaco.Uri.parse('nodes-editor-model.json'); // a made up unique URI for our model
        nodesModel = monaco.editor.createModel("blabla", 'json', nodesModelUri);

        edgesModelUri = monaco.Uri.parse('edges-editor-model.json'); // a made up unique URI for our model
        edgesModel = monaco.editor.createModel("edgesblabla", 'json', edgesModelUri);*/

        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
                {
                    //uri: "http://global-default-schema.json",
                    fileMatch: [modelUri.toString()],
                    schema: globalDefaultSchema
                },
                /*{
                    fileMatch: [nodesModelUri.toString()],
                    schema: nodeSchema
                },
                {
                    fileMatch: [edgesModelUri.toString()],
                    schema: edgeSchema
                }*/
            ]
        })

        // monacoRefGlobalDefault.current.setModel(model)

        editor.setModel(model);
    }

    function initAgain() {
        myMonaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
                {
                    //  uri: "http://nodes-schema.json",
                    fileMatch: [myModelUri.toString()],
                    schema: globalDefaultSchema
                }
            ]
        })

        myEditor.setModel(myModel);
    }


    return <>
        <div onClick={initAgain} style={{height: "100%"}}>
            <Editor
                onMount={handleEditorDidMountGlobalDefault}
                language={language}
                value={globalDefaults}
                onChange={content => setGlobalDefaults(content)}
                theme="vs-dark"
                style={{
                    width: "100%",
                }}
            />
        </div>
    </>
}

export default GlobalDefaultsEditor;