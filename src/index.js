import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import "./CSS/dark.css";

import App from "./App";
import {AuthContextProvider} from "./Auth/authContext";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <AuthContextProvider>
            <App/>
        </AuthContextProvider>
    </BrowserRouter>
);
