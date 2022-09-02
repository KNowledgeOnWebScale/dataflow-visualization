import {useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {setFlowData} from "../lib/setFlowData";
import {addEdge, useEdgesState, useNodesState} from "react-flow-renderer";
import BaseAppUrlFLowComponent from "./BaseAppUrlFLowComponent";

// e.g. this file: https://gist.githubusercontent.com/TiboStr/05db9a41779f71267a7315836d1e59ee/raw/7aeb5a3f20de368ebd848728092f93844ca5e2e8/flow-config.json
// -->
// https://knowledgeonwebscale.github.io/dataflow-visualization/#/online?location=https%3A%2F%2Fgist.githubusercontent.com%2FTiboStr%2F05db9a41779f71267a7315836d1e59ee%2Fraw%2F7aeb5a3f20de368ebd848728092f93844ca5e2e8%2Fflow-config.json

const BaseAppFromOnlineLocation = () => {

    const [searchParams] = useSearchParams();

    const [isError, setError] = useState(false);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


    useEffect(() => {
        const location = searchParams.get("location");

        if (!location) return;

        fetch(location)
            .then(res => res.json())
            .then(res => {

                let gd = res["globalDefaults"];
                let nd = res["nodes"];
                let ed = res["edges"];

                if (gd && nd && ed) {
                    setFlowData(gd, nd, ed, setNodes, setEdges);
                } else {
                    setError(true);
                }

            })
            .catch(_ => setError(true));

    }, [searchParams, setEdges, setNodes])


    return <>
        <BaseAppUrlFLowComponent isError={isError} nodes={nodes} edges={edges} onNodesChange={onNodesChange}
                                 onEdgesChange={onEdgesChange} onConnect={onConnect}/>
    </>
}

export default BaseAppFromOnlineLocation;
