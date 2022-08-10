import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BaseApp from "./BaseApp";
import BaseFromUrl from "./BaseAppFromUrl";
import NotFound from "./components/NotFound";


const EdgesFlow = () => {

    return (
        <>

            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<BaseApp/>}/>
                        <Route path="dataflow-visualization">
                            <Route index element={<BaseApp/>}/>
                            <Route path="data" element={<BaseFromUrl/>}/>
                        </Route>
                        <Route path="data" element={<BaseFromUrl/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>


        </>
    );
}


export default EdgesFlow;
