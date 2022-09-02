export const title = "autoLayout group example"

export const globalDefaultsJSON = {
    graph: {
        autoLayout: true,
        orientation: "horizontal",
    },
    node: {
        presets: {
            "group1-preset": {
                shape: "cylinder",
                stroke: "royalblue",
                vgroup: "vgroup1"
            },
            "group2-preset": {
                shape: "diamond",
                stroke: "indianred",
                vgroup: "vgroup2"
            },
            "group3-preset": {
                shape: "8-star",
                stroke: "darkolivegreen",
                hgroup: "hgroup1"
            },
            "connection": {
                shape: "circle"
            }
        }
    },
    edge: {
        presets: {
            "group1-preset": {
                color: "royalblue"
            },
            "group2-preset": {
                color: "indianred"
            },
            "group3-preset": {
                color: "darkolivegreen"
            }
        }
    }
};

export const nodesJSON = [
    {id: "node-group1-1", preset: ["group1-preset"], label: "1-1"},
    {id: "node-group1-2", preset: ["group1-preset"], label: "1-2"},
    {id: "node-group1-3", preset: ["group1-preset"], label: "1-3"},
    {id: "node-group1-4", preset: ["group1-preset"], label: "1-4"},
    {id: "node-group1-5", preset: ["group1-preset"], label: "1-5"},

    {id: "middle1", preset: ["connection"], label: "mid1"},

    {id: "node-group2-1", preset: ["group2-preset"], label: "2-1"},
    {id: "node-group2-2", preset: ["group2-preset"], label: "2-2"},
    {id: "node-group2-3", preset: ["group2-preset"], label: "2-3"},

    {id: "middle2", preset: ["connection"], label: "mid2"},

    {id: "node-group3-1", preset: ["group3-preset"], label: "3-1"},
    {id: "node-group3-2", preset: ["group3-preset"], label: "3-2"},
    {id: "node-group3-3", preset: ["group3-preset"], label: "3-3"},
    {id: "node-group3-4", preset: ["group3-preset"], label: "3-4"},
    {id: "node-group3-5", preset: ["group3-preset"], label: "3-5"},

];


export const edgesJSON = [
    {source: "node-group1-1", target: "node-group1-2", preset: ["group1-preset"]},
    {source: "node-group1-2", target: "node-group1-3", preset: ["group1-preset"]},
    {source: "node-group1-3", target: "node-group1-4", preset: ["group1-preset"]},
    {source: "node-group1-4", target: "node-group1-5", preset: ["group1-preset"]},

    {source: "node-group1-2", target: "middle1"},
    {source: "middle1", target: "node-group2-2"},

    {source: "node-group2-1", target: "node-group2-2", preset: ["group2-preset"]},
    {source: "node-group2-2", target: "node-group2-3", preset: ["group2-preset"]},

    {source: "node-group2-2", target: "middle2"},
    {source: "middle2", target: "node-group3-1"},

    {source: "node-group3-1", target: "node-group3-2", preset: ["group3-preset"]},
    {source: "node-group3-2", target: "node-group3-3", preset: ["group3-preset"]},
    {source: "node-group3-3", target: "node-group3-4", preset: ["group3-preset"]},
    {source: "node-group3-4", target: "node-group3-5", preset: ["group3-preset"]}

];
