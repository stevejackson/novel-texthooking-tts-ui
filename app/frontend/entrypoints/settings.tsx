import React from 'react';
import ReactDOM from 'react-dom/client';
import SettingsApp from "../components/SettingsApp";

const RootComponent = () => (
    <React.StrictMode>
        <SettingsApp />
    </React.StrictMode>
)

const settingsDomNode = document.getElementById('settings-root');
const settingsRoot = ReactDOM.createRoot(settingsDomNode);
settingsRoot.render(<RootComponent />);