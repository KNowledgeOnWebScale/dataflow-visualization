import React, {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import {initSchemas} from "./custom/editors/schemaValidation";

import App from "./App";

initSchemas();   // Initialize JSON validation schemas once

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <App/>
    </StrictMode>
);
