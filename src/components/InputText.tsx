import React from 'react';
import styles from '../scss/InputText.module.scss';

interface InputTextProps {
  placeholder: string;
  showError?: boolean;
}

function InputText({ placeholder, showError }: InputTextProps) {
  return (
    <div className={styles.inputTxt}>
      <input
        className={`${styles.text} ${showError && styles.error}`}
        placeholder={placeholder}
        type="text"
      />
      {showError && <p className={styles.errorMsg}>Can't be empty</p>}
    </div>
  );
}

export default InputText;
