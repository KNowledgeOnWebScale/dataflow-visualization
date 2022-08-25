import React from 'react';
import {HashRouter, Route, Routes} from "react-router-dom";
import BaseApp from "./BaseApp/BaseApp";
import BaseFromUrl from "./BaseApp/BaseAppFromUrl";
import NotFound from "./components/NotFound";
import BaseAppFromOnlineLocation from "./BaseApp/BaseAppFromOnlineLocation";


const EdgesFlow = () => {

    return (
        <>
            <HashRouter /*basename={process.env.PUBLIC_URL + "/"}*/>
                <Routes>
                    <Route path="rawdata" element={<BaseFromUrl raw={true} /*TODO die raw is bad practice, gwn een aparte component is beter wrs*/ />}/>
                    <Route exact path="customdata" element={<BaseFromUrl raw={false}/>}/>
                    <Route exact path="online" element={<BaseAppFromOnlineLocation/>}/>
                    <Route exact path="/" element={<BaseApp/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </HashRouter>

        </>
    );
}


export default EdgesFlow;
