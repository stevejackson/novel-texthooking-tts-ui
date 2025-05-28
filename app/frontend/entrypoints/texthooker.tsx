import React from 'react';
import ReactDOM from 'react-dom/client';

import TexthookerApp from "~/components/TexthookerApp.tsx";

const RootComponent = () => (
        <TexthookerApp />
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);