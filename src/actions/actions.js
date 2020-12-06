const weatherLoaded = (newWeather) => {
  return {
    type: "WEATHER_DATA_LOADED",
    payload: newWeather,
  };
};

const weatherRequested = () => {
  return {
    type: "WEATHER_DATA_REQUESTED",
  };
};

const weatherDataError = () => {
  return {
    type: "WEATHER_DATA_ERROR",
  };
};
const selectCountry = (country) => {
  return {
    type: "SELECT_COUNTRY",
    payload: country,
  };
};
const selectRegion = (region) => {
  return {
    type: "SELECT_REGION",
    payload: region,
  };
};

export {
  weatherLoaded,
  selectCountry,
  selectRegion,
  weatherRequested,
  weatherDataError,
};
