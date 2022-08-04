import Editor from "@monaco-editor/react";
import {nodeSchema} from "./schemaValidation";
import {useState} from "react";

const NodeEditor = ({language, nodesData, setNodesData}) => {


    const [myEditor, setMyEditor] = useState(null);
    const [myMonaco, setMyMonaco] = useState(null);
    const [myModel, setMyModel] = useState(null)
    const [myModelUri, setMyModelUri] = useState(null)

    function editorDidMountNodes(editor, monaco) {
        // https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-configure-json-defaults

        //console.log(monaco)

        //monacoRefGlobalDefault.current = editor;

        const modelUri = monaco.Uri.parse('nodes-editor-model.json'); // a made up unique URI for our model
        const model = monaco.editor.createModel(nodesData, 'json', modelUri);


        setMyEditor(editor);
        setMyMonaco(monaco);
        setMyModel(model);
        setMyModelUri(modelUri)


        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
                {
                    // uri: "http://nodes-schema.json",
                    fileMatch: [modelUri.toString()],
                    schema: nodeSchema
                }
            ]
        })

        editor.setModel(model);

        //editor.setModel(nodesModelUri)
    }

    function initAgain() {
        myMonaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
                {
                    // uri: "http://nodes-schema.json",
                    fileMatch: [myModelUri.toString()],
                    schema: nodeSchema
                }
            ]
        })

        myEditor.setModel(myModel);
    }


    return <>
        <div onClick={initAgain} style={{height: "100%"}}>
            <Editor
                onMount={editorDidMountNodes}
                language={language}
                value={nodesData}
                onChange={content => setNodesData(content)}
                theme="vs-dark"
                style={{
                    width: "100%",
                }}
            />
        </div>
    </>
}

export default NodeEditor;