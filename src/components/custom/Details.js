import './Details.css'

export default function Details(props) {
    return (<div style={{ height: props.height, fontSize: props.fontSize, whiteSpace: 'pre', backgroundColor: props.fill || '#FFFD' }}>
        <details style={{backgroundColor: props.fill || '#FFFD'}}>
            <summary>{props.title}</summary>
            {props.label}
        </details>
    </div>);
}