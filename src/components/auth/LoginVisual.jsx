import logoEpo from '../../assets/logo-epo.jpeg';

/**
 * Panneau gauche : visuel de marque avec le logo EPO
 */
export default function LoginVisual() {
    const features = [
        {
            icon: 'fa-route',
            title: 'Traçabilité complète',
            desc: 'Suivez chaque dossier de son arrivée à son archivage.',
        },
        {
            icon: 'fa-shield-alt',
            title: 'Sécurité renforcée',
            desc: "Contrôle d'accès par rôle et journalisation des actions.",
        },
        {
            icon: 'fa-bolt',
            title: 'Recherche instantanée',
            desc: 'Retrouvez un dossier en quelques secondes.',
        },
        {
            icon: 'fa-file-signature',
            title: 'Workflow des actes',
            desc: 'Rédaction, visa, signature et archivage automatisés.',
        },
    ];

    return (
        <aside
            className="relative flex-col justify-between hidden p-12 overflow-hidden text-white  lg:flex bg-gradient-to-br from-epo-slate-800 via-epo-slate-700 to-epo-green-800"
        >
            {/* Motifs décoratifs */}
            <div
                className="
                    absolute -top-32 -right-32
                    w-[400px] h-[400px] rounded-full
                    bg-[radial-gradient(circle,rgba(0,154,68,0.25)_0%,transparent_70%)]
                    pointer-events-none
                "
            />
            <div
                className="
                    absolute -bottom-40 -left-32
                    w-[500px] h-[500px] rounded-full
                    bg-[radial-gradient(circle,rgba(255,209,0,0.12)_0%,transparent_70%)]
                    pointer-events-none
                "
            />
            <div
                className="
                    absolute top-1/2 left-1/3
                    w-[300px] h-[300px] rounded-full
                    bg-[radial-gradient(circle,rgba(227,6,19,0.08)_0%,transparent_70%)]
                    pointer-events-none
                "
            />

            {/* Contenu */}
            <div className="relative z-10 animate-fade-in-up">
                {/* Logo */}
                <div className="flex items-center gap-4 mb-12">
                    <div
                        className="flex items-center justify-center w-16 h-16 p-2 shadow-lg  rounded-2xl bg-white/95"
                    >
                        <img
                            src={logoEpo}
                            alt="EPO"
                            className="object-contain w-full h-full"
                        />
                    </div>
                    <div>
                        <div className="text-xl font-bold tracking-tight">
                            EPO Courrier
                        </div>
                        <div className="text-xs font-normal tracking-wide opacity-70">
                            École Polytechnique de Ouagadougou
                        </div>
                    </div>
                </div>

                {/* Titre */}
                <h2 className="max-w-lg mb-4 text-4xl font-extrabold leading-tight tracking-tight">
                    La gestion des courriers et des actes,{' '}
                    <span className="text-epo-yellow-400">simplifiée.</span>
                </h2>

                <p className="max-w-md mb-10 text-base leading-relaxed opacity-80">
                    Plateforme numérique pour la traçabilité, la sécurité et le
                    pilotage des échanges administratifs de l'EPO.
                </p>

                {/* Fonctionnalités */}
                <div className="flex flex-col max-w-md gap-4">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="
                                flex items-start gap-4
                                p-4
                                rounded-xl
                                bg-white/[0.06]
                                border border-white/[0.08]
                                backdrop-blur-sm
                                transition-all duration-200
                                hover:bg-white/[0.1]
                                hover:translate-x-1
                            "
                        >
                            <div
                                className="flex items-center justify-center flex-shrink-0 rounded-lg  w-9 h-9 bg-epo-yellow-500/20 text-epo-yellow-400"
                            >
                                <i className={`fas ${f.icon} text-sm`} />
                            </div>
                            <div>
                                <div className="text-sm font-semibold mb-0.5">
                                    {f.title}
                                </div>
                                <div className="text-xs leading-snug opacity-65">
                                    {f.desc}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div
                className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-6 text-xs border-t  border-white/10 opacity-60"
            >
                <span>© 2026 EPO - Tous droits réservés</span>
                <div className="flex gap-5">
                    <a href="#" className="transition hover:opacity-100 hover:text-epo-yellow-400">
                        Mentions légales
                    </a>
                    <a href="#" className="transition hover:opacity-100 hover:text-epo-yellow-400">
                        Confidentialité
                    </a>
                    <a href="#" className="transition hover:opacity-100 hover:text-epo-yellow-400">
                        Aide
                    </a>
                </div>
            </div>
        </aside>
    );
}