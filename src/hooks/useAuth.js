import { useState } from 'react';

/**
 * Hook de gestion de l'authentification (simulation via sessionStorage).
 * À remplacer par un vrai contexte + API plus tard.
 *
 * La session est lue dès le premier rendu (et non dans un effet) pour éviter
 * d'afficher brièvement le menu d'un autre rôle.
 */
export function useAuth() {
    const [user, setUser] = useState(readSession);

    const logout = () => {
        try {
            sessionStorage.removeItem('epo_user');
        } catch {
            /* noop */
        }
        setUser(null);
    };

    return { user, logout };
}

function readSession() {
    try {
        const raw = sessionStorage.getItem('epo_user');
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        const roleKey = detectRoleKey(parsed);
        return roleKey ? { ...parsed, roleKey } : null;
    } catch {
        return null;
    }
}

const ROLE_BY_EMAIL = {
    'i.traore@epo.bf': 'scc',
    'f.kabore@epo.bf': 'sp_sg',
    's.ouedraogo@epo.bf': 'sg',
    'r.ouattara@epo.bf': 'sp_dg',
    'a.nikiema@epo.bf': 'dg',
    'b.sawadogo@epo.bf': 'liaison',
};

function detectRoleKey(user) {
    return user.roleKey || ROLE_BY_EMAIL[(user.email || '').toLowerCase()] || null;
}
