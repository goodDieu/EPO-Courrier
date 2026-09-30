// src/pages/parametrage/MonParametragePage.jsx
import { useState } from 'react';
import { Button } from '../../components/ui';
import ParametrageSection from '../../components/parametrage/ParametrageSection';
import ToggleSwitch from '../../components/parametrage/ToggleSwitch';
import {
    PROFIL_SG,
    LANGUES,
    FUSEAUX,
    FORMATS_DATE,
    DENSITES,
    DELEGATAIRES,
    PORTEES_DELEGATION,
    DELEGATIONS_ACTIVES,
    DELEGATIONS_HISTORIQUE,
    EVENEMENTS_NOTIFICATION,
    VUES_SAUVEGARDEES,
    LISTES_DIFFUSION,
    DESTINATAIRES_FAVORIS,
    INDISPONIBILITES,
    TYPES_INDISPONIBILITE,
    MAQUETTES_FAVORITES,
    SIGNATURE_DELEGATION,
} from '../../data/parametrageSG.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function MonParametragePage() {
    return (
        <div className="w-full min-w-0">
            {/* En-tête */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Mon paramétrage
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Personnalisez votre espace de travail
                    </div>
                </div>

                <Button variant="primary" icon="fa-save">
                    Enregistrer
                </Button>
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-3">
                <SectionProfil />
                <SectionNotifications />
                <SectionDelegations />
                <SectionVues />
                <SectionListesDiffusion />
                <SectionDestinatairesFavoris />
                <SectionAgenda />
                <SectionMaquettes />
                <SectionSignature />
            </div>
        </div>
    );
}

/* ============================================================
   1. PROFIL & PRÉFÉRENCES
   ============================================================ */

function SectionProfil() {
    return (
        <ParametrageSection
            icon="fa-user-circle"
            title="Profil & préférences"
            description="Nom, fonction, langue, fuseau, format de date"
        >
            {/* Profil */}
            <div className="flex items-start gap-4 p-4 mb-4 rounded-lg bg-epo-slate-50">
                <div className="flex items-center justify-center flex-shrink-0 text-[16px] font-bold rounded-full w-14 h-14 bg-epo-green-500 text-white">
                    {PROFIL_SG.nom.split(' ').slice(-1)[0].slice(0, 1)}
                    {PROFIL_SG.nom.split(' ')[0].slice(0, 1)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-bold text-epo-slate-900">
                        {PROFIL_SG.nom}
                    </div>
                    <div className="text-[13px] text-epo-slate-600">
                        {PROFIL_SG.fonction} · {PROFIL_SG.structure}
                    </div>
                    <div className="mt-1 text-[12px] text-epo-slate-500">
                        <i className="fas fa-envelope mr-1.5 text-[10px]" />
                        {PROFIL_SG.email}
                    </div>
                </div>
            </div>

            {/* Préférences */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Langue">
                    <select className={inputCls} defaultValue={PROFIL_SG.langue}>
                        {LANGUES.map((l) => (
                            <option key={l.value} value={l.value}>{l.label}</option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Fuseau horaire">
                    <select className={inputCls} defaultValue={PROFIL_SG.fuseau}>
                        {FUSEAUX.map((f) => (
                            <option key={f.value} value={f.value}>{f.label}</option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Format de date">
                    <select className={inputCls} defaultValue={PROFIL_SG.formatDate}>
                        {FORMATS_DATE.map((f) => (
                            <option key={f.value} value={f.value}>{f.label}</option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Densité d'affichage">
                    <select className={inputCls} defaultValue={PROFIL_SG.densite}>
                        {DENSITES.map((d) => (
                            <option key={d.value} value={d.value}>{d.label}</option>
                        ))}
                    </select>
                </FormField>
            </div>
        </ParametrageSection>
    );
}

/* ============================================================
   2. NOTIFICATIONS
   ============================================================ */

function SectionNotifications() {
    const [events, setEvents] = useState(EVENEMENTS_NOTIFICATION);

    const toggle = (key, canal) => {
        setEvents((prev) =>
            prev.map((e) =>
                e.key === key ? { ...e, [canal]: !e[canal] } : e
            )
        );
    };

    const actifs = events.filter((e) => e.inapp || e.email).length;

    return (
        <ParametrageSection
            icon="fa-bell"
            title="Notifications"
            description="Choisissez les événements à suivre et les canaux"
            badge={`${actifs} / ${events.length}`}
            badgeVariant="info"
        >
            <div className="overflow-hidden border rounded-lg border-epo-slate-200">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-epo-slate-50">
                            <th className="px-4 py-2.5 text-left text-[11px] font-semibold tracking-wider uppercase text-epo-slate-500">
                                Événement
                            </th>
                            <th className="w-24 px-4 py-2.5 text-center text-[11px] font-semibold tracking-wider uppercase text-epo-slate-500">
                                In-app
                            </th>
                            <th className="w-24 px-4 py-2.5 text-center text-[11px] font-semibold tracking-wider uppercase text-epo-slate-500">
                                Email
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((e) => (
                            <tr
                                key={e.key}
                                className="border-t border-epo-slate-100"
                            >
                                <td className="px-4 py-3">
                                    <div className="text-[13px] font-medium text-epo-slate-800">
                                        {e.label}
                                    </div>
                                    <div className="text-[11.5px] text-epo-slate-500 mt-0.5">
                                        {e.description}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <ToggleSwitch
                                        size="sm"
                                        checked={e.inapp}
                                        onChange={() => toggle(e.key, 'inapp')}
                                    />
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <ToggleSwitch
                                        size="sm"
                                        checked={e.email}
                                        onChange={() => toggle(e.key, 'email')}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-start gap-2 p-3 mt-3 border rounded-lg bg-epo-yellow-50 border-epo-yellow-200">
                <i className="fas fa-info-circle text-epo-yellow-600 mt-0.5" />
                <div className="text-[12px] text-epo-yellow-800">
                    <strong>Note :</strong> Les canaux SMS et WhatsApp seront disponibles dans une version ultérieure du système (§20.2).
                </div>
            </div>
        </ParametrageSection>
    );
}

/* ============================================================
   3. DÉLÉGATIONS & INTÉRIM
   ============================================================ */

function SectionDelegations() {
    const actives = DELEGATIONS_ACTIVES;
    const [showCreate, setShowCreate] = useState(false);

    return (
        <ParametrageSection
            icon="fa-signature"
            title="Délégations & intérim"
            description="Gérez vos délégations de signature et votre mode intérim"
            badge={actives.length > 0 ? `${actives.length} active${actives.length > 1 ? 's' : ''}` : 'Aucune'}
            badgeVariant={actives.length > 0 ? 'warning' : 'default'}
        >
            {/* Alerte mode intérim actif */}
            {actives.some((d) => d.modeInterim) && (
                <div className="flex items-start gap-2.5 p-3 mb-4 rounded-lg bg-epo-yellow-50 border border-epo-yellow-300">
                    <i className="fas fa-user-clock text-epo-yellow-600 mt-0.5" />
                    <div className="text-[12.5px] text-epo-yellow-800">
                        <strong>Mode intérim actif.</strong> Le délégataire peut viser, imputer et renvoyer, mais <strong>ne peut pas signer</strong> les actes relevant de votre délégation (RG-23).
                    </div>
                </div>
            )}

            {/* Délégations actives */}
            {actives.map((d) => (
                <div key={d.id} className="p-4 mb-3 border rounded-lg bg-epo-green-50 border-epo-green-200">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center flex-shrink-0 text-[12px] font-bold rounded-full w-10 h-10 bg-epo-green-500 text-white">
                                {d.delegataire.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                                <div className="text-[13.5px] font-semibold text-epo-slate-900">
                                    {d.delegataire}
                                </div>
                                <div className="text-[12px] text-epo-slate-600">
                                    {d.fonction}
                                </div>
                                <div className="flex flex-wrap gap-1.5 mt-1.5">
                                    {d.portees.map((p) => (
                                        <span key={p} className="px-2 py-0.5 text-[10.5px] font-semibold rounded-full bg-white text-epo-slate-700">
                                            {PORTEES_DELEGATION.find((pp) => pp.key === p)?.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button className="text-[12px] font-medium text-epo-red-600 hover:underline flex-shrink-0">
                            Révoquer
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 mt-3 border-t border-epo-green-200">
                        <div>
                            <div className="text-[10.5px] font-semibold tracking-wider uppercase text-epo-slate-400">
                                Du
                            </div>
                            <div className="text-[12.5px] font-medium text-epo-slate-800">
                                {new Date(d.dateDebut).toLocaleDateString('fr-FR')}
                            </div>
                        </div>
                        <div>
                            <div className="text-[10.5px] font-semibold tracking-wider uppercase text-epo-slate-400">
                                Au
                            </div>
                            <div className="text-[12.5px] font-medium text-epo-slate-800">
                                {new Date(d.dateFin).toLocaleDateString('fr-FR')}
                            </div>
                        </div>
                    </div>

                    {d.motif && (
                        <div className="mt-2 text-[12px] text-epo-slate-600 italic">
                            Motif : {d.motif}
                        </div>
                    )}
                </div>
            ))}

            {/* Bouton créer */}
            {!showCreate && (
                <button
                    onClick={() => setShowCreate(true)}
                    className="flex items-center justify-center w-full gap-2 py-3 text-[13px] font-semibold transition border-2 border-dashed rounded-lg border-epo-slate-300 text-epo-slate-600 hover:border-epo-green-400 hover:bg-epo-green-50 hover:text-epo-green-700"
                >
                    <i className="fas fa-plus" />
                    Nouvelle délégation
                </button>
            )}

            {showCreate && (
                <DelegationForm onCancel={() => setShowCreate(false)} />
            )}

            {/* Historique */}
            <div className="pt-4 mt-4 border-t border-epo-slate-100">
                <button className="text-[12.5px] font-medium text-epo-slate-600 hover:underline">
                    <i className="fas fa-history mr-1.5 text-[11px]" />
                    Voir l'historique ({DELEGATIONS_HISTORIQUE.length})
                </button>
            </div>
        </ParametrageSection>
    );
}

function DelegationForm({ onCancel }) {
    const [delegataireId, setDelegataireId] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [portees, setPortees] = useState(['visa', 'imputation', 'renvoi']);
    const [motif, setMotif] = useState('');

    const togglePortee = (key) => {
        setPortees((prev) =>
            prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
        );
    };

    return (
        <div className="p-4 mt-3 border rounded-lg border-epo-green-200 bg-epo-green-50/40">
            <div className="mb-3 text-[13px] font-semibold text-epo-slate-800">
                Nouvelle délégation
            </div>

            <div className="grid grid-cols-1 gap-3 mb-3 sm:grid-cols-2">
                <FormField label="Délégataire" required>
                    <select
                        value={delegataireId}
                        onChange={(e) => setDelegataireId(e.target.value)}
                        className={inputCls}
                    >
                        <option value="">Sélectionner…</option>
                        {DELEGATAIRES.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.nom} - {d.fonction}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Motif">
                    <input
                        type="text"
                        value={motif}
                        onChange={(e) => setMotif(e.target.value)}
                        placeholder="Ex: Congé annuel"
                        className={inputCls}
                    />
                </FormField>

                <FormField label="Date de début" required>
                    <input
                        type="date"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                        className={inputCls}
                    />
                </FormField>

                <FormField label="Date de fin" required>
                    <input
                        type="date"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                        className={inputCls}
                    />
                </FormField>
            </div>

            <FormField label="Portée">
                <div className="flex flex-col gap-1.5">
                    {PORTEES_DELEGATION.map((p) => (
                        <label
                            key={p.key}
                            className={`flex items-start gap-2.5 p-2.5 rounded-lg cursor-pointer transition
                                ${p.disabled
                                    ? 'bg-epo-slate-100 opacity-60 cursor-not-allowed'
                                    : 'bg-white hover:bg-epo-slate-50'}
                            `}
                        >
                            <input
                                type="checkbox"
                                checked={portees.includes(p.key)}
                                onChange={() => !p.disabled && togglePortee(p.key)}
                                disabled={p.disabled}
                                className="w-4 h-4 mt-0.5 accent-epo-green-500"
                            />
                            <div className="flex-1">
                                <div className="text-[13px] font-medium text-epo-slate-800">
                                    {p.label}
                                </div>
                                {p.note && (
                                    <div className="text-[11px] text-epo-slate-500 mt-0.5">
                                        {p.note}
                                    </div>
                                )}
                            </div>
                        </label>
                    ))}
                </div>
            </FormField>

            <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={onCancel}>
                    Annuler
                </Button>
                <Button variant="primary" icon="fa-check">
                    Créer la délégation
                </Button>
            </div>
        </div>
    );
}

/* ============================================================
   4. VUES SAUVEGARDÉES
   ============================================================ */

function SectionVues() {
    return (
        <ParametrageSection
            icon="fa-bookmark"
            title="Mes vues sauvegardées"
            description="Filtres préenregistrés pour un accès rapide"
            badge={`${VUES_SAUVEGARDEES.length} vues`}
        >
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {VUES_SAUVEGARDEES.map((v) => (
                    <div
                        key={v.id}
                        className="flex items-center gap-3 p-3 transition bg-white border rounded-lg group border-epo-slate-200 hover:shadow-soft hover:border-epo-green-300"
                    >
                        <span className={`flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-lg ${v.couleur}`}>
                            <i className={`fas ${v.icone}`} />
                        </span>

                        <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold truncate text-epo-slate-800">
                                {v.nom}
                            </div>
                            <div className="text-[11.5px] text-epo-slate-500 truncate">
                                {v.cible} · {v.filtres}
                            </div>
                        </div>

                        <div className="flex items-center flex-shrink-0 gap-1 opacity-0 group-hover:opacity-100">
                            <button
                                className="px-2 py-1 text-[11.5px] font-medium rounded text-epo-green-600 hover:bg-epo-green-50"
                                title="Ouvrir"
                            >
                                Ouvrir
                            </button>
                            <button
                                className="px-2 py-1 text-[11.5px] font-medium rounded text-epo-slate-600 hover:bg-epo-slate-100"
                                title="Renommer"
                            >
                                <i className="fas fa-pen text-[10px]" />
                            </button>
                            <button
                                className="px-2 py-1 text-[11.5px] font-medium rounded text-epo-red-600 hover:bg-epo-red-50"
                                title="Supprimer"
                            >
                                <i className="fas fa-trash text-[10px]" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </ParametrageSection>
    );
}

/* ============================================================
   5. LISTES DE DIFFUSION
   ============================================================ */

function SectionListesDiffusion() {
    return (
        <ParametrageSection
            icon="fa-paper-plane"
            title="Mes listes de diffusion"
            description="Groupes de destinataires pour vos notes et courriers"
            badge={`${LISTES_DIFFUSION.length} listes`}
        >
            <div className="flex flex-col gap-2">
                {LISTES_DIFFUSION.map((l) => (
                    <div
                        key={l.id}
                        className="flex items-center gap-3 p-3 transition bg-white border rounded-lg group border-epo-slate-200 hover:shadow-soft"
                    >
                        <span className="flex items-center justify-center flex-shrink-0 rounded-lg w-9 h-9 bg-epo-slate-100 text-epo-slate-600">
                            <i className={`fas ${l.icone}`} />
                        </span>
                        <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold truncate text-epo-slate-800">
                                {l.nom}
                            </div>
                            <div className="text-[11.5px] text-epo-slate-500 truncate">
                                {l.description}
                            </div>
                        </div>
                        <span className="flex-shrink-0 text-[11.5px] font-semibold tabular-nums text-epo-slate-500">
                            {l.destinataires} dest.
                        </span>
                        <button className="flex-shrink-0 text-[12px] font-medium text-epo-green-600 hover:underline">
                            Éditer
                        </button>
                    </div>
                ))}
            </div>

            <button className="flex items-center justify-center w-full gap-2 py-3 mt-3 text-[13px] font-semibold transition border-2 border-dashed rounded-lg border-epo-slate-300 text-epo-slate-600 hover:border-epo-green-400 hover:bg-epo-green-50 hover:text-epo-green-700">
                <i className="fas fa-plus" />
                Nouvelle liste
            </button>
        </ParametrageSection>
    );
}

/* ============================================================
   6. DESTINATAIRES FAVORIS
   ============================================================ */

function SectionDestinatairesFavoris() {
    return (
        <ParametrageSection
            icon="fa-star"
            title="Destinataires favoris"
            description="Raccourcis vers vos contacts fréquents"
            badge={`${DESTINATAIRES_FAVORIS.length} favoris`}
        >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {DESTINATAIRES_FAVORIS.map((f) => (
                    <div
                        key={f.id}
                        className="flex items-center gap-2.5 p-3 bg-white border rounded-lg group border-epo-slate-200 hover:shadow-soft"
                    >
                        <div className="flex items-center justify-center flex-shrink-0 text-[11px] font-bold rounded-full w-9 h-9 bg-epo-slate-100 text-epo-slate-600">
                            {f.nom.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[12.5px] font-semibold truncate text-epo-slate-800">
                                {f.nom}
                            </div>
                            <div className="text-[11px] text-epo-slate-500 truncate">
                                {f.fonction}
                            </div>
                        </div>
                        <button
                            className="flex-shrink-0 text-[11px] text-epo-red-500 opacity-0 group-hover:opacity-100 transition"
                            title="Retirer des favoris"
                        >
                            <i className="fas fa-times" />
                        </button>
                    </div>
                ))}
            </div>
        </ParametrageSection>
    );
}

/* ============================================================
   7. AGENDA & INDISPONIBILITÉS
   ============================================================ */

function SectionAgenda() {
    const [indispos, setIndispos] = useState(INDISPONIBILITES);

    return (
        <ParametrageSection
            icon="fa-calendar-alt"
            title="Agenda & indisponibilités"
            description="Congés, missions, absences - active votre mode intérim"
            badge={`${indispos.filter((i) => i.active).length} active${indispos.filter((i) => i.active).length > 1 ? 's' : ''}`}
            badgeVariant={indispos.some((i) => i.active) ? 'warning' : 'default'}
        >
            <div className="flex flex-col gap-2">
                {indispos.map((i) => (
                    <div
                        key={i.id}
                        className={`flex items-center gap-3 p-3 border rounded-lg transition
                            ${i.active
                                ? 'bg-epo-yellow-50 border-epo-yellow-200'
                                : 'bg-white border-epo-slate-200'}
                        `}
                    >
                        <span className={`flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-lg
                            ${i.active ? 'bg-epo-yellow-100 text-epo-yellow-700' : 'bg-epo-slate-100 text-epo-slate-600'}
                        `}>
                            <i className={`fas ${i.type === 'conge' ? 'fa-umbrella-beach' : i.type === 'mission' ? 'fa-route' : 'fa-calendar-minus'}`} />
                        </span>
                        <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold truncate text-epo-slate-800">
                                {i.label}
                            </div>
                            <div className="text-[11.5px] text-epo-slate-500">
                                Du {new Date(i.dateDebut).toLocaleDateString('fr-FR')} au {new Date(i.dateFin).toLocaleDateString('fr-FR')}
                                {i.delegataire && ` · Délégation à ${i.delegataire}`}
                            </div>
                        </div>
                        <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10.5px] font-semibold
                            ${i.active ? 'bg-epo-green-50 text-epo-green-700' : 'bg-epo-slate-100 text-epo-slate-600'}
                        `}>
                            {i.active ? 'Active' : 'Planifiée'}
                        </span>
                        <button className="flex-shrink-0 text-[12px] font-medium text-epo-slate-600 hover:underline">
                            Modifier
                        </button>
                    </div>
                ))}
            </div>

            <button className="flex items-center justify-center w-full gap-2 py-3 mt-3 text-[13px] font-semibold transition border-2 border-dashed rounded-lg border-epo-slate-300 text-epo-slate-600 hover:border-epo-green-400 hover:bg-epo-green-50 hover:text-epo-green-700">
                <i className="fas fa-plus" />
                Ajouter une indisponibilité
            </button>
        </ParametrageSection>
    );
}

/* ============================================================
   8. MAQUETTES FAVORITES
   ============================================================ */

function SectionMaquettes() {
    return (
        <ParametrageSection
            icon="fa-file-signature"
            title="Mes maquettes favorites"
            description="Accès rapide aux actes que vous produisez souvent"
            badge={`${MAQUETTES_FAVORITES.length} maquettes`}
        >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {MAQUETTES_FAVORITES.map((m) => (
                    <div
                        key={m.id}
                        className="flex items-center gap-3 p-3 transition bg-white border rounded-lg group border-epo-slate-200 hover:shadow-soft hover:border-epo-green-300"
                    >
                        <span className="flex items-center justify-center flex-shrink-0 rounded-lg w-9 h-9 bg-epo-green-50 text-epo-green-600">
                            <i className="fas fa-file-alt" />
                        </span>
                        <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold truncate text-epo-slate-800">
                                {m.nom}
                            </div>
                            <div className="text-[11.5px] font-mono text-epo-slate-500">
                                {m.prefix}-2026-XXXX
                            </div>
                        </div>
                        <button className="flex-shrink-0 text-[12px] font-medium text-epo-green-600 hover:underline">
                            Utiliser
                        </button>
                    </div>
                ))}
            </div>
        </ParametrageSection>
    );
}

/* ============================================================
   9. SIGNATURE PAR DÉLÉGATION
   ============================================================ */

function SectionSignature() {
    return (
        <ParametrageSection
            icon="fa-stamp"
            title="Signature par délégation"
            description="Mention réglementaire apposée lors d'une signature par délégation"
            badge="Configurée"
            badgeVariant="success"
        >
            <div className="p-4 border rounded-lg bg-epo-slate-50 border-epo-slate-200">
                <div className="text-[10.5px] font-semibold tracking-wider uppercase text-epo-slate-400 mb-2">
                    Mention réglementaire (§7.1, RG-22)
                </div>
                <div className="text-[13.5px] italic font-medium text-epo-slate-800">
                    « {SIGNATURE_DELEGATION.mention} »
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-3">
                <FormField label="Prénom & Nom">
                    <input
                        type="text"
                        defaultValue={SIGNATURE_DELEGATION.prenomNom}
                        className={inputCls}
                    />
                </FormField>
                <FormField label="Fonction">
                    <input
                        type="text"
                        defaultValue={SIGNATURE_DELEGATION.fonction}
                        className={inputCls}
                    />
                </FormField>
                <FormField label="Signataire depuis">
                    <input
                        type="text"
                        defaultValue={new Date(SIGNATURE_DELEGATION.signataireDepuis).toLocaleDateString('fr-FR')}
                        disabled
                        className={`${inputCls} opacity-60 cursor-not-allowed`}
                    />
                </FormField>
            </div>

            <div className="flex items-start gap-2 p-3 mt-3 border rounded-lg bg-epo-yellow-50 border-epo-yellow-200">
                <i className="fas fa-exclamation-triangle text-epo-yellow-600 mt-0.5" />
                <div className="text-[12px] text-epo-yellow-800">
                    La modification de cette mention doit être conforme au texte officiel de délégation en vigueur.
                </div>
            </div>
        </ParametrageSection>
    );
}

/* ============================================================
   HELPERS
   ============================================================ */

const inputCls = `
    w-full px-3 py-2.5 border border-epo-slate-300 rounded-lg
    text-[13.5px] text-epo-slate-800 bg-white
    focus:outline-none focus:border-epo-green-500
    focus:ring-2 focus:ring-epo-green-500/10
`;

function FormField({ label, required, children }) {
    return (
        <div>
            <label className="block text-[12.5px] font-medium text-epo-slate-700 mb-1.5">
                {label}
                {required && <span className="ml-1 text-epo-red-500">*</span>}
            </label>
            {children}
        </div>
    );
}