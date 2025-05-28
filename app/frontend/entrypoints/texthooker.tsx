import React from 'react';
import ReactDOM from 'react-dom/client';
import TexthookerApp from "../components/TexthookerApp";

const RootComponent = () => (
        <TexthookerApp />
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);