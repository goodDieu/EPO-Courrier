import { useState, useEffect, useRef } from 'react';
import logoEpo from '../../assets/logo-epo.jpeg';

const USERS = [
    { email: 'a.kabore@epo.bf', password: 'Demo2026#', role: 'Secrétaire Général' },
    { email: 'i.ouedraogo@epo.bf', password: 'Demo2026#', role: 'Directeur Général' },
    { email: 'm.traore@epo.bf', password: 'Demo2026#', role: 'Chef SCC' },
    { email: 'a.sawadogo@epo.bf', password: 'Demo2026#', role: 'Agent de liaison' },
    { email: 'm.diakite@epo.bf', password: 'Demo2026#', role: 'Administrateur' },
];

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        // Pré-remplissage si session existante
        try {
            const savedUser = sessionStorage.getItem('epo_user');
            if (savedUser) {
                const user = JSON.parse(savedUser);
                setEmail(user.email || '');
            }
        } catch (e) {
            /* noop */
        }

        // Écoute de la sélection d'un compte de démo
        const handler = (e) => {
            const { email, password } = e.detail;
            setEmail(email);
            setPassword(password);
            hideError();
        };
        window.addEventListener('epo:demo-select', handler);
        return () => window.removeEventListener('epo:demo-select', handler);
    }, []);

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
                        email: trimmedEmail,
                        role: user.role,
                        loginTime: new Date().toISOString(),
                    })
                );
            } catch (e) {
                /* noop */
            }

            // Dans une vraie app : navigation vers le dashboard selon le rôle
            setTimeout(() => {
                // redirection selon le rôle
                switch (user.role) {
                    case 'Secrétaire Général':
                        window.location.href = '/sg/dashboard';
                        break;
                    case 'Directeur Général':
                        window.location.href = '/dg/dashboard';
                        break;
                    case 'Chef SCC':
                        window.location.href = '/scc/dashboard';
                        break;
                    case 'Agent de liaison':
                        window.location.href = '/liaison/dashboard';
                        break;
                    case 'Administrateur':
                        window.location.href = '/admin/dashboard';
                        break;
                    default:
                        alert('Rôle non reconnu.');
                }

                // alert(
                //     `✅ Connexion réussie !\n\n` +
                //         `Utilisateur : ${trimmedEmail}\n` +
                //         `Rôle : ${user.role}\n\n` +
                //         `(Dans l'application réelle, vous seriez redirigé vers votre tableau de bord.)`
                // );
                setLoading(false);
            }, 400);
        }, 900);
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            showError('Saisissez votre e-mail pour recevoir le lien de réinitialisation.');
            return;
        }

        if (!trimmedEmail.endsWith('@epo.bf')) {
            showError('Seules les adresses @epo.bf sont autorisées.');
            return;
        }

        alert(`📧 Un lien de réinitialisation a été envoyé à :\n\n${trimmedEmail}`);
    };

    const handleSSO = () => {
        alert(
            "🔐 Connexion SSO via Active Directory\n\n" +
                "Vous allez être redirigé vers le portail d'authentification de l'EPO."
        );
    };

    return (
        <main className="flex items-center justify-center p-6 sm:p-12 bg-white">
            <div className="w-full max-w-md animate-fade-in-up">
                {/* Logo mobile */}
                <div className="flex lg:hidden items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-white border border-epo-slate-200 flex items-center justify-center p-1.5">
                        <img
                            src={logoEpo}
                            alt="EPO"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="text-epo-slate-700 font-bold text-lg">
                        EPO Courrier
                    </div>
                </div>

                {/* En-tête */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2 text-epo-green-600 text-xs font-semibold uppercase tracking-widest">
                        <i className="fas fa-hand-wave" />
                        Bienvenue
                    </div>
                    <h1 className="text-3xl font-bold text-epo-slate-800 tracking-tight mb-2">
                        Connexion à la plateforme
                    </h1>
                    <p className="text-sm text-epo-slate-500">
                        Accédez à votre espace de gestion des courriers et des actes.
                    </p>
                </div>

                {/* Message d'erreur */}
                {error && (
                    <div
                        className="
                            flex items-start gap-3
                            px-4 py-3 mb-5
                            bg-epo-red-50
                            border border-epo-red-100
                            rounded-lg
                            text-epo-red-600
                            text-sm
                        "
                    >
                        <i className="fas fa-exclamation-circle mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Formulaire */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className={`flex flex-col gap-5 ${shake ? 'animate-shake' : ''}`}
                >
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="email"
                            className="flex items-center gap-2 text-sm font-semibold text-epo-slate-700"
                        >
                            <i className="fas fa-envelope text-[10px] text-epo-slate-400" />
                            Adresse e-mail institutionnelle
                        </label>
                        <div className="relative">
                            <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-epo-slate-400 text-sm pointer-events-none peer-focus:text-epo-green-500" />
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
                                className="
                                    w-full
                                    pl-11 pr-4 py-3.5
                                    bg-white
                                    border-[1.5px] border-epo-slate-200
                                    rounded-lg
                                    text-[15px]
                                    text-epo-slate-800
                                    placeholder:text-epo-slate-300
                                    outline-none
                                    transition-all duration-200
                                    focus:border-epo-green-500
                                    focus:ring-4 focus:ring-epo-green-500/10
                                "
                            />
                        </div>
                    </div>

                    {/* Mot de passe */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="password"
                            className="flex items-center gap-2 text-sm font-semibold text-epo-slate-700"
                        >
                            <i className="fas fa-lock text-[10px] text-epo-slate-400" />
                            Mot de passe
                        </label>
                        <div className="relative">
                            <i className="fas fa-key absolute left-4 top-1/2 -translate-y-1/2 text-epo-slate-400 text-sm pointer-events-none" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    hideError();
                                }}
                                placeholder="••••••••••"
                                className="
                                    w-full
                                    pl-11 pr-12 py-3.5
                                    bg-white
                                    border-[1.5px] border-epo-slate-200
                                    rounded-lg
                                    text-[15px]
                                    text-epo-slate-800
                                    placeholder:text-epo-slate-300
                                    outline-none
                                    transition-all duration-200
                                    focus:border-epo-green-500
                                    focus:ring-4 focus:ring-epo-green-500/10
                                "
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={
                                    showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
                                }
                                className="
                                    absolute right-3 top-1/2 -translate-y-1/2
                                    w-8 h-8
                                    flex items-center justify-center
                                    text-epo-slate-400
                                    rounded-md
                                    transition
                                    hover:text-epo-slate-700 hover:bg-epo-slate-100
                                "
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
                            </button>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <label className="flex items-center gap-2 text-sm text-epo-slate-600 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-epo-slate-300 text-epo-green-600 focus:ring-epo-green-500/30 cursor-pointer"
                            />
                            Se souvenir de moi
                        </label>
                        <a
                            href="#"
                            onClick={handleForgotPassword}
                            className="text-sm font-medium text-epo-green-600 hover:text-epo-green-700 hover:underline transition"
                        >
                            Mot de passe oublié ?
                        </a>
                    </div>

                    {/* Bouton */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            flex items-center justify-center gap-2.5
                            px-5 py-3.5 mt-1
                            bg-epo-slate-700 hover:bg-epo-slate-800
                            disabled:bg-epo-slate-500 disabled:cursor-not-allowed
                            text-white
                            text-[15px] font-semibold
                            rounded-lg
                            shadow-sm
                            transition-all duration-200
                            hover:-translate-y-px hover:shadow-md
                            active:translate-y-0
                        "
                    >
                        {loading ? (
                            <>
                                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                <span className="opacity-70">Connexion en cours…</span>
                            </>
                        ) : (
                            <>
                                <span>Se connecter</span>
                                <i className="fas fa-arrow-right text-sm" />
                            </>
                        )}
                    </button>
                </form>

                {/* Séparateur */}
                <div className="flex items-center gap-4 my-6 text-epo-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                    <span className="flex-1 h-px bg-epo-slate-200" />
                    ou
                    <span className="flex-1 h-px bg-epo-slate-200" />
                </div>

                {/* SSO */}
                <button
                    type="button"
                    onClick={handleSSO}
                    className="
                        w-full
                        flex items-center justify-center gap-2.5
                        px-5 py-3
                        bg-white hover:bg-epo-slate-50
                        border-[1.5px] border-epo-slate-200 hover:border-epo-slate-300
                        text-epo-slate-700
                        text-sm font-medium
                        rounded-lg
                        transition
                    "
                >
                    <i className="fas fa-building text-epo-green-500" />
                    Se connecter avec le compte Active Directory
                </button>

                {/* Footer */}
                <div className="mt-7 pt-5 border-t border-epo-slate-200 text-center text-xs text-epo-slate-500 leading-relaxed">
                    Un problème pour vous connecter ?{' '}
                    <a
                        href="#"
                        className="text-epo-green-600 font-medium hover:underline"
                    >
                        Contactez le support DSI
                    </a>
                    <br />
                    <span className="text-[11px] opacity-70">
                        Accès réservé au personnel habilité de l'EPO.
                    </span>
                </div>
            </div>
        </main>
    );
}