export type City = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
};

export type SearchCityResponse = {
  results: City[];
};

export type WeatherData = {
  city: {
    name: string;
    country: string;
  };

  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
  };

  hourly: {
    dt: number;
    temp: number;
    weatherCode: number;
  }[];

  daily: {
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weathercode: number;
  }[];
};

export type LastSearch = {
  lat: number;
  lon: number;
  cityName: string;
  country: string;
};

export type CitySearch = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};
