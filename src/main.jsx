import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
// Polices et icônes embarquées (la démo doit fonctionner hors ligne)
import '@fontsource-variable/atkinson-hyperlegible-next/wght.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);