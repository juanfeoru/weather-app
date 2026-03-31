export function convertWindSpeed(speed: number, unit: string) {
  if (unit === 'mph') {
    return speed * 0.621371;
  }
  return speed;
}
