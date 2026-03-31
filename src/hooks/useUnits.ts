import { useContext } from 'react';
import { UnitsContext } from '../context/units-context';

export function useUnits() {
  const context = useContext(UnitsContext);

  if (!context) {
    throw new Error('useUnits must be used inside UnitsProvider');
  }

  return context;
}
