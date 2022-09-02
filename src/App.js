import React from 'react';
import {HashRouter, Route, Routes} from "react-router-dom";
import BaseApp from "./BaseApp/BaseApp";
import BaseFromUrl from "./BaseApp/BaseAppFromUrl";
import NotFound from "./components/NotFound";
import BaseAppFromOnlineLocation from "./BaseApp/BaseAppFromOnlineLocation";
import RecordingTest from "./BaseApp/RecordingTest";
import RecordingTest2 from "./BaseApp/RecordingTest2";
import SimulationMaker from "./components/simulation/SimulationMaker";
import SimulationView from "./components/simulation/SimulationView";


const EdgesFlow = () => {

    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="rawdata" element={<BaseFromUrl raw={true}/>}/>
                    <Route exact path="customdata" element={<BaseFromUrl raw={false}/>}/>
                    <Route exact path="online" element={<BaseAppFromOnlineLocation/>}/>
                    <Route exact path="recording" element={<RecordingTest/>}/>
                    <Route exact path="recording2" element={<RecordingTest2/>}/>
                    <Route exact path="create-simulation" element={<SimulationMaker/>}/>
                    <Route exact path="simulation-view"
                           element={<SimulationView globalDefaultsList={[]} nodesDataList={[]} edgesDataList={[]}/>}/>
                    <Route exact path="/" element={<BaseApp/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </HashRouter>

        </>
    );
}


export default EdgesFlow;
