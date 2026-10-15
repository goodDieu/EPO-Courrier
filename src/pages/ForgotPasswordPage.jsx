import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import {
    LABEL_CLASS,
    INPUT_CLASS,
    PRIMARY_BUTTON_CLASS,
    SECONDARY_BUTTON_CLASS,
    LINK_CLASS,
} from '../components/auth/authStyles.js';

const RESEND_DELAY = 30; // secondes avant de pouvoir renvoyer l'e-mail

/**
 * Mot de passe oublié (simulation) :
 *   1. saisie de l'adresse professionnelle
 *   2. confirmation d'envoi du lien, avec possibilité de renvoi
 */
export default function ForgotPasswordPage() {
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || '');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    const sendLink = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSent(true);
            setCooldown(RESEND_DELAY);
        }, 800);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setError('Saisissez votre adresse e-mail professionnelle.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            setError('Veuillez saisir une adresse e-mail valide.');
            return;
        }
        if (!trimmedEmail.endsWith('@epo.bf')) {
            setError('Seules les adresses @epo.bf sont autorisées.');
            return;
        }

        setError('');
        setEmail(trimmedEmail);
        sendLink();
    };

    return (
        <AuthLayout>
            <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-medium text-epo-slate-600 hover:text-epo-slate-900"
            >
                <i className="text-xs fas fa-arrow-left" aria-hidden="true" />
                Retour à la connexion
            </Link>

            {!sent ? (
                <div className="mt-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-epo-slate-900 sm:text-3xl">
                        Mot de passe oublié
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-epo-slate-600">
                        Saisissez votre adresse e-mail professionnelle pour recevoir un lien
                        de réinitialisation.
                    </p>

                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 mt-8">
                        <div>
                            <label htmlFor="reset-email" className={LABEL_CLASS}>
                                Adresse e-mail professionnelle
                            </label>
                            <input
                                id="reset-email"
                                type="email"
                                autoComplete="username"
                                autoFocus
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (error) setError('');
                                }}
                                placeholder="prenom.nom@epo.bf"
                                aria-invalid={!!error}
                                aria-describedby={error ? 'reset-email-error' : undefined}
                                className={`${INPUT_CLASS} ${
                                    error ? 'border-epo-red-500 focus:border-epo-red-500 focus:ring-epo-red-500/20' : ''
                                }`}
                            />
                            {error && (
                                <p id="reset-email-error" className="flex items-center gap-1.5 mt-1.5 text-sm text-epo-slate-900">
                                    <i className="text-xs fas fa-circle-exclamation" aria-hidden="true" />
                                    {error}
                                </p>
                            )}
                        </div>

                        <button type="submit" disabled={loading} className={PRIMARY_BUTTON_CLASS}>
                            {loading ? (
                                <>
                                    <span
                                        className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"
                                        aria-hidden="true"
                                    />
                                    Envoi en cours…
                                </>
                            ) : (
                                'Envoyer le lien de réinitialisation'
                            )}
                        </button>
                    </form>

                </div>
            ) : (
                <div className="mt-8" role="status">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-epo-slate-100 text-epo-slate-600">
                        <i className="text-lg fas fa-envelope-open-text" aria-hidden="true" />
                    </div>

                    <h1 className="mt-6 text-2xl font-semibold tracking-tight text-epo-slate-900 sm:text-3xl">
                        Vérifiez votre messagerie
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-epo-slate-600">
                        Si un compte correspond à{' '}
                        <span className="font-semibold text-epo-slate-900">{email}</span>, un
                        lien de réinitialisation, valable 30 minutes, vient de lui être envoyé.
                        Pensez à vérifier vos courriers indésirables.
                    </p>


                    <div className="flex flex-col gap-3 mt-8">
                        <button
                            type="button"
                            onClick={sendLink}
                            disabled={loading || cooldown > 0}
                            className={SECONDARY_BUTTON_CLASS}
                        >
                            {loading
                                ? 'Envoi en cours…'
                                : cooldown > 0
                                ? `Renvoyer l'e-mail (${cooldown} s)`
                                : "Renvoyer l'e-mail"}
                        </button>
                        <p className="text-sm text-center text-epo-slate-600">
                            Mauvaise adresse ?{' '}
                            <button
                                type="button"
                                onClick={() => {
                                    setSent(false);
                                    setCooldown(0);
                                }}
                                className={LINK_CLASS}
                            >
                                En saisir une autre
                            </button>
                        </p>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
}
