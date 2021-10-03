import React from 'react';

import style from './PillButton.module.scss';

interface PillButtonProps {
  text?: string;
  active: boolean;
  children?: React.ReactNode;
  onClick: () => void;
  clickable: boolean;
}
function PillButton({
  text,
  active,
  children,
  clickable,
  onClick,
}: PillButtonProps) {
  return (
    <button
      onClick={() => onClick()}
      className={`${style.pill_button} ${active ? style.active : ''} ${
        clickable ? style.clickable : ''
      }`}
    >
      {text || children}
    </button>
  );
}
export default PillButton;
