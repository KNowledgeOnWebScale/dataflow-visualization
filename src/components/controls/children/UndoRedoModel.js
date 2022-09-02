class UndoRedoModel {

    constructor() {
        this.globalDefaultsConfigs = [];
        this.nodesConfigs = [];
        this.edgesConfigs = [];
        this.currentConfigIndex = -1;
    }

    // All data saved in this model is in json
    addConfigs(globalDefaultConfig, nodesConfig, edgesConfig, language = "json") {
        this.globalDefaultsConfigs.push(globalDefaultConfig);
        this.nodesConfigs.push(nodesConfig);
        this.edgesConfigs.push(edgesConfig);

        this.currentConfigIndex = this.globalDefaultsConfigs.length - 1;
    }

    getData() {
        const globalDefaults = this.globalDefaultsConfigs[this.currentConfigIndex];
        const nodes = this.nodesConfigs[this.currentConfigIndex];
        const edges = this.edgesConfigs[this.currentConfigIndex];

        return [globalDefaults, nodes, edges];
    }

    undoAction() {
        if (this.currentConfigIndex > 0) {
            this.currentConfigIndex--;
        }
        return this.getData();
    }

    redoAction() {
        if (this.currentConfigIndex < this.globalDefaultsConfigs.length - 1) {
            this.currentConfigIndex++;
        }

        return this.getData();
    }

    undoDisabled() {
        return this.currentConfigIndex === 0;
    }

    redoDisabled() {
        return this.currentConfigIndex === this.globalDefaultsConfigs.length;
    }


}

export default UndoRedoModel;

