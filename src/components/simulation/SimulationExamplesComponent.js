import {examples} from "../../data/simulation-flow/examples";
import {Button} from "react-bootstrap";

const SimulationExamplesComponent = ({setData}) => {

    function loadExample(e, steps) {
        e.preventDefault();

        let globalDefaultConfigs = [];
        let nodesConfigs = [];
        let edgesConfigs = [];

        for (let i = 0; i < Object.keys(steps).length; i++) {
            let key = "step" + i;

            globalDefaultConfigs.push(steps[key][0]);
            nodesConfigs.push(steps[key][1]);
            edgesConfigs.push(steps[key][2]);
        }

        setData(globalDefaultConfigs, nodesConfigs, edgesConfigs);


    }

    return <>
        <div className={"d-flex"}>
            {
                Object.keys(examples).map(k =>
                    <Button onClick={e => loadExample(e, examples[k])} key={k}>
                        {k}
                    </Button>
                )
            }

        </div>
    </>

}

export default SimulationExamplesComponent;
