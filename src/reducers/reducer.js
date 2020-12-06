const initialState = {
  loading: true,
  errorMessage: null,
  country: "",
  region: "",
  lat: undefined,
  lon: undefined,
  error: false,
  weatherData: {
    location: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    icon: undefined,
    humidity: undefined,
    pressure: undefined,
    description: undefined,
    feelsLike: undefined,
    tempMax: undefined,
    tempMin: undefined,
    flag: undefined,
  },
};

const reducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case "WEATHER_DATA_LOADED":
      return {
        ...state,
        loading: false,
        weatherData: {
          location: action.payload.name,
          temperatureC: action.payload.main.temp,
          temperatureF: action.payload.main.temp,
          icon: action.payload.weather[0].icon,
          humidity: action.payload.main.humidity,
          pressure: action.payload.main.pressure,
          description: action.payload.weather[0].main,
          feelsLike: action.payload.main.feels_like,
          tempMax: Math.round(action.payload.main.temp_max),
          tempMin: Math.round(action.payload.main.temp_min),
          flag: action.payload.sys.country,
        },
      };
    case "WEATHER_DATA_REQUESTED":
      return {
        ...state,
        loading: true,
      };
    case "WEATHER_DATA_ERROR":
      return {
        ...state,
        error: true,
      };
    case "SELECT_COUNTRY":
      return {
        ...state,
        country: action.payload,
      };

    case "SELECT_REGION":
      return {
        ...state,
        region: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
