import {useEffect} from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import {useLocation} from "react-router-dom";

const SimulationView = (/*{
                            globalDefaultsList,
                            nodesDataList,
                            edgesDataList
                        }*/) => {

    //   const [nodes, setNodes, onNodesChange] = useNodesState([]);
    //   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    //   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


    const location = useLocation();


    // TODO setFlowData.js gebruiken

    useEffect(() => {
        //asserten dat de lijsten even lang zijn
        // TODO: kijken als de schema's juist zijn
    })

    //console.log(location.state.globalDefaultsList)
    //console.log(location.state.globalDefaultsList.length)

    return <>

        <p> In development </p>

        {(!location || !location.state || !location.state.globalDefaultsList.length) && <p>Invalid props</p>}


        {location && location.state && location.state.globalDefaultsList.length &&
            <ButtonGroup size="lg" className="mb-2">
                {
                    [...Array(location.state.globalDefaultsList.length)].map(s => {
                            return <Button>{"Step " + s}</Button>
                        }
                    )
                }
            </ButtonGroup>
        }


    </>


}

export default SimulationView;
