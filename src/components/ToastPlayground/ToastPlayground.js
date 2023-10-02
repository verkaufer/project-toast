import React from 'react';

import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
} from "react-feather";

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import ToastShelf from "../ToastShelf";

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

const DEFAULT_VARIANT = "notice";

function ToastPlayground() {

  const [toastMsg, setToastMsg] = React.useState("");
  const [variant, setVariant] = React.useState(DEFAULT_VARIANT);
  const [toasts, setToasts] = React.useState([]);

  const handleVariantChange = (event) => {
    setVariant(event.target.value);
  }

  const createToast = () => {

    const newToast = {
      id:  crypto.randomUUID(),
      variant,
      msg: toastMsg,
    }

    setToasts((toasts) => (
      [...toasts, newToast]
    ))

    setVariant(DEFAULT_VARIANT)
    setToastMsg("");
  }

  const removeToast = (id) => {
    setToasts((toasts) => (
      toasts.filter((t) => t.id !== id)
    ))
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png"/>
        <h1>Toast Playground</h1>
      </header>

      {<ToastShelf toasts={toasts} removeToast={removeToast}/>}

      {/* TODO: ADD FORM WRAPPER TAGS */}
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
            <textarea id="message" className={styles.messageInput} value={toastMsg}
                      onChange={(e) => setToastMsg(e.target.value)}/>
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
            <Button onClick={() => createToast()}>Pop Toast!</Button>
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
