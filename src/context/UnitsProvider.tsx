import { useState } from 'react';
import { UnitsContext } from './units-context';
import type {
  TemperatureUnit,
  WindUnit,
  PrecipitationUnit,
} from './units-context';

export function UnitsProvider({ children }: { children: React.ReactNode }) {
  const [temperature, setTemperature] = useState<TemperatureUnit>('celsius');
  const [wind, setWind] = useState<WindUnit>('kmh');
  const [precipitation, setPrecipitation] = useState<PrecipitationUnit>('mm');

  return (
    <UnitsContext.Provider
      value={{
        temperature,
        wind,
        setTemperature,
        setWind,
        precipitation,
        setPrecipitation,
      }}
    >
      {children}
    </UnitsContext.Provider>
  );
}
