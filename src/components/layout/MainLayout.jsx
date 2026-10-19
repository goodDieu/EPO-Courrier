import { useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Topbar from './Topbar.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import { useAuth } from '../../hooks/useAuth.js';

const ROLE_LABELS = {
    sg: 'Secrétaire Général',
    dg: 'Directeur Général',
    scc: 'Chef du Service Courrier',
    liaison: 'Agent de liaison',
    sp_sg: 'Secrétaire particulière du SG',
    sp_dg: 'Secrétaire particulière du DG',
};

// Noms des comptes de démonstration (affichage uniquement)
const USER_NAMES = {
    sg: 'OUÉDRAOGO Salif',
    dg: 'NIKIÉMA Adama',
    scc: 'TRAORÉ Ibrahim',
    liaison: 'SAWADOGO Bakary',
    sp_sg: 'KABORÉ Fatimata',
    sp_dg: 'OUATTARA Rasmata',
};

// Notifications fictives pour l'instant
const NOTIFICATIONS = [
    {
        id: 1,
        color: 'red',
        title: 'Dépassement de délai',
        message: 'Courrier N°2026-0452 en attente depuis 72h',
        time: 'Il y a 15 min',
    },
    {
        id: 2,
        color: 'blue',
        title: 'Acte signé par le DG',
        message: 'Décision de congé N°2026-0189 signée',
        time: 'Il y a 45 min',
    },
    {
        id: 3,
        color: 'amber',
        title: 'Échéance J-1',
        message: 'Réponse attendue pour le courrier N°2026-0410',
        time: 'Il y a 2h',
    },
];

/**
 * Layout principal utilisé pour toutes les pages authentifiées.
 * Contient : menu latéral vert (colonne fixe sur grand écran, tiroir sur
 * tablette/mobile) et, à droite, barre du haut, contenu défilant, pied de page.
 */
export default function MainLayout() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const role = user.roleKey || 'sg';
    const currentUser = {
        name: USER_NAMES[role] || user.email,
        role: ROLE_LABELS[role] || 'Utilisateur',
        email: user.email,
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const homePath = `/${role}/dashboard`;

    return (
        <div className="min-h-screen lg:flex bg-ground">
            <Sidebar
                role={role}
                homePath={homePath}
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                onLogout={handleLogout}
            />

            <div className="flex flex-col flex-1 min-w-0 min-h-screen">
                <Topbar
                    user={currentUser}
                    homePath={homePath}
                    notifications={NOTIFICATIONS}
                    onMenuClick={() => setMenuOpen(true)}
                    onLogout={handleLogout}
                />
                <main className="flex-1">
                    <div className="w-full max-w-[1400px] mx-auto px-4 py-6 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}
