import React from 'react';
import {
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';
import styles from './Toast.module.css';


function Toast({className, icon: Icon, handleClose, children}) {

  // I think it would be better if we could use a Type in typescript to limit
  // the possible values here.
  const styleVariant = styles[className] || styles.notice;

  return (
    <div className={`${styles.toast} ${styleVariant}`}>
      <div className={styles.iconContainer}>
        <Icon size={24}/>
      </div>
      <p className={styles.content}>
        {children}
      </p>
      <button className={styles.closeButton} onClick={handleClose}>
        <X size={24} />
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );
}

export default Toast;
