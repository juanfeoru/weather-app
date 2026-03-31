import iconDrizzle from '../../../assets/images/icon-drizzle.webp';
import iconRain from '../../../assets/images/icon-rain.webp';
import iconSnow from '../../../assets/images/icon-snow.webp';
import iconStorm from '../../../assets/images/icon-storm.webp';
import iconSunny from '../../../assets/images/icon-sunny.webp';
import iconFog from '../../../assets/images/icon-fog.webp';
import iconOvercast from '../../../assets/images/icon-overcast.webp';
import iconPartlyCloudy from '../../../assets/images/icon-partly-cloudy.webp';

export const weatherIconMap: Record<number, string> = {
  0: iconSunny,

  1: iconPartlyCloudy,
  2: iconPartlyCloudy,
  3: iconOvercast,

  45: iconFog,
  48: iconFog,

  51: iconDrizzle,
  53: iconDrizzle,
  55: iconDrizzle,

  61: iconRain,
  63: iconRain,
  65: iconRain,

  71: iconSnow,
  73: iconSnow,
  75: iconSnow,

  80: iconRain,
  81: iconRain,
  82: iconRain,

  95: iconStorm,
  96: iconStorm,
  99: iconStorm,
};

export function getWeatherIcon(code: number) {
  return weatherIconMap[code] ?? iconPartlyCloudy;
}
