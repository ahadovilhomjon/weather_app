const input = document.querySelector("#location_name");
const type = document.querySelector(".type");
const temperature = document.querySelector(".temperature");

document.querySelector(".get").addEventListener("click", () => {
  const apiKey = "vbN86k8MGLpC1UxgOzz72qQ2DmuxfbLR";
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const api = `${proxy}http://dataservice.accuweather.com/locations/v1/cities/search?q=${input.value}&apikey=${apiKey}`;
  fetch(api)
    .then((response) => response.json())
    .then((data) => data[0].Key)
    .then((key) =>
      fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${apiKey}`
      )
    )
    .then((response) => response.json())
    .then((conditionData) => {
      type.value = conditionData[0].WeatherText;
      temperature.value = `${conditionData[0].Temperature.Metric.Value} C`;
    });
});
