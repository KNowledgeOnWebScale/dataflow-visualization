import {MarkerType} from "react-flow-renderer";


export const globalDefaults = {
    //fontsize: 12,
   // width: 50,
    height: 50,
    //edgeThickness: 1,
    fill: "white",
    stroke: "black",
    strokeWidth: 1,
    orientation: "vertical"
};

export const nodesData = [
    {
        id: 'comunica',
       // type: 'custom',
        shape:"comunica",
        position: { x: 80, y: 90 },
    },
    {
        // PARENTNODE
        id: 'solid',
       // type:"custom",
        title: 'Solid Pod',
        shape:"rectangle",
        strokeWidth: 5,
        stroke:"#8370fb",
        fill:"#12121212",
        width:300,
        height: 100,
        position: { x: 0, y: 200 },
       // style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 300, height: 300 },
    },
    {
       // id: "solidLogo",
      //  type: "custom",
        image: "solid",
        stroke: "#fff",
        position: {x:-50, y:225}
    },
    {
        id: 'RDF-1',
         label: 'RDF',
        //type: "custom",
        position: { x: 25, y: 25 },
        parentNode: 'solid',
        //extent: 'parent',
    },
    {
        id: 'RDF-2',
         label: 'RDF',
       // type: "custom",
        position: { x: 80, y: 25 },
        parentNode: 'solid',
        //extent: 'parent',
    },
    {
        id: 'RDF-3',
        label: 'RDF',
        //type: "custom",
        position: { x: 145, y: 25 },
        parentNode: 'solid',
        //extent: 'parent',
    },

    {
        id: 'RDF-4',
        label: 'RDF',
      //  type: "custom",
        position: { x: 230, y: 25 },
        parentNode: 'solid',
       // extent: 'parent',
    },
    {
        id:"rmlio",
       // type:"custom",
        stroke: "#fff",
        image: "rmlio",
        position: {x: 80, y: 350}
    },
    {
        id:"flickr",
       // type:"custom",
        stroke: "#fff",
        image: "https://cdn.worldvectorlogo.com/logos/flickr-1.svg",
        position: {x: 20, y: 450}
    },
    {
        id:"imgur",
       // type:"custom",
        stroke: "#fff",
        image:"https://cdn.worldvectorlogo.com/logos/imgur-logo.svg",
        position: {x: 80, y: 450}
    },
    {
        id:"google",
       // type:"custom",
        stroke: "#fff",
        image: "https://cdn.cdnlogo.com/logos/g/82/google-g-2015.svg",
        position: {x: 140, y: 450}
    }

];

export const edgesData = [
    { source: 'comunica', target: 'RDF-1', animated: true, type: "straight", zIndex:1 },
    { source: 'comunica', target: 'RDF-2', animated:true, type: "straight", zIndex:1 },
    { source: 'comunica', target: 'RDF-3', animated:true, type: "straight", zIndex:1 },
    { source: 'comunica', target: 'RDF-4', animated:true, type: "step", sourceHandle:"right-source", markerEnd: {type: "arrowclosed"}, zIndex:1 },

    { source: 'RDF-1', target: 'rmlio', animated: true, type: "straight", zIndex:1 },
    { source: 'RDF-2', target: 'rmlio', animated:true, type: "straight", zIndex:1 },
    { source: 'RDF-3', target: 'rmlio', animated:true, type: "straight", zIndex:1 },

    { source: 'flickr', target: 'rmlio', animated: false, type: "straight", style:{strokeDasharray: "5 3",  strokeWidth: 20/*, stroke: "red"*/}, edgeColor:"green" },
    { source: 'imgur', target: 'rmlio', animated:false, type: "straight", style:{strokeDasharray: "5 3" }},
    { source: 'google', target: 'rmlio', animated:false, type: "straight", style:{strokeDasharray: "5 3" }},


];