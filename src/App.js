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
                    <Route path="/dataflow-visualization" exact element={<BaseApp/>}/>
                    <Route path="/dataflow-visualization/data" exact element={<BaseFromUrl/>}/>
                    {/*<Route path="*" element={<NotFound/>}/>*/}
                </Routes>
            </BrowserRouter>


        </>
    );
}


export default EdgesFlow;
