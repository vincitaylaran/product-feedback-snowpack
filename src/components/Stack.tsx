import React from 'react';
import style from './Stack.module.scss';

interface StackProps {
  children: React.ReactNode;
}
function Stack({ children }: StackProps) {
  return <div className={style.stack}>{children}</div>;
}

export default Stack;
