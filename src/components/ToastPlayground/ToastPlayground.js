import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import ToastShelf from "../ToastShelf";
import {DEFAULT_VARIANT, VARIANT_OPTIONS} from "../../consts";
import {ToastContext} from "../ToastProvider";

function ToastPlayground() {

  const { createToast } = React.useContext(ToastContext);

  const [toastMsg, setToastMsg] = React.useState("");
  const [variant, setVariant] = React.useState(DEFAULT_VARIANT);

  const msgRef = React.useRef();

  const handleVariantChange = (event) => {
    setVariant(event.target.value);
  }

  const addToast = (event) => {
    event.preventDefault();
    const newToast = {
      variant,
      toastMsg,
    }
    createToast(newToast)

    setVariant(DEFAULT_VARIANT)
    setToastMsg("");
    msgRef.current?.focus();
  }


  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png"/>
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form className={styles.controlsWrapper} onSubmit={(e) => addToast(e)}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{alignSelf: 'baseline'}}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message"
                      className={styles.messageInput}
                      value={toastMsg}
                      onChange={
                        (e) =>
                          setToastMsg(e.target.value)
                      }
                      ref={msgRef}
            />
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
            <Button onClick={(e) => addToast(e)}>Pop Toast!</Button>
          </div>
        </div>
      </form>
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
