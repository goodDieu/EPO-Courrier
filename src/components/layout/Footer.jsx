/**
 * Pied de page de l'application.
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="px-4 py-4 text-xs border-t sm:px-6 lg:px-8 border-ground-line text-epo-slate-500">
            <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                <span>© {currentYear} École Polytechnique de Ouagadougou - Gestion des courriers</span>
                <span>Version 2.0</span>
            </div>
        </footer>
    );
}
