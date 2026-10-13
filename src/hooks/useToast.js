// src/hooks/useToast.js
import { useState, useCallback } from 'react';

let toastIdCounter = 0;

export function useToast() {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((toast) => {
        const id = ++toastIdCounter;
        setToasts((prev) => [...prev, { id, ...toast }]);
        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const success = useCallback(
        (title, options = {}) => addToast({ variant: 'success', title, ...options }),
        [addToast]
    );

    const error = useCallback(
        (title, options = {}) => addToast({ variant: 'error', title, ...options }),
        [addToast]
    );

    const warning = useCallback(
        (title, options = {}) => addToast({ variant: 'warning', title, ...options }),
        [addToast]
    );

    const info = useCallback(
        (title, options = {}) => addToast({ variant: 'info', title, ...options }),
        [addToast]
    );

    return {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info,
    };
}