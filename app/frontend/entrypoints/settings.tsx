import React from 'react';
import ReactDOM from 'react-dom/client';
import SettingsApp from "../components/SettingsApp";

const RootComponent = () => (
    <React.StrictMode>
        <SettingsApp />
    </React.StrictMode>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);