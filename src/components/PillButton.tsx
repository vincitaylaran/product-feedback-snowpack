import React, { MouseEventHandler } from 'react';

import style from './PillButton.module.scss';

interface PillButtonProps {
  text?: string;
  active: boolean;
  children?: React.ReactNode;
  onClick: () => void;
}
function PillButton({ text, active, children, onClick }: PillButtonProps) {
  return (
    <button
      onClick={() => onClick()}
      className={`${style.pill_button} ${active ? style.active : ''}`}
    >
      {text || children}
    </button>
  );
}
export default PillButton;
