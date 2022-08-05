import React from 'react';
import Header from "./custom/Header";
import Footer from "./custom/Footer";
import Visualizer from "./custom/Visualizer";


//TODO: before parsing, check if all necessary keys are present, if not, do user friendly error handling


const EdgesFlow = () => {


    return (
        <>

            <Header/>
            <Visualizer/>
            <Footer/>

        </>
    );
};

export default EdgesFlow;
