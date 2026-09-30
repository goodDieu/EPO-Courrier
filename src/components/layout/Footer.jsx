/**
 * Pied de page de l'application.
 * Affiche la mention légale, les liens utiles et la version.
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="px-6 py-4 text-xs bg-white border-t  border-epo-slate-200 text-epo-slate-500"
        >
            <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-center sm:text-left">
                    <i className="fas fa-envelope text-epo-green-600" />
                    <span>
                        © {currentYear} EPO Courrier - École Polytechnique de Ouagadougou
                    </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <a href="#" className="transition hover:text-epo-green-600">
                        Mentions légales
                    </a>
                    <a href="#" className="transition hover:text-epo-green-600">
                        Confidentialité
                    </a>
                    <a href="#" className="transition hover:text-epo-green-600">
                        Aide
                    </a>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-epo-slate-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-epo-green-500" />
                        v2.0
                    </span>
                </div>
            </div>
        </footer>
    );
}