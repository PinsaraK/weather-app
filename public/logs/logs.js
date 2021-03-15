const mymap = L.map("mapid").setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

//const marker = L.marker([0, 0]).addTo(mymap);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution,
}).addTo(mymap);

async function getData() {
  const response = await fetch("/api");
  const data = await response.json();
  console.log(data);
  for (item of data) {
    const marker = L.marker([item.lat, item.lon]).addTo(mymap);
    marker.bindPopup(`Temperature: ${item.temp}° C`);
    // const root = document.createElement("p");
    // const pos = document.createElement("div");
    // const temp = document.createElement("div");
    // const time = document.createElement("div");
    // const lineBreak = document.createElement("br");

    // root.append(pos, temp, time);
    // pos.textContent = `latitude: ${item.lat}° \nlongitude: ${item.lon}°`;
    // temp.textContent = `Temperature: ${item.temp}°`;
    // const dateStr = new Date(item.timestamp).toLocaleString();
    // time.textContent = dateStr;
    // document.getElementById("content").append(root);
    // document.getElementById("content").append(lineBreak);
  }
}
getData();
