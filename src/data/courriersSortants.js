/**
 * Étapes du circuit d'un courrier sortant (section 9.2 du CDG).
 * L'ordre est important : il sert à calculer la position courante.
 * L'état "Rejeté" est traité comme un cas spécial.
 */
export const ETAPES_SORTANT = [
    'Brouillon',
    'Soumis SHI',
    'Chez SG (amendement)',
    'Vu bon à signer',
    'Chez DG',
    'Signé',
];

/**
 * KPI affichés en haut de la page.
 */
export const KPIS_SORTANTS = [
    {
        id: 'kpi-brouillons',
        label: 'Brouillons / soumis SHI',
        value: 3,
        variant: 'default',
        icon: 'fa-pen',
    },
    {
        id: 'kpi-chez-sg',
        label: 'Chez SG (amendement)',
        value: 4,
        variant: 'urgent',
        icon: 'fa-user-check',
    },
    {
        id: 'kpi-vu-bon',
        label: 'Vu bon à signer / chez DG',
        value: 2,
        variant: 'warning',
        icon: 'fa-hourglass-half',
    },
    {
        id: 'kpi-signes',
        label: 'Signés ce mois',
        value: 19,
        variant: 'success',
        icon: 'fa-check-double',
    },
];

/**
 * Registre des départs.
 */
export const COURRIERS_SORTANTS = [
    {
        id: '2026-0452',
        objet: 'Réponse à la demande de subvention exceptionnelle',
        destinataire: 'Direction des Finances',
        classification: 'Urgent',
        etat: 'Chez SG (amendement)',
        criticite: 'Échéance J-1 - critique',
        criticiteColor: 'red',
        reponse: true,
        pieces: ["Courrier d'origine N°2026-0452 (entrant)", 'Budget prévisionnel.pdf', 'Avis SG.pdf'],
    },
    {
        id: '2026-0448',
        objet: "Décision d'engagement - assistant IGIT",
        destinataire: 'DRH / candidat retenu',
        classification: 'Ordinaire',
        etat: 'Signé',
        criticite: 'Traité dans les délais',
        criticiteColor: 'green',
        reponse: false,
        pieces: ['Dossier de candidature', 'PV de sélection'],
        archive: true,
    },
    {
        id: '2026-0446',
        objet: "Bordereau d'envoi - convention DCPIP",
        destinataire: 'Université de Lyon',
        classification: 'Confidentiel / réservé',
        etat: 'Vu bon à signer',
        criticite: 'Échéance J-3 - sensible',
        criticiteColor: 'red',
        reponse: false,
        pieces: ['Convention (2 exemplaires)'],
    },
    {
        id: '2026-0441',
        objet: 'Ordre de mission - atelier PRMP',
        destinataire: 'M. OUÉDRAOGO Issa',
        classification: 'Ordinaire',
        etat: 'Chez DG',
        criticite: 'Échéance J+1',
        criticiteColor: 'amber',
        reponse: false,
        pieces: [],
    },
    {
        id: '2026-0439',
        objet: 'Réponse à convocation - comité de direction',
        destinataire: 'Ministère de tutelle',
        classification: 'Urgent',
        etat: 'Soumis SHI',
        criticite: 'Échéance J',
        criticiteColor: 'amber',
        reponse: true,
        pieces: ["Courrier d'origine N°2026-0431 (entrant)"],
    },
    {
        id: '2026-0435',
        objet: 'Certificat de travail - M. TRAORÉ',
        destinataire: 'M. TRAORÉ',
        classification: 'Ordinaire',
        etat: 'Brouillon',
        criticite: 'Échéance J+6',
        criticiteColor: 'green',
        reponse: false,
        pieces: [],
    },
    {
        id: '2026-0398',
        objet: 'Réponse au courrier du Ministère N°2026-0182',
        destinataire: "Ministère de l'Enseignement Supérieur",
        classification: 'Urgent',
        etat: 'Rejeté',
        criticite: 'Délai dépassé - à relancer',
        criticiteColor: 'red',
        reponse: true,
        pieces: ["Courrier d'origine Ministère N°2026-0182"],
        motif: 'À reformuler selon les directives du Ministère (rejeté par le DG le 18/08/2026)',
    },
    {
        id: '2026-0389',
        objet: 'Note interne - campagne de sensibilisation sécurité',
        destinataire: 'Toutes structures',
        classification: 'Ordinaire',
        etat: 'Signé',
        criticite: 'Diffusé dans les délais',
        criticiteColor: 'green',
        reponse: false,
        pieces: [],
        archive: true,
    },
];

/**
 * Détail d'un courrier sortant pour la page de rédaction.
 * (Utilisé pour l'exemple - à remplacer par un appel API plus tard.)
 */
export const DEPART_DETAIL = {
    id: 'DEP-2026-0410',
    version: 3,
    objet: "Réponse au courrier du Ministère",
    destinataire: "Ministère de l'Enseignement Supérieur, de la Recherche et de l'Innovation",
    reference: "Courrier entrant N°2026-0182 - 12/08/2026",
    etat: 'Chez SG (amendement)',
    initiateur: 'SG',
    statutLabel: 'En cours de rédaction - Amendement SG',
    statutDesc: 'Document en attente de finalisation avant soumission au SHI',
    dateModification: '24/08/2026 09:15',
    auteurModification: 'KABORÉ Aminata',
    caractères: 1247,
    corps: `<p style="text-align:right;margin-bottom:24px;">Ouagadougou, le 24 août 2026</p>
<p style="margin-bottom:20px;"><strong>À l'attention de Monsieur le Ministre</strong><br>Ministère de l'Enseignement Supérieur,<br>de la Recherche et de l'Innovation<br>Ouagadougou</p>
<p style="margin-bottom:16px;"><strong>Objet :</strong> Réponse au courrier N°2026-0182 du 12 août 2026 relatif à l'organisation du colloque international 2026.</p>
<p style="margin-bottom:16px;">Monsieur le Ministre,</p>
<p style="margin-bottom:16px;text-align:justify;">Par courrier référencé en objet, votre Ministère a bien voulu solliciter l'avis de l'École Polytechnique de Ouagadougou sur l'organisation du colloque international prévu pour l'année 2026.</p>
<p style="margin-bottom:16px;text-align:justify;">J'ai l'honneur de vous informer que l'École Polytechnique de Ouagadougou marque son accord de principe pour sa participation à cet événement, et se tient à votre disposition pour toute contribution scientifique et logistique que vous jugerez utile.</p>
<p style="margin-bottom:16px;text-align:justify;">Une note détaillée précisant les modalités de cette participation vous sera transmise dans les meilleurs délais.</p>
<p style="margin-bottom:24px;">Je vous prie d'agréer, Monsieur le Ministre, l'expression de ma haute considération.</p>
<p style="text-align:right;margin-top:40px;"><strong>Le Directeur Général</strong><br><span style="color:#64748b;font-style:italic;">[Signature]</span></p>`,
    fonds: [
        { id: 'f1', type: 'pdf', nom: 'Courrier entrant 2026-0182.pdf', meta: '248 Ko · 12/08/2026' },
        { id: 'f2', type: 'word', nom: 'Note interne projet colloque.docx', meta: '156 Ko · 15/08/2026' },
        { id: 'f3', type: 'img', nom: 'Annexe - Programme prévisionnel.jpg', meta: '892 Ko · 15/08/2026' },
    ],
    commentaires: [
        {
            id: 'c1',
            auteur: 'OUÉDRAOGO Issa',
            type: 'dg',
            texte: "Le projet doit mentionner explicitement notre accord pour la contribution scientifique uniquement.",
            date: '22/08/2026 16:45',
        },
        {
            id: 'c2',
            auteur: 'KABORÉ Aminata',
            type: 'fond',
            texte: "Le courrier entrant fait bien référence à une demande d'avis. La réponse doit donc être formulée comme un avis et non une simple information.",
            date: '23/08/2026 10:20',
        },
        {
            id: 'c3',
            auteur: 'KABORÉ Aminata',
            type: 'forme',
            texte: "Reformuler la formule de politesse finale selon le modèle en vigueur pour les correspondances ministérielles.",
            date: '23/08/2026 10:22',
        },
    ],
};