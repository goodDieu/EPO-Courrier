// src/components/layout/ModeInterimBanner.jsx
import { DELEGATIONS_ACTIVES } from '../../data/parametrageSG.js';

export default function ModeInterimBanner({ role }) {
    if (role !== 'sg') return null;

    const active = DELEGATIONS_ACTIVES.find((d) => d.modeInterim);
    if (!active) return null;

    const dateFin = new Date(active.dateFin).toLocaleDateString('fr-FR');

    return (
        <div className="flex items-center gap-3 px-4 py-2 text-[12.5px] font-medium border-b bg-epo-yellow-50 border-epo-yellow-200 text-epo-yellow-900">
            <i className="fas fa-user-clock" />
            <span className="flex-1 min-w-0 truncate">
                <strong>Mode intérim actif</strong> - Délégation à {active.delegataire} jusqu'au {dateFin}.
                Le délégataire peut viser, imputer et renvoyer, mais ne peut pas signer (RG-23).
            </span>
            <a
                href="/sg/parametrage"
                className="flex-shrink-0 text-[11.5px] font-semibold hover:underline whitespace-nowrap"
            >
                Gérer <i className="fas fa-arrow-right text-[9px] ml-1" />
            </a>
        </div>
    );
}