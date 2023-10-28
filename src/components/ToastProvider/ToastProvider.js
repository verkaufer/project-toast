import React from 'react';
import {DEFAULT_VARIANT} from "../../consts";

export const ToastContext = React.createContext();


function ToastProvider({children}) {

    const [toasts, setToasts] = React.useState([]);

    /** Clear Toasts when user presses Escape key */
    React.useEffect(() => {

        function handleKeyUp (ev) {
            // compat: Firefox 36 and earlier maps Escape key to `Esc`
            if(ev.key === "Escape" || ev.key === "Esc") {
                setToasts(() => ([]));
            }
        }
        document.addEventListener("keyup", handleKeyUp)
        return () => (document.removeEventListener("keyup", handleKeyUp))
    }, [])

    const createToast = React.useCallback(({toastMsg, variant = DEFAULT_VARIANT}) => {
        const newToast = {
            id: crypto.randomUUID(),
            variant,
            msg: toastMsg,
        }

        setToasts((toasts) => (
            [...toasts, newToast]
        ))
    }, [toasts]);

    const deleteToast = React.useCallback((id) => {
        setToasts((toasts) => (
            toasts.filter((t) => t.id !== id)
        ))
    }, [toasts])

    return <ToastContext.Provider value={{
        toasts,
        createToast,
        deleteToast
    }}>
        {children}
    </ToastContext.Provider>;
}

export default ToastProvider;
