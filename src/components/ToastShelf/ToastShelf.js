import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';
import {ToastContext} from "../ToastProvider";

function ToastShelf() {

  const {toasts, deleteToast} = React.useContext(ToastContext)

  return (
    <ol className={styles.wrapper}>
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast variant={toast.variant} handleClose={() => deleteToast(toast.id)}>{toast.msg}</Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
