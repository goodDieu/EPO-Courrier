import { Outlet, useNavigate } from 'react-router-dom';
import Topbar from './Topbar.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import ModeInterimBanner from './ModeInterimBanner.jsx';

const ROLE_LABELS = {
    sg: 'Secrétaire Général',
    dg: 'Directeur Général',
    scc: 'Chef SCC',
    liaison: 'Agent de liaison',
    admin: 'Administrateur',
};

/**
 * Layout principal utilisé pour toutes les pages authentifiées.
 * Contient : topbar (fixe en haut), sidebar (fixe à gauche), main content (défilant), footer.
 *
 * Utilisation (dans App.jsx) :
 *   <Route element={<MainLayout />}>
 *     <Route path="/sg/dashboard" element={<DashboardSG />} />
 *     ...
 *   </Route>
 */
export default function MainLayout() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // Rôle courant (par défaut 'sg' si pas d'utilisateur)
    const role = user?.roleKey || 'sg';
    const roleLabel = ROLE_LABELS[role] || 'Utilisateur';
    const roleShort = role.toUpperCase().slice(0, 2);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Notifications fictives pour l'instant
    const notifications = [
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

    return (
        <div className="flex flex-col min-h-screen bg-epo-slate-50">
            <Topbar
                roleLabel={roleLabel}
                roleShort={roleShort}
                systemStatus="operational"
                notifications={notifications}
                onSearch={(v) => console.log('Recherche :', v)}
                onLogout={handleLogout}
            />
            {/* <ModeInterimBanner role={role} /> */}
            <div className="flex flex-1">
                <Sidebar role={role} />

                <main className="flex-1 min-w-0">
                    <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-7">
                        <Outlet />
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}