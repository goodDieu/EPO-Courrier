// src/components/scc/PieceUploader.jsx
import { useState } from 'react';

export default function PieceUploader({ pieces, onChange, max = 10 }) {
    const [dragOver, setDragOver] = useState(false);

    const ajouter = () => {
        if (pieces.length >= max) return;
        onChange([
            ...pieces,
            {
                id: `piece-${Date.now()}`,
                nom: `Document_${pieces.length + 1}.pdf`,
                taille: '245 Ko',
                type: 'pdf',
            },
        ]);
    };

    const retirer = (id) => {
        onChange(pieces.filter((p) => p.id !== id));
    };

    return (
        <div>
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    ajouter();
                }}
                onClick={ajouter}
                className={`
                    border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
                    ${dragOver
                        ? 'border-epo-green-500 bg-epo-green-50'
                        : 'border-epo-slate-300 hover:border-epo-green-400 hover:bg-epo-slate-50'}
                `}
            >
                <i className="block mb-2 text-3xl fas fa-cloud-upload-alt text-epo-slate-400" />
                <div className="text-[13px] font-medium text-epo-slate-700">
                    Glissez-déposez vos fichiers ici ou cliquez pour parcourir
                </div>
                <div className="text-[11.5px] text-epo-slate-400 mt-1">
                    PDF, Word, Excel, JPG - Max 10 Mo · {pieces.length} / {max} pièces
                </div>
                <div className="text-[11px] text-epo-slate-400 mt-1 italic">
                    <i className="mr-1 fas fa-info-circle" />
                    En V1, le scan est géré par le client Tauri
                </div>
            </div>

            {pieces.length > 0 && (
                <div className="mt-3 flex flex-col gap-1.5">
                    {pieces.map((p) => (
                        <div
                            key={p.id}
                            className="flex items-center gap-2.5 p-2.5 bg-epo-slate-50 border border-epo-slate-200 rounded-lg"
                        >
                            <i className="fas fa-file-pdf text-epo-red-500" />
                            <div className="flex-1 min-w-0">
                                <div className="text-[12.5px] font-medium text-epo-slate-800 truncate">
                                    {p.nom}
                                </div>
                                <div className="text-[10.5px] text-epo-slate-500">
                                    {p.taille} · PDF
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    retirer(p.id);
                                }}
                                className="flex items-center justify-center w-6 h-6 transition rounded-full text-epo-slate-500 hover:bg-epo-red-100 hover:text-epo-red-600"
                            >
                                <i className="fas fa-times text-[11px]" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}