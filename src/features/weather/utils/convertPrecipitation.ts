export function convertPrecipitation(value: number, unit: string) {
  if (unit === 'inches') {
    return value * 0.0393701;
  }
  return value;
}
