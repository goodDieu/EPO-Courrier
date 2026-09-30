import { useRef } from 'react';
import LoginVisual from '../components/auth/LoginVisual.jsx';
import LoginForm from '../components/auth/LoginForm.jsx';
import DemoAccountsPanel from '../components/auth/DemoAccountsPanel.jsx';

export default function LoginPage() {
    // Référence pour passer le compte de démo au formulaire
    // (on utilisera un state partagé ou un contexte plus tard)
    const formApiRef = useRef(null);

    const handleSelectDemo = (account) => {
        // Remplit le formulaire via un événement custom
        // Pour le premier jet, on utilise un CustomEvent
        window.dispatchEvent(
            new CustomEvent('epo:demo-select', {
                detail: account,
            })
        );
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                <LoginVisual />
                <LoginForm apiRef={formApiRef} />
            </div>
            <DemoAccountsPanel onSelect={handleSelectDemo} />
        </>
    );
}