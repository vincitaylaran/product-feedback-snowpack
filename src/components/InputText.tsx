import React from 'react';
import styles from '../scss/InputText.module.scss';

interface InputTextProps {
  placeholder: string;
  showError?: boolean;
  value?: string;
  onValueChange: (value: string) => void;
}

function InputText({
  placeholder,
  showError,
  value,
  onValueChange,
}: InputTextProps) {
  return (
    <div className={styles.inputTxt}>
      <textarea
        className={`${styles.text} ${showError && styles.error}`}
        placeholder={placeholder}
        value={value && value}
        onChange={(e) => onValueChange(e.target.value)}
      />
      {showError && <p className={styles.errorMsg}>Can't be empty</p>}
    </div>
  );
}

export default InputText;
