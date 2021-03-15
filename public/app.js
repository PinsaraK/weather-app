function getGeo() {
  if ("geolocation" in navigator) {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      document.getElementById("lat").textContent = lat.toFixed(2);
      document.getElementById("lon").textContent = lon.toFixed(2);
      const api_url = `/weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const data = await response.json();
      console.log(data);
      const temp = (data.weather.main.temp - 273.15).toFixed(0);
      const desc = data.weather.weather[0].main;
      document.getElementById("weather").textContent = `${temp}°, ${desc}`;

      const pubData = { lat, lon, temp };
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(pubData),
      };
      const post = await fetch("/api", options);
      const post_res = await post.json();
    });
  } else {
    console.log("geolocation not available");
  }
}
