import React from 'react';
import {DEFAULT_VARIANT} from "../../consts";
import {useEscapeKey} from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext();


function ToastProvider({children}) {

    const [toasts, setToasts] = React.useState([]);

    useEscapeKey(() => setToasts([]));


    const createToast = React.useCallback(({toastMsg, variant = DEFAULT_VARIANT}) => {
        const newToast = {
            id: crypto.randomUUID(),
            variant,
            msg: toastMsg,
        }

        setToasts((toasts) => (
            [...toasts, newToast]
        ))
    }, []);

    const deleteToast = React.useCallback((id) => {
        setToasts((toasts) => (
            toasts.filter((t) => t.id !== id)
        ))
    }, [])

    return <ToastContext.Provider value={{
        toasts,
        createToast,
        deleteToast
    }}>
        {children}
    </ToastContext.Provider>;
}

export default ToastProvider;
