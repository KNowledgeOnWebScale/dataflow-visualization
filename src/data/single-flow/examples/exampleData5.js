export const globalDefaultsJSON = {
    graph: {
        orientation: "vertical",
    },
    node: {},
    edge: {
        strokeDasharray: "6 5",
        animation: "default",
        type: "straight"
    }

};

export const nodesJSON = [
    {
        shape: "comunica",
        position: {x: 20, y: 90},
    },
    {
        // PARENTNODE
        id: 'solid',
        title: 'Solid Pod',
        shape: "rectangle",
        strokeWidth: 5,
        stroke: "#8370fb",
        fill: "#12121212",
        width: 300,
        height: 100,
        position: {x: 0, y: 200},
    },
    {
        image: "solid",
        topText: "Solid",
        stroke: "#fff",
        position: {x: -50, y: 225}
    },
    {
        id: 'RDF-1',
        label: 'RDF',
        hgroup: "hgroup1",
        position: {x: 20, y: 25},
        parentNode: 'solid',
    },
    {
        id: 'RDF-2',
        label: 'RDF',
        hgroup: "hgroup1",
        parentNode: 'solid',
    },
    {
        id: 'RDF-3',
        label: 'RDF',
        hgroup: "hgroup1",
        parentNode: 'solid',
    },

    {
        id: 'RDF-4',
        label: 'RDF',
        position: {x: 230, y: 25},
        parentNode: 'solid',
    },
    {
        image: "rmlio",
        position: {x: 95, y: 350}
    },
    {
        id: "flickr",
        image: "https://cdn.worldvectorlogo.com/logos/flickr-1.svg",
        position: {x: 20, y: 450}
    },
    {
        id: "imgur",
        image: "https://cdn.worldvectorlogo.com/logos/imgur-logo.svg",
        position: {x: 95, y: 450}
    },
    {
        id: "google",
        image: "https://cdn.cdnlogo.com/logos/g/82/google-g-2015.svg",
        position: {x: 170, y: 450}
    }

];

export const edgesJSON = [
    {source: 'comunica', target: 'RDF-1'},
    {source: 'comunica', target: 'RDF-2'},
    {source: 'comunica', target: 'RDF-3'},
    {source: 'comunica', target: 'RDF-4', type: "step", sourceHandle: "right", markerEnd: {type: "arrowclosed"}},

    {source: 'RDF-1', target: 'rmlio', zIndex: 1},
    {source: 'RDF-2', target: 'rmlio', zIndex: 1},
    {source: 'RDF-3', target: 'rmlio', zIndex: 1},

    {source: 'flickr', target: 'rmlio', animation: "none"},
    {source: 'imgur', target: 'rmlio', animation: "none"},
    {source: 'google', target: 'rmlio', animation: "none"},


];