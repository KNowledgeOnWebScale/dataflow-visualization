import Editor from "@monaco-editor/react";
import {edgeSchema} from "./schemaValidation";
import {useState} from "react";

const EdgeEditor = ({language, edgesData, setEdgesData}) => {

    const [myEditor, setMyEditor] = useState(null);
    const [myMonaco, setMyMonaco] = useState(null);
    const [myModel, setMyModel] = useState(null)
    const [myModelUri, setMyModelUri] = useState(null)


    function editorDidMountEdges(editor, monaco) {
        setMyEditor(editor);
        setMyMonaco(monaco);
        // https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-configure-json-defaults

        //console.log(monaco)

        //monacoRefGlobalDefault.current = editor;

        const modelUri = monaco.Uri.parse('edges-editor-model.json'); // a made up unique URI for our model
        const model = monaco.editor.createModel(edgesData, 'json', modelUri);

        setMyModel(model);
        setMyModelUri(modelUri)


        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
                {
                  //  uri: "http://nodes-schema.json",
                    fileMatch: [modelUri.toString()],
                    schema: edgeSchema
                }
            ]
        })

        editor.setModel(model);


       // editor.setModel(edgesModelUri);
    }

    function initAgain() {
        myMonaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
                {
                    //  uri: "http://nodes-schema.json",
                    fileMatch: [myModelUri.toString()],
                    schema: edgeSchema
                }
            ]
        })

        myEditor.setModel(myModel);
    }


    return <>
        <div onClick={initAgain} style={{height: "100%"}}>
            <Editor
                onMount={editorDidMountEdges}
                language={language}
                value={edgesData}
                onChange={content => setEdgesData(content)}
                theme="vs-dark"
                style={{
                    width: "100%",
                }}
            />
        </div>
    </>
}

export default EdgeEditor;
