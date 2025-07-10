import React from 'react';
import ReactDOM from 'react-dom/client';
import NavigationBar from "../components/NavigationBar";

const RootComponent = () => (
    <React.StrictMode>
        <NavigationBar />
    </React.StrictMode>
)

const root = ReactDOM.createRoot(document.getElementById('navigation-bar-root'));
root.render(<RootComponent />);