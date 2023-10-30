import React from 'react';
import {
  AlertOctagon,
  AlertTriangle, CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';
import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({variant, handleClose, children}) {

  // I think it would be better if we could use a Type in typescript to limit
  // the possible values here.
  const styleVariant = styles[variant] || styles.notice;
  const Icon = ICONS_BY_VARIANT[variant] || Info;

  return (
    <div className={`${styles.toast} ${styleVariant}`}>
      <div className={styles.iconContainer}>
        <Icon size={24}/>
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant} -</VisuallyHidden>
        {children}
      </p>
      <button
        className={styles.closeButton}
        onClick={handleClose}
        aria-label="Dismiss message"
        aria-live="off"
      >
        <X size={24} />
      </button>
    </div>
  );
}

export default Toast;
