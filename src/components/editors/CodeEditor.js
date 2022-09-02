import Editor from "@monaco-editor/react";
import {useState} from "react";

const CodeEditor = ({
                        language,
                        data,
                        setData,
                        modelName,
                        schema
                    }) => {

    const [editorInstance, setEditorInstance] = useState(null);
    const [monacoInstance, setMonacoInstance] = useState(null);
    const [modelInstance, setModelInstance] = useState(null)
    const [modelUriInstance, setModelUriInstance] = useState(null)

    function editorDidMountNodes(editor, monaco) {
        // https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-configure-json-defaults

        const modelUri = monaco.Uri.parse(modelName + ".json"); // a made up unique URI for our model
        const model = monaco.editor.createModel(data, 'json', modelUri);

        setEditorInstance(editor);
        setMonacoInstance(monaco);
        setModelInstance(model);
        setModelUriInstance(modelUri)

        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            //validate: true,
            schemas: [
                {
                    // uri: "http://nodes-schema.json",
                    fileMatch: [modelUri.toString()],
                    schema: schema
                }
            ]
        })

        editor.setModel(model);
    }


    // This is a dirty fix
    // This component gets created multiple times and the changes you do on monaco or editor are probably overwritten
    // In this function, I just overwrite it again when you click with you mouse on the editor
    function initAgain() {
        monacoInstance.languages.json.jsonDefaults.setDiagnosticsOptions({
            //validate: true,
            schemas: [
                {
                    // uri: "http://.....-schema.json",
                    fileMatch: [modelUriInstance.toString()],
                    schema: schema
                }
            ]
        })

        editorInstance.setModel(modelInstance);
    }


    return <>
        <div className="editor" onClick={initAgain}>
            <Editor
                onMount={editorDidMountNodes}
                language={language}
                value={data}
                onChange={setData}
                theme="vs-dark"
                style={{
                    width: "100%",
                    height: "100%"
                }}
            />
        </div>
    </>
}

export default CodeEditor;
