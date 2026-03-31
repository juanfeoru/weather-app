import { createContext } from 'react';

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindUnit = 'kmh' | 'mph';
export type PrecipitationUnit = 'mm' | 'inches';

export interface UnitsContextType {
  temperature: TemperatureUnit;
  wind: WindUnit;
  setTemperature: (unit: TemperatureUnit) => void;
  setWind: (unit: WindUnit) => void;
  precipitation: PrecipitationUnit;
  setPrecipitation: (unit: PrecipitationUnit) => void;
}

export const UnitsContext = createContext<UnitsContextType | undefined>(
  undefined,
);
