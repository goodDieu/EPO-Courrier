// src/data/sccContext.js
// Accès aux données partagées du Service Courrier (voir SccStore.jsx).
import { createContext, useContext } from 'react';

export const SccContext = createContext(null);

export function useScc() {
    const ctx = useContext(SccContext);
    if (!ctx) throw new Error('useScc doit être utilisé dans <SccProvider>');
    return ctx;
}
