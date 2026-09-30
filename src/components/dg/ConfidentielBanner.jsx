// src/components/dg/ConfidentielBanner.jsx

export default function ConfidentielBanner() {
    return (
        <div className="flex items-start gap-3 p-4 mb-6 text-white border rounded-xl bg-epo-slate-800 border-epo-slate-700">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-epo-slate-700">
                <i className="fas fa-shield-halved text-[16px]" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-[13.5px] font-semibold">
                    Espace confidentiel -Accès restreint
                </div>
                <div className="text-[12px] text-epo-slate-300 mt-0.5">
                    Les dossiers affichés sont soumis à une <strong>liste blanche</strong> d'accès (RG-11).
                    Toute consultation, impression ou tentative d'accès est <strong>journalisée</strong> (RG-13).
                    Un accès tiers nécessite une <strong>autorisation explicite</strong> du SG ou du DG (RG-12).
                </div>
            </div>
        </div>
    );
}