import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


const Header = () => {

    let navigate = useNavigate();

    return <>
        <div style={{display: "flex", flexDirection: "column", float: "right", marginRight: "5px"}}>
            <a href={"https://github.com/KNowledgeOnWebScale/dataflow-visualization#readme"} target="_blank"
               rel="noreferrer"
            >
                Read the docs
            </a>
            <br/>
            <Button variant={"warning"} onClick={e => {
                e.preventDefault();
                navigate("/create-simulation")
            }}>Create simulation</Button>

        </div>
    </>
}

export default Header;
