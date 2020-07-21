import React from 'react';
import './App.css';
import {AppContextProvider} from "./contexts/main";
import ApplicationRoutes from "./config/ApplicationRoutes";

const App = () => {
    return <>
        <AppContextProvider>
            <ApplicationRoutes/>
        </AppContextProvider>
    </>;
}

export default App;
