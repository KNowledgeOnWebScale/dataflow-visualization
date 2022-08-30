import {examples} from "../data/single-flow/examples"
import {Button} from "react-bootstrap";
import {json2yaml} from "../lib/jsonYamlConversionUtil";


const ExamplesComponent = ({language, setData}) => {

    function loadExample(e, number) {
        e.preventDefault();

        let example = examples[number - 1];

        let defaults = JSON.stringify(example[0], null, "\t");
        let nodes = JSON.stringify(example[1], null, "\t");
        let edges = JSON.stringify(example[2], null, "\t");

        if (language === "yaml") {
            defaults = json2yaml(defaults);
            nodes = json2yaml(nodes);
            edges = json2yaml(edges);
        }

        setData(defaults, nodes, edges);
    }

    return <>
        <div className="d-flex">
            {
                examples.map((a, i) => (
                        <Button className="primary" onClick={e => loadExample(e, i + 1)}
                                key={i}>
                            {a[3] || "example " + (i + 1)}
                        </Button>
                    )
                )
            }
        </div>
    </>

}

export default ExamplesComponent;
