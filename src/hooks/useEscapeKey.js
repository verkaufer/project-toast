import React from "react";


/**
 * Executes provided callback whenever the user presses the Escape key.
 * @param callback {function():void} Function executed after observing "keyup" event
 */
export const useEscapeKey = (callback) => {

    // assign callback to a ref so react doesn't clear the function on re-render
    // if some other state changes.
    const cb = React.useRef();

    React.useEffect(() => {
        cb.current = callback;
    }, [callback])

    React.useEffect(() => {
        function handleKeyUp (ev) {
            if(!cb.current) {
                return;
            }
            // compat: Firefox 36 and earlier maps Escape key to `Esc`
            if(escapeKeyPressed(ev)) {
                cb.current()
            }
        }
        document.addEventListener("keyup", handleKeyUp)
        return () => (document.removeEventListener("keyup", handleKeyUp))
    }, [])

}

/**
 * Returns whether event was triggered by user pressing Escape key.
 * @param kbEvent {KeyboardEvent} The "keyup" KeyboardEvent observed by listener
 * @return boolean
 */
const escapeKeyPressed = ({key}) => key === "Escape" || key === "Esc";