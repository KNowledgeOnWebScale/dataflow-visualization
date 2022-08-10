import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BaseApp from "./BaseApp";
import BaseFromUrl from "./BaseAppFromUrl";


const EdgesFlow = () => {
return (
    <>

        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<BaseApp/>}/>
                    <Route path="dataflow-visualization" element={<BaseApp/>}/>
                    <Route path="data" element={<BaseFromUrl/>}/>
                </Route>
            </Routes>
        </BrowserRouter>



    </>
);
}
;

export default EdgesFlow;
