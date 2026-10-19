// src/data/circuitContext.js
// Accès aux dossiers en circulation (voir CircuitStore.jsx).
import { createContext, useContext } from 'react';

export const CircuitContext = createContext(null);

export function useCircuit() {
    const ctx = useContext(CircuitContext);
    if (!ctx) throw new Error('useCircuit doit être utilisé dans <CircuitProvider>');
    return ctx;
}
