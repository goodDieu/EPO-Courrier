// src/components/liaison/TourneeHero.jsx
import { ETATS_REMISE } from '../../data/dashboardLiaison.js';

export default function TourneeHero({ etape, onRemettre, onSignaler }) {
    if (!etape) {
        return (
            <div className="p-6 mb-6 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-green-50">
                    <i className="text-2xl fas fa-check-circle text-epo-green-500" />
                </div>
                <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                    Tournée terminée 🎉
                </div>
                <div className="text-[13px] text-epo-slate-500">
                    Toutes les remises ont été effectuées.
                </div>
            </div>
        );
    }

    const prioriteStyles = {
        urgent: 'bg-epo-red-500 text-white',
        confidentiel: 'bg-epo-slate-800 text-white',
        normal: 'bg-epo-slate-100 text-epo-slate-700',
    };

    return (
        <div className="relative mb-6 overflow-hidden bg-white border-2 shadow-card rounded-2xl border-epo-slate-800">
            {/* Bandeau haut : Prochaine remise */}
            <div className="flex items-center justify-between px-5 py-2.5 bg-epo-slate-800 text-white">
                <div className="flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-[13px]" />
                    <span className="text-[12px] font-semibold uppercase tracking-wider">
                        Prochaine remise
                    </span>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider ${prioriteStyles[etape.priorite]}`}>
                    {etape.priorite === 'urgent' && <i className="fas fa-exclamation-circle text-[9px]" />}
                    {etape.priorite === 'confidentiel' && <i className="fas fa-lock text-[9px]" />}
                    {etape.priorite === 'urgent' ? 'Urgent' : etape.priorite === 'confidentiel' ? 'Confidentiel' : 'Normal'}
                </span>
            </div>

            {/* Corps */}
            <div className="p-5 sm:p-6">
                {/* Destinataire */}
                <div className="flex items-start gap-3 mb-5">
                    <div className="flex items-center justify-center flex-shrink-0 w-14 h-14 text-[15px] font-bold rounded-xl bg-epo-slate-100 text-epo-slate-700">
                        {etape.destinataire.personne.replace('M. ', '').replace('Mme ', '').replace('Pr. ', '').split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[18px] font-bold leading-tight text-epo-slate-900">
                            {etape.destinataire.personne}
                        </div>
                        <div className="text-[13.5px] text-epo-slate-600 mt-0.5">
                            {etape.destinataire.qualite}
                        </div>
                        <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-epo-slate-100 text-[12px] font-semibold text-epo-slate-700">
                            <i className="fas fa-building text-[10px]" />
                            {etape.destinataire.structure}
                        </div>
                    </div>
                </div>

                {/* Localisation (important pour le terrain) */}
                <div className="flex items-center gap-2 p-3 mb-4 border rounded-lg bg-epo-green-50 border-epo-green-200">
                    <i className="fas fa-map-marker-alt text-epo-green-600 text-[14px]" />
                    <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-epo-green-900">
                            {etape.destinataire.localisation}
                        </div>
                        {etape.distanceEstimee && (
                            <div className="text-[11.5px] text-epo-green-700 mt-0.5">
                                <i className="fas fa-walking text-[10px] mr-1" />
                                {etape.distanceEstimee}
                            </div>
                        )}
                    </div>
                </div>

                {/* Document */}
                <div className="mb-5">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[12px] font-bold text-epo-slate-800 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                            {etape.documentNumero}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-epo-slate-500">
                            {etape.documentType === 'acte' ? 'Acte' : 'Courrier'}
                        </span>
                    </div>
                    <div className="text-[14px] leading-snug text-epo-slate-700">
                        {etape.documentObjet}
                    </div>
                </div>

                {/* Actions tactiles */}
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    <button
                        onClick={() => onRemettre(etape)}
                        className="
                            sm:col-span-2 flex items-center justify-center gap-2
                            py-3.5 px-5 rounded-xl bg-epo-green-500 text-white
                            text-[15px] font-bold shadow-card
                            hover:bg-epo-green-600 active:scale-[0.98]
                            transition
                        "
                    >
                        <i className="fas fa-check-circle text-[16px]" />
                        Remettre maintenant
                    </button>
                    <button
                        onClick={() => onSignaler(etape)}
                        className="
                            flex items-center justify-center gap-2
                            py-3.5 px-5 rounded-xl bg-epo-slate-100 text-epo-slate-700
                            text-[14px] font-semibold
                            hover:bg-epo-slate-200 active:scale-[0.98]
                            transition
                        "
                    >
                        <i className="fas fa-flag text-[13px]" />
                        Signaler
                    </button>
                </div>
            </div>
        </div>
    );
}