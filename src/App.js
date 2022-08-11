import React from 'react';
import {HashRouter, Route, Routes} from "react-router-dom";
import BaseApp from "./BaseApp";
import BaseFromUrl from "./BaseAppFromUrl";
import NotFound from "./components/NotFound";


const EdgesFlow = () => {

    return (
        <>
            <HashRouter /*basename={process.env.PUBLIC_URL + "/"}*/>
                <Routes>
                    <Route path="rawdata" element={<BaseFromUrl raw={true}/>}/>
                    <Route exact path="customdata" element={<BaseFromUrl raw={false}/>}/>
                    <Route exact path="/" element={<BaseApp/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </HashRouter>

        </>
    );
}


export default EdgesFlow;
