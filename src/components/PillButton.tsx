import React, { MouseEventHandler } from 'react';

import style from '../scss/PillButton.module.scss';

interface PillButtonProps {
  text?: string;
  active: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}
function PillButton({ text, active, children, onClick }: PillButtonProps) {
  return (
    <button
      onClick={() => {
        if (onClick) onClick();
      }}
      className={`${style.pill_button} ${active ? style.active : ''} ${
        onClick && style.clickable
      }`}
      data-testid="request-category"
    >
      {text || children}
    </button>
  );
}
export default PillButton;
