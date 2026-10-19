import { Link } from 'react-router-dom';
import logoEpo from '../../assets/logo-epo.jpeg';
import campusEpo from '../../assets/campus-epo.jpeg';

/**
 * Mise en page des écrans d'authentification (connexion, mot de passe oublié).
 * Colonne gauche : en-tête, formulaire (children), pied de page.
 * Colonne droite (desktop) : photo du campus.
 */
export default function AuthLayout({ children }) {
    const currentYear = new Date().getFullYear();

    return (
        <div className="grid min-h-screen bg-white lg:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            {/* Colonne formulaire */}
            <div className="flex flex-col px-6 py-6 sm:px-10 lg:px-14">
                <header>
                    <Link to="/login" className="inline-flex items-center gap-3">
                        <img
                            src={logoEpo}
                            alt="École Polytechnique de Ouagadougou"
                            className="object-contain w-auto h-11"
                        />
                        <span className="pl-3 border-l border-epo-slate-200">
                            <span className="block text-base font-semibold leading-tight text-epo-slate-900">
                                Gestion des courriers
                            </span>
                            <span className="block text-xs leading-tight text-epo-slate-500">
                                École Polytechnique de Ouagadougou
                            </span>
                        </span>
                    </Link>
                </header>

                <main className="flex items-center flex-1 py-12">
                    <div className="w-full max-w-sm mx-auto">{children}</div>
                </main>

                <footer className="flex flex-col gap-2 text-xs text-epo-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <span>© {currentYear} École Polytechnique de Ouagadougou</span>
                    <nav className="flex gap-5" aria-label="Liens utiles">
                        <a href="#" className="hover:text-epo-slate-800 hover:underline">
                            Aide
                        </a>
                        <a href="#" className="hover:text-epo-slate-800 hover:underline">
                            Confidentialité
                        </a>
                    </nav>
                </footer>
            </div>

            {/* Colonne visuelle */}
            <aside className="relative hidden p-4 lg:block">
                <div className="relative h-full overflow-hidden rounded-2xl bg-epo-slate-200">
                    <img
                        src={campusEpo}
                        alt="Bâtiment des salles de classes de l'École Polytechnique de Ouagadougou"
                        className="absolute inset-0 object-cover w-full h-full"
                    />
                </div>
            </aside>
        </div>
    );
}
