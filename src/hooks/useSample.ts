import { useState } from 'react';

export function useIncrement(initValue: number) {
  const [count, setCount] = useState<number>(initValue);

  return { count, setCount };
}
