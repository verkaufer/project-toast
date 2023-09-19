import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {

    const [toastMsg, setToastMsg] = React.useState("");
    const [variant, setVariant] = React.useState("notice");

    const handleVariantChange = (event) => {
        setVariant(event.target.value);
    }

    return (
        <div className={styles.wrapper}>
            <header>
                <img alt="Cute toast mascot" src="/toast.png"/>
                <h1>Toast Playground</h1>
            </header>

            <div className={styles.controlsWrapper}>
                <div className={styles.row}>
                    <label
                        htmlFor="message"
                        className={styles.label}
                        style={{alignSelf: 'baseline'}}
                    >
                        Message
                    </label>
                    <div className={styles.inputWrapper}>
            <textarea id="message" className={styles.messageInput} value={toastMsg} onChange={(e) => setToastMsg(e.target.value)}/>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.label}>Variant</div>
                    <div
                        className={`${styles.inputWrapper} ${styles.radioWrapper}`}
                    >
                        {VARIANT_OPTIONS.map((v) => (
                            <ToastVariant key={v} variant={v} selected={v === variant} onSelect={handleVariantChange}/>
                        ))}
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.label}/>
                    <div
                        className={`${styles.inputWrapper} ${styles.radioWrapper}`}
                    >
                        <Button>Pop Toast!</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ToastVariant = ({variant, onSelect, selected}) => {
    const id = `variant-${variant.toLowerCase()}`;
    return (
        <label htmlFor={id}>
            <input
                id={id}
                type="radio"
                name="variant"
                value={variant}
                checked={selected}
                onChange={onSelect}
            />
            {variant}
        </label>

    )
}

export default ToastPlayground;
