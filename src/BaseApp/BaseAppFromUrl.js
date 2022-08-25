import {useSearchParams} from "react-router-dom";
import {addEdge, useEdgesState, useNodesState} from "react-flow-renderer";
import {useCallback, useEffect, useState} from "react";
import {setFlowData} from "../lib/setFlowData";
import BaseAppUrlFLowComponent from "./BaseAppUrlFLowComponent";


const Base = ({raw}) => {

    const [searchParams] = useSearchParams();

    const [isError, setError] = useState(false);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


    useEffect(() => {
        let globalDefaults2json;
        let nodes2json;
        let edges2json;

        if (raw) {
            try {
                nodes2json = JSON.parse(searchParams.get("nodes"));
                edges2json = JSON.parse(searchParams.get("edges"));
            } catch (e) {
                console.warn(e);
                setError(true);
                return;
            }

            setNodes(nodes2json);
            setEdges(edges2json);
        } else {
            globalDefaults2json = JSON.parse(searchParams.get("globaldefaults"));
            nodes2json = JSON.parse(searchParams.get("nodes"));
            edges2json = JSON.parse(searchParams.get("edges"));

            setFlowData(globalDefaults2json, nodes2json, edges2json, setNodes, setEdges);
        }


    }, [raw, searchParams, setEdges, setNodes])


    return <>
        <BaseAppUrlFLowComponent isError={isError} nodes={nodes} edges={edges} onNodesChange={onNodesChange}
                                 onEdgesChange={onEdgesChange} onConnect={onConnect}/>
    </>

}

export default Base;
