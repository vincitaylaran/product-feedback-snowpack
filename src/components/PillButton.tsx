import React from 'react';

import style from './PillButton.module.scss';

interface PillButtonProps {
  text?: string;
  active: boolean;
  children?: React.ReactNode;
}
function PillButton({ text, active, children }: PillButtonProps) {
  return (
    <button className={`${style.pill_button} ${active ? style.active : ''}`}>
      {text || children}
    </button>
  );
}
export default PillButton;
