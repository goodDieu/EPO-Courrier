import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    LABEL_CLASS,
    INPUT_CLASS,
    PRIMARY_BUTTON_CLASS,
    LINK_CLASS,
} from './authStyles.js';
import DemoProfilePicker from './DemoProfilePicker.jsx';

// Comptes de démonstration (mot de passe commun : Demo2026#)
const USERS = [
    { email: 'i.traore@epo.bf', roleKey: 'scc', path: '/scc/dashboard' },
    { email: 'f.kabore@epo.bf', roleKey: 'sp_sg', path: '/sp_sg/dashboard' },
    { email: 's.ouedraogo@epo.bf', roleKey: 'sg', path: '/sg/dashboard' },
    { email: 'r.ouattara@epo.bf', roleKey: 'sp_dg', path: '/sp_dg/dashboard' },
    { email: 'a.nikiema@epo.bf', roleKey: 'dg', path: '/dg/dashboard' },
    { email: 'b.sawadogo@epo.bf', roleKey: 'liaison', path: '/liaison/dashboard' },
].map((u) => ({ ...u, password: 'Demo2026#' }));

export default function LoginForm() {
    // Pré-remplit l'adresse de la dernière session, s'il y en a une
    const [email, setEmail] = useState(() => {
        try {
            return JSON.parse(sessionStorage.getItem('epo_user') || '{}').email || '';
        } catch {
            return '';
        }
    });
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);
    const submitRef = useRef(null);

    const showError = (msg) => {
        setError(msg);
        setShake(true);
        setTimeout(() => setShake(false), 450);
    };

    const hideError = () => {
        if (error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        hideError();

        const trimmedEmail = email.trim();

        if (!trimmedEmail || !password) {
            showError('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            showError('Veuillez saisir une adresse e-mail valide.');
            return;
        }

        if (!trimmedEmail.endsWith('@epo.bf')) {
            showError('Seules les adresses @epo.bf sont autorisées.');
            return;
        }

        // Simulation de la connexion
        setLoading(true);

        setTimeout(() => {
            const user = USERS.find(
                (u) =>
                    u.email.toLowerCase() === trimmedEmail.toLowerCase() &&
                    u.password === password
            );

            if (!user) {
                setLoading(false);
                showError('Identifiants incorrects. Vérifiez votre e-mail et votre mot de passe.');
                return;
            }

            // Stocker la session (à remplacer par un appel API réel plus tard)
            try {
                sessionStorage.setItem(
                    'epo_user',
                    JSON.stringify({
                        email: user.email,
                        roleKey: user.roleKey,
                        loginTime: new Date().toISOString(),
                    })
                );
            } catch {
                /* noop */
            }

            setTimeout(() => {
                window.location.href = user.path;
            }, 400);
        }, 900);
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold tracking-tight text-epo-slate-900 sm:text-3xl">
                Connexion
            </h1>

            {error && (
                <div
                    role="alert"
                    className="flex items-start gap-2.5 px-3.5 py-3 mt-6 text-sm border rounded-lg bg-epo-slate-50 border-epo-slate-200 text-epo-slate-900"
                >
                    <i className="fas fa-circle-exclamation mt-0.5" aria-hidden="true" />
                    <span>{error}</span>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                noValidate
                className={`mt-8 flex flex-col gap-5 ${shake ? 'animate-shake' : ''}`}
            >
                <div>
                    <label htmlFor="email" className={LABEL_CLASS}>
                        Adresse e-mail professionnelle
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            hideError();
                        }}
                        placeholder="prenom.nom@epo.bf"
                        className={INPUT_CLASS}
                    />
                </div>

                <div>
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                        <label htmlFor="password" className="text-sm font-medium text-epo-slate-800">
                            Mot de passe
                        </label>
                        <Link
                            to="/mot-de-passe-oublie"
                            state={{ email: email.trim() }}
                            className={`text-sm ${LINK_CLASS}`}
                        >
                            Mot de passe oublié ?
                        </Link>
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                hideError();
                            }}
                            className={`${INPUT_CLASS} pr-12`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                            aria-pressed={showPassword}
                            className="absolute inset-y-0 right-0 flex items-center justify-center w-11 rounded-r-lg text-epo-slate-500 hover:text-epo-slate-800 focus-visible:outline-none focus-visible:text-epo-green-700"
                        >
                            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <label className="flex items-center gap-2.5 text-sm cursor-pointer select-none text-epo-slate-700">
                    <input
                        type="checkbox"
                        className="w-4 h-4 cursor-pointer accent-epo-green-700"
                    />
                    Rester connecté sur cet appareil
                </label>

                <button ref={submitRef} type="submit" disabled={loading} className={`${PRIMARY_BUTTON_CLASS} mt-1`}>
                    {loading ? (
                        <>
                            <span
                                className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"
                                aria-hidden="true"
                            />
                            Connexion en cours…
                        </>
                    ) : (
                        'Se connecter'
                    )}
                </button>
            </form>

            {/* Maquette uniquement - à retirer avec DemoProfilePicker.jsx */}
            <div className="mt-8">
                <DemoProfilePicker
                    onSelect={(account) => {
                        setEmail(account.email);
                        setPassword(account.password);
                        setError('');
                        submitRef.current?.focus();
                    }}
                />
            </div>
        </div>
    );
}
