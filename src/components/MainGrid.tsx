import React from 'react';
import style from '../scss/MainGrid.module.scss';

interface MainGridProps {
  children: React.ReactNode;
}

function MainGrid({ children }: MainGridProps) {
  return <div className={style.maingrid}>{children}</div>;
}

export default MainGrid;
