import { useState, useEffect } from 'react';

/**
 * Hook de gestion de l'authentification (simulation via sessionStorage).
 * À remplacer par un vrai contexte + API plus tard.
 */
export function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const raw = sessionStorage.getItem('epo_user');
            if (raw) {
                const parsed = JSON.parse(raw);
                // Déduire roleKey depuis l'email ou le rôle enregistré
                const roleKey = detectRoleKey(parsed);
                setUser({ ...parsed, roleKey });
            }
        } catch (e) {
            /* noop */
        }
    }, []);

    const logout = () => {
        try {
            sessionStorage.removeItem('epo_user');
        } catch (e) {
            /* noop */
        }
        setUser(null);
    };

    return { user, logout };
}

function detectRoleKey(user) {
    if (user.roleKey) return user.roleKey;
    const email = (user.email || '').toLowerCase();
    if (email.includes('kabore')) return 'sg';
    if (email.includes('ouedraogo')) return 'dg';
    if (email.includes('traore')) return 'scc';
    if (email.includes('sawadogo')) return 'liaison';
    if (email.includes('diakite')) return 'admin';
    return 'sg';
}