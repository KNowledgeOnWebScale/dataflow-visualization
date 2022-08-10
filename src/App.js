import React from 'react';
import {HashRouter, Route, Routes} from "react-router-dom";
import BaseApp from "./BaseApp";
import BaseFromUrl from "./BaseAppFromUrl";
import NotFound from "./components/NotFound";


const EdgesFlow = () => {

    console.log(process.env.PUBLIC_URL)
    return (
        <>
            <HashRouter /*basename={process.env.PUBLIC_URL + "/"}*/>
                <Routes>
                    <Route path="data" element={<BaseFromUrl/>}/>
                    <Route exact path="/" element={<BaseApp/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </HashRouter>

        </>
    );
}


export default EdgesFlow;
