import React from 'react';
import ReactDOM from 'react-dom/client';
import NovelApp from "../components/NovelApp";

const RootComponent = () => (
    <React.StrictMode>
        <NovelApp />
    </React.StrictMode>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);