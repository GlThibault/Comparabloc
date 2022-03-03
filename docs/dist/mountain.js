document.addEventListener( "DOMContentLoaded", () => generateMountain() , false );
window.onresize = () => generateMountain();

const themes = {
  rocky: ["#7e949c", "#cad7db"],
  desert: ["#ab9457", "#ccb372"],
  jungle: ["#405438", "#587d48"],
  icy: ["#4c7b8c", "#91c7db"],
};

function generateMountain() {
  setTimeout(function () {
    let peaksCount = getRandomInt(6) + 50;
    let peaks = [];
    let seperations = generateRandomSeperation(500, peaksCount * 2, 10);

    for (var i = 0; i < peaksCount; i++) {
      peaks.push([]);
    }
    document.querySelectorAll(".highlight").forEach((e) => e.remove());
    document.querySelectorAll(".wrapper").forEach((e) => e.remove());
    document.querySelectorAll(".cloud").forEach((e) => e.remove());

    peaks = peaks.map((val, i) => {
      let peakHeight = getRandomInt(50) + 10;
      let peakDrop = getRandomInt(peakHeight);
      let midPoint = Math.floor(peaksCount / 2);
      let amp = peaksCount < 6 ? 0.15 : 0.05;
      let f = Math.random() <= 5 ? 1.75 : 2.5;
      f = Math.random() <= 5 ? f : 2;
      // Amplify middle
      if (i < peaksCount / 3) {
        peakHeight = peakHeight / f;
        peakDrop = peakDrop * 0.04; // peakDrop / 5;
      }

      if (i > peaksCount / 3) {
        peakHeight = peakHeight * amp; // peakHeight / 2;
        peakDrop = peakDrop; // peakDrop / 5;
      }

      if (i == midPoint) {
        peakHeight = getRandomInt(15 - 8) + 8;
        peakDrop = peakDrop;
      }
      let chunkedSeps = chunk(seperations, 2);

      val = [
        chunkedSeps[i][0] + " " + String(peakHeight * -1),
        chunkedSeps[i][1] + " " + String(peakDrop),
      ];
      val.push(peakHeight);

      return val;
    });

    draw(peaks, 10);
    drawClouds();
    theme();
  }, 200);
}

function chunk(arr, size) {
  let out = Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
  return out;
}
function draw(peaks, distance) {
  const path = document.getElementById("mountain");
  let d = "M 0 100 v " + distance * -1;

  for (let [i, peak] of peaks.entries()) {
    let up = peak[0];
    let down = peak[1];
    let highlightMove = "";
    let leftPosition = null;

    let movement = " l " + up + " l " + down;

    if (i > 0) {
      for (var index = 0; index < i; index++) {
        let prevUp = peaks[index][0];
        let prevDown = peaks[index][1];
        highlightMove = highlightMove.concat(" m " + prevUp + " m " + prevDown);
        leftPosition +=
          parseFloat(prevUp.split(" ")[0]) + parseFloat(prevDown.split(" ")[0]);
      }
      highlightMove = highlightMove.concat(" m " + up + " l " + down);
      leftPosition +=
        parseFloat(up.split(" ")[0]) + parseFloat(down.split(" ")[0]);
    } else {
      highlightMove = highlightMove.concat("m " + up + " l " + down);
      leftPosition +=
        parseFloat(up.split(" ")[0]) + parseFloat(down.split(" ")[0]);
    }

    d = d.concat(movement);
    drawHighlight(highlightMove, leftPosition, peak[2]);
  }

  d = d.concat(" V 100 z");

  path.setAttribute("d", d);
}

function drawHighlight(highlightMove = "", leftPosition = null, peakHeight) {
  const svg = document.getElementById("svg");
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let d = "M 0 100 v -10 ";
  let noise = "l -10 0 l -8 -10 l -0.5 -5";
  noise = Math.random() <= 0.33 ? noise : "";
  leftPosition =
    Math.random() <= 0.5
      ? leftPosition - getRandomInt(40 - 30) + 30
      : leftPosition + getRandomInt(20 - 10) + 10;

  d = d.concat(highlightMove);

  d = d.concat(" L " + String(leftPosition) + " 100 " + noise + " z");

  path.setAttribute("d", d);
  path.setAttribute("fill", "#ccb372");
  path.setAttribute("fill-rule", "evenodd");
  path.classList.add("highlight");
  svg.appendChild(path);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateRandomSeperation(number, parts, min) {
  var randombit = (number - min * parts) + window.innerWidth;
  var out = [];

  for (var i = 0; i < parts; i++) {
    out.push(Math.random());
  }

  var mult =
    randombit /
    out.reduce(function (a, b) {
      return a + b;
    });

  return out.map(function (el) {
    return el * mult + min;
  });
}

function theme() {
  const path = document.getElementById("mountain");
  const svg = document.getElementById("svg");
  var keys = Object.keys(themes);
  let theTheme = themes[keys[(keys.length * Math.random()) << 0]];
  let timeOfDay = getRandomInt(8);

  timeOfDay = Math.random() <= 0.5 ? 3 : timeOfDay;

  let dynamicShifting = [
    ["#684f71"],
    ["#b292bd"],
    ["#cfd9f3"],
    ["#fbfff2"],
    ["#313b65"],
    ["#415261"],
    ["#3c4956"],
    ["#423d33"],
  ]; // [mountain, cloud]

  let highlights = document.getElementsByClassName("highlight");
  let clouds = document.getElementsByClassName("cloud");
  mountain.style.fill = theTheme[0];

  for (let highlight of highlights) {
    highlight.style.fill = theTheme[1];
    highlight.classList.add("slidein");
  }

  path.classList.add("slidein");

  for (let cloud of clouds) {
    cloud.style.fill = dynamicShifting[timeOfDay];
  }

  svg.classList.add("sky-gradient-" + timeOfDay);
}

// WARNING: Massive amount of path coordinates below

function drawClouds() {
  const svg = document.getElementById("svg");
  const cloudPaths = [
    "M97.8 53.64a3 3 0 0 0-1-.3l-.39-.21a.14.14 0 0 0-.17 0 .86.86 0 0 0-.67-.12 3.39 3.39 0 0 0-.53-.28l-.07-.06a1.43 1.43 0 0 0-1.28-.14 4.19 4.19 0 0 0-1.16.18 2.85 2.85 0 0 0-1.18-.59 1.66 1.66 0 0 0-.38-.65 2.45 2.45 0 0 0-3.17-.43c-.4-1.11-1.15-1.44-1.88-.84a3.5 3.5 0 0 0-3.92-2 4 4 0 0 0-.72-2.48 3.94 3.94 0 0 0-4.91-1.38 2.72 2.72 0 0 0-1.92-3 3.64 3.64 0 0 0-.45-.11l-.35-.1a2.78 2.78 0 0 0-2.75.87 2 2 0 0 0-2.25-.64 2.15 2.15 0 0 0-1 .79A3.59 3.59 0 0 0 63.09 41a2.53 2.53 0 0 0-1.42 1.6 4.53 4.53 0 0 0-3.12-1.71 5.26 5.26 0 0 0-3.82.88l-.28-.23a7.41 7.41 0 0 0-5.12-1.57 8.92 8.92 0 0 0-5.69-5.12 6.24 6.24 0 0 0-6.46 2.39 5 5 0 0 0-.76 1.7 3.66 3.66 0 0 0 0 1c-.23.11-.46.24-.69.37h-.19a3.47 3.47 0 0 0-5.12-.31 3.61 3.61 0 0 0-1 .39 3.56 3.56 0 0 0-1.78 2.79 2.58 2.58 0 0 0-1.47-.3 2.29 2.29 0 0 0-1.8 3.12 5.73 5.73 0 0 0-2 .67 3.35 3.35 0 0 0-3.92 1 3.37 3.37 0 0 0-2 1.37 2.71 2.71 0 0 0-3.19.21 3.17 3.17 0 0 0-1.13 1.87v.14l-.24.06a1.9 1.9 0 0 0-.54.34 2.42 2.42 0 0 0-2.66.34 1.92 1.92 0 0 0-.35.44l-.39.1a5.51 5.51 0 0 1-1.25.24 2.86 2.86 0 0 0-.7-.19 3.12 3.12 0 0 0-1.5.09l-.19.08-1-.06a1.1 1.1 0 0 0-1.05 1.46 1.31 1.31 0 0 0 0 .67.66.66 0 0 0 .48.53.83.83 0 0 0 .29.28 1 1 0 0 0 1.27-.33 1 1 0 0 0 .7.44c.66.11 1.37.22 2.08.29a1.73 1.73 0 0 0 1.27.71 1.41 1.41 0 0 0 1-.5 1.18 1.18 0 0 0 .07-.25l.35-.09a3.24 3.24 0 0 0 2.31.87 3.36 3.36 0 0 0 1.68-.78 4.46 4.46 0 0 0 2.69.88 1.93 1.93 0 0 0 1.41-.43A2.81 2.81 0 0 0 19 57.48a1.56 1.56 0 0 0 1.6-.22 3.34 3.34 0 0 0 1.51 1.11A3.46 3.46 0 0 0 25.69 57h.07l.92.37c1.48 1.66 4.83 2.2 6.69 1.68a6.61 6.61 0 0 0 1.87-.86 6.45 6.45 0 0 0 1.56-.73 4.28 4.28 0 0 0 .9-.8 4.39 4.39 0 0 0 1.84.28 2.34 2.34 0 0 0 1.25-.51c2.08 1.42 4.59 2.82 7 2.42A7.29 7.29 0 0 0 50.2 58a8 8 0 0 0 5.2.87 2.34 2.34 0 0 0 1.51-.95l.41-.07a6.3 6.3 0 0 0 4 .3 4.06 4.06 0 0 0 2.75.25 3.52 3.52 0 0 0 1.72-1.21 2.53 2.53 0 0 0 1.15-.45l.2-.15a.91.91 0 0 0 .58.23h.21a2.24 2.24 0 0 0 1.29-.09 4 4 0 0 0 2.11 1.29 2 2 0 0 0 2.42-1.1l.12-.26a1 1 0 0 0 .23.05 6.11 6.11 0 0 0 3 1.3c1.23.15 3.12-.29 3.83-1.38a1.68 1.68 0 0 0 .6-.31l.23.1a.91.91 0 0 0 .83.76c.78 0 1.38.77 2.14 1a2.91 2.91 0 0 0 1.86-.21 2.41 2.41 0 0 0 1.29-1.36 2.29 2.29 0 0 0 .93-.28 2.1 2.1 0 0 0 .79-.8c.87 0 1.74-.1 2.61-.17a2.31 2.31 0 0 0 1.66.73 2.08 2.08 0 0 0 1.67-.78v-.06c.15-.1 1.62-.12 1.75-.24a.93.93 0 0 0 .1-.12.2.2 0 0 0 .12-.11.87.87 0 0 0 .06-.32.74.74 0 0 0 0-.16.15.15 0 0 0 0-.09l.18-.14a.19.19 0 0 0 .05-.43zm-67-6a3.66 3.66 0 0 1-.22.44 3.68 3.68 0 0 0 .22-.44zm2-.58a3.35 3.35 0 0 0 .47-.12 3.24 3.24 0 0 1-.47.12zm1.76-.85a3.67 3.67 0 0 1-.38.3 3.56 3.56 0 0 0 .39-.26zm-.45.34l-.37.21a3.61 3.61 0 0 0 .38-.17zm-.4.23a3.49 3.49 0 0 1-.43.17 3.54 3.54 0 0 0 .43-.14zm20.62 6.82l-.17.08zm17.73-4a2.36 2.36 0 0 0 .42.54 2.37 2.37 0 0 1-.41-.55zm4.82 2.61a1.88 1.88 0 0 1-.33-.11 1.88 1.88 0 0 0 .34.11zm-47.37-3a1.94 1.94 0 0 1-.41.16 1.94 1.94 0 0 0 .42-.13zm-12 5l-.22.06zm-.31.08h-.21zm.63-.21l-.23.09zm-2.33-.48a2 2 0 0 0 .23.3 2 2 0 0 1-.23-.3zm.86.7l.18.05zm-.55-.3a1.6 1.6 0 0 0 .17.15 1.61 1.61 0 0 1-.17-.15zm.27.2l.17.09zm.57.18zM18 54a4.58 4.58 0 0 0 .74-.51A4.58 4.58 0 0 1 18 54zm9.58-4.9a2.3 2.3 0 0 0 .48.23 2.3 2.3 0 0 1-.5-.2zm.55.25a1.83 1.83 0 0 0 .44.08 1.83 1.83 0 0 1-.46-.05zm.52.08a1.74 1.74 0 0 0 .42 0 1.75 1.75 0 0 1-.44.03zm.89-.22a2.34 2.34 0 0 0 .37-.26 2.33 2.33 0 0 1-.39.28zm.42-.29a2.86 2.86 0 0 0 .31-.32 2.85 2.85 0 0 1-.33.34zm.63-.76a3.36 3.36 0 0 1-.26.38 3.36 3.36 0 0 0 .23-.36zm28.31 4a2.12 2.12 0 0 0 1.53 1.1 2.1 2.1 0 0 1-1.55-1.11zm-.24-.7c0 .08 0 .16.07.24-.05-.08-.08-.16-.1-.24zm.1.36a2.5 2.5 0 0 0 .13.3 2.52 2.52 0 0 1-.16-.3zm8.2-.16a2.65 2.65 0 0 0 1-.46 2.64 2.64 0 0 1-1.02.46zm1.11-.54a3.18 3.18 0 0 0 .31-.29 3.16 3.16 0 0 1-.33.28zm.42-.4a3.85 3.85 0 0 0 .34-.45 3.87 3.87 0 0 1-.36.44zm7.31.72a2 2 0 0 0 .3.35 2 2 0 0 1-.32-.36zm.66.61a1.8 1.8 0 0 1-.33-.23 1.81 1.81 0 0 0 .31.18zm.59.2a2.27 2.27 0 0 0 .53 0 2.28 2.28 0 0 1-.58-.01z",

    "M98.56 40a1.77 1.77 0 0 0-1.48-.61 10.36 10.36 0 0 0-1.84.28.86.86 0 0 1-.28 0 .18.18 0 0 0 0-.07c-.45-.46-1.38-.82-1.91-.38a1.81 1.81 0 0 1-.51 0 15.22 15.22 0 0 0-1.61-.36 1.86 1.86 0 0 0-1.51.57 2.1 2.1 0 0 0-.14-.53 2 2 0 0 0-1.35-1.18l-.17-.1a4.23 4.23 0 0 0-4.09.08 2.25 2.25 0 0 0-1.51.3 3.22 3.22 0 0 0-2.88-.27 5.4 5.4 0 0 0-8-1.78 3.2 3.2 0 0 0-2-1 3.63 3.63 0 0 0-1.11 0 8.86 8.86 0 0 0-10.57-6.64 8.36 8.36 0 0 0-2.84 1.28l-.16-.17a4.54 4.54 0 0 0-2.3-6.59A4.78 4.78 0 0 0 49 23a8 8 0 0 0-2.87-.6 7.7 7.7 0 0 0-.94 0 6.4 6.4 0 0 0-2.61-.78 4.78 4.78 0 0 0-4.06 1.77 5.62 5.62 0 0 0-3.88-1.28 4.93 4.93 0 0 0-4.46 6 3.34 3.34 0 0 0-.37 1.1 2.91 2.91 0 0 0-1.46 1.44 4.87 4.87 0 0 0-.94 2.55 2.77 2.77 0 0 0 3.91 2.77 3.29 3.29 0 0 0 1.82-.17l1.47-.55a2.59 2.59 0 0 0 .46-.17l1.09-.38a4.69 4.69 0 0 0 3.9 2 11.59 11.59 0 0 0-1.77 2.07c-.88-1.82-3.65-2.27-4.94-2A7.77 7.77 0 0 0 30 38.44c-.31.28-.24.12-.66.28a1.37 1.37 0 0 1-.54.07 3.77 3.77 0 0 0-.47-.07c-.52-.12-1.05-.37-1.49-.48a8.78 8.78 0 0 0-3.3-.32c-1.3-2.33-4.87-.62-4.47 2a1.41 1.41 0 0 0-.39 0 7 7 0 0 1-1.06 0 4.4 4.4 0 0 0-3.36-1.12 3.88 3.88 0 0 0-2.73 2 2.15 2.15 0 0 0-1.41.15c-.33.15-.57.47-.88.61-.71.32-1.28 0-1.95-.12a14.74 14.74 0 0 0-2.56.34 5.79 5.79 0 0 0-1.2.14h-.4a.91.91 0 0 0-.26.06H2.21a2.18 2.18 0 0 0-.93.35 3.36 3.36 0 0 0-.66.49c-.13.13 0 .33.19.29.13 1 4.65 1.69 4.21 1.14.72.87 1.79.26 1.92.23.55-.1.22-.12.81 0a5.73 5.73 0 0 0 1.43.35 1.56 1.56 0 0 0 .42-.11 6.2 6.2 0 0 0 .78-.36h.11l.36.06c2 .32 3.95.69 5.92.85a2.66 2.66 0 0 0 2.51-.79 2.71 2.71 0 0 1 .65-.06c.44 0 1 .42 1.45.47a3.59 3.59 0 0 0 2.12-.44 3.17 3.17 0 0 0 2.5 1.1 2.23 2.23 0 0 0 1.59-.55 5.19 5.19 0 0 0 .56.31c-.23.35-.71.51-1.08.75s-.09.3-.78.25c-.28 0-.31-.11-.59-.06a1 1 0 0 0-.55.32c-.42-.25-1-.05-1.49-.16a1.73 1.73 0 0 0-1.47.19 4 4 0 0 1-1.47.11 9.31 9.31 0 0 1-1 .16c-.45 0-.68 0-.93.41 0 .07 0 .14.09.15a.93.93 0 0 0-.12.46.84.84 0 0 0 .74.81.54.54 0 0 0 .32 0 1.22 1.22 0 0 0 1.83.39s.59.42.91-.07a3.84 3.84 0 0 0 2.65.18 3.11 3.11 0 0 0 1.68.27.62.62 0 0 0 .38-.18 2.51 2.51 0 0 0 3.2-.13c.79.58 1.65-.23 2-.84a7.5 7.5 0 0 0 1.69.38 2.44 2.44 0 0 0 1.49.12 2.23 2.23 0 0 0 3.28-1 4.86 4.86 0 0 0 .82.54 4.6 4.6 0 0 0 3.65.19 5 5 0 0 0 3.07-.49 4.67 4.67 0 0 0 4.11 2.38c1.59 0 3.55-.83 4.18-2.29h.07a7.62 7.62 0 0 0 1.64.36 5.63 5.63 0 0 0 3.16 3.47 11.92 11.92 0 0 0 6.39.45 4.33 4.33 0 0 0 3-1.2 8.35 8.35 0 0 0 1-.71 4.44 4.44 0 0 0 4.52 1.07 2.92 2.92 0 0 0 1.09-.8c1.24.6 2.93 0 4-1.06h.48a2.5 2.5 0 0 0 2.41.47 2 2 0 0 0 .7-.43.91.91 0 0 0 1-.08.34.34 0 0 0 .31-.07l.1-.11.18.09a1.42 1.42 0 0 0 1.39-.22h1a6.81 6.81 0 0 0 2-.15.15.15 0 0 0 .08-.18c.16-.82-1.25-1-1.83-1.12a.74.74 0 0 1-.64-.08l-.22-.21a2.15 2.15 0 0 0-.49-.22 1.12 1.12 0 0 0-.57 0h-.06a1.06 1.06 0 0 0-.73 0 .93.93 0 0 0-.3 0 1.17 1.17 0 0 0-.34-.42 1.82 1.82 0 0 0-.91-.92h.07a1.19 1.19 0 0 0 1.38.06 1.3 1.3 0 0 0 .53-2 3.47 3.47 0 0 0 .57-.34 3.34 3.34 0 0 0 3-1.06.77.77 0 0 0 .61.42A1.85 1.85 0 0 0 92.03 42h-.38l.43.07a1.85 1.85 0 0 0 0-.2l.2.06a2 2 0 0 0 2-.62 4 4 0 0 0 4.09-.31c.47-.44.63-.78.19-1zm-86.46.69l.48-.31a2 2 0 0 0-.54.42zm-2.52 1.05a1.43 1.43 0 0 0-.08.19.9.9 0 0 1-.64.19 1.35 1.35 0 0 0 .41-.12 1.71 1.71 0 0 0 .31-.26zm12.55 5.43h.1a.76.76 0 0 0-.06.12.24.24 0 0 0-.04-.12z",

    "M97.71 49.14l-.05-.14a1.05 1.05 0 0 0-.7-.57 7.92 7.92 0 0 0-2.27-.71 1.68 1.68 0 0 0-1.57.09 1.51 1.51 0 0 0-1.5-.19A3.41 3.41 0 0 0 89 46.13a2.16 2.16 0 0 0-1.41.52 3.37 3.37 0 0 0-.54-.46 2.7 2.7 0 0 0-.44-.79 2.66 2.66 0 0 0-.35-.33 4 4 0 0 0-.4-1.22 3.58 3.58 0 0 0-.71-.92 3.18 3.18 0 0 0-.4-1.76 3.06 3.06 0 0 0-2.35-1.54 3.79 3.79 0 0 0-.67-1.29 3.36 3.36 0 0 0-3.92-.94c0-.15.08-.29.11-.44.9-5.37-3.66-10.06-8.86-10.52a12.24 12.24 0 0 0-5.6.94l-.6-.21a8.29 8.29 0 0 0-1.49-2.88A4.34 4.34 0 0 0 54 25.4v.09a5.8 5.8 0 0 0-6-1.8 12.27 12.27 0 0 0-6.94 5.87 7.9 7.9 0 0 0-1.24-.74 6.49 6.49 0 0 0-2.55-.5A6.17 6.17 0 0 0 33 30a5.7 5.7 0 0 0-1.4 5.65 11.19 11.19 0 0 0-1.47.41 6.13 6.13 0 0 0-2.4 1.23A5.85 5.85 0 0 0 26.3 39h-.06a5.38 5.38 0 0 0-5.45-1.35 4.29 4.29 0 0 0-2.91 4.62H16a4.09 4.09 0 0 0-4.32 4.06c0 .11-.06.21-.08.32a5 5 0 0 0-.49.29A3.22 3.22 0 0 0 9 46.57a4.8 4.8 0 0 0-5.66.6 1.49 1.49 0 0 0-.53.95 1.33 1.33 0 0 0-.54.71c-.14.43-.06 1.36.54 1.35a.18.18 0 0 0 .12-.06.92.92 0 0 0 .54.26 9.89 9.89 0 0 0 2.21 0 1 1 0 0 0 .51-.28 1.57 1.57 0 0 0 1.36 1c1.64.17 3.28.29 4.93.38a1.52 1.52 0 0 0 .72 0 103.23 103.23 0 0 0 12.8-.1h1.26l.05.05c1.49 1.4 5.57 3.23 8.31 2.79a5.18 5.18 0 0 0 4.13.85 6.91 6.91 0 0 0 2.47-1.73 53.54 53.54 0 0 0 6.68.66 10.7 10.7 0 0 0 1.28 1.56 8.71 8.71 0 0 0 6 2.63c2.56.05 6.06-1.61 7-4.08 4.39 1.2 9.11 1.06 12.81-1.42h.42a6.27 6.27 0 0 0 3.74 1.55 3 3 0 0 0 3-1.42 1.84 1.84 0 0 0 .11-.38 3.34 3.34 0 0 0 .73-.5 9.23 9.23 0 0 1 1.54.17 8.77 8.77 0 0 0 3.45.4 3.78 3.78 0 0 0 1.88-1 .67.67 0 0 0 .69.07 3.73 3.73 0 0 0 .58-.37 2.55 2.55 0 0 0 2.51 0 2 2 0 0 0 .5-.47 2.64 2.64 0 0 0 1.06 0 1 1 0 0 0 1.41-.85.84.84 0 0 0 .1-.75zm-6.82 1.38l.12.1zM69 41.25a3.22 3.22 0 0 1 .3.48 3.58 3.58 0 0 0-.3-.48zm1.05 2zM48.18 38l.11-.19zm4.24-4zm1.48.24zM23.93 48a3.82 3.82 0 0 1-.54.31 3.88 3.88 0 0 0 .54-.31zm-3.76.43l-.14.07zm-6.05 1.87h-.18zm-.4-.1l-.13-.05zM11 47.31l-2.13.31zm-8.1 1.5a1.71 1.71 0 0 0 .07.18h.06-.09a1 1 0 0 0-.13.23.85.85 0 0 1 0-.22.77.77 0 0 1 .05-.18zm.36.62l.17.16zm.2.18l.18.12zm.66.29zm-.44-.15a1.29 1.29 0 0 0 .31.12 1.29 1.29 0 0 1-.36-.11zm1.15 0h-.1zm-.3.1h-.12zm.6-.26zm.37 0zm-.2 0zm.39.35zm8.64.35h.23zm.6-.19a1.55 1.55 0 0 1-.26.12 1.56 1.56 0 0 0 .21-.05zm0 0a1.83 1.83 0 0 0 .28-.21 1.82 1.82 0 0 1-.28.25zm.28-.21a2 2 0 0 0 .45-.58 2 2 0 0 1-.45.62zM19 48.72zm.67-.07h-.17zm3.56-.23a4.79 4.79 0 0 1-.66.24 4.7 4.7 0 0 0 .7-.24zm6-5a3 3 0 0 0-.37 0zm2.34 8.16h.66l.25.31c-.27-.13-.57-.24-.87-.36zm6.87-9.23l.12.19c.01-.12-.04-.18-.08-.24zm8.56-3.8a2.73 2.73 0 0 0-.22-.27 2.77 2.77 0 0 1 .22.27zm4.63-4.35zM61.88 40s.17.09.26.13zm.55.27a5.11 5.11 0 0 1 .56.4 5.37 5.37 0 0 0-.56-.4z",

    "M97.76 57.9a.61.61 0 0 0-.18 0 .48.48 0 0 0-.43 0 1.22 1.22 0 0 0-.82.26.73.73 0 0 0-.12-.18.92.92 0 0 0-.31-.59.9.9 0 0 0-.47-.21.53.53 0 0 0-.38.13.78.78 0 0 0-.22.11h-.18l-.12-.05a1.17 1.17 0 0 0-.53-.06l-.71-.17a1.59 1.59 0 0 0-.71-.34 1.49 1.49 0 0 0-.36 0h-.11a1.64 1.64 0 0 0-.28 0 1 1 0 0 0-.24-.07h-.12a1 1 0 0 0-.32-.63l-.09-.06-.17-.09h-.32a1.07 1.07 0 0 0-.39 0 .91.91 0 0 0-.41.29.71.71 0 0 0-.91-.07h-.19a.94.94 0 0 0-.08-.23.86.86 0 0 0-.57-.46 1.29 1.29 0 0 0-.78-.23.47.47 0 0 0-.32.17l-.17-.14a2.7 2.7 0 0 0-1.15-.38 3.16 3.16 0 0 0-.7-.9 2.7 2.7 0 0 0-.93-.71 4.19 4.19 0 0 0-3.62.4 2.83 2.83 0 0 0-1.7-.22l-.28.07A3.55 3.55 0 0 0 76 51.45a4.15 4.15 0 0 0-2.6.22h-.06a6.76 6.76 0 0 0-2-.45H71a1.92 1.92 0 0 0-.65-2 3.07 3.07 0 0 0-1.62-.64 7.93 7.93 0 0 0-7.21-4.17 4.59 4.59 0 0 0-.73-.3c-1.23-2.86-5-4.2-8.25-3.93a11.28 11.28 0 0 0-8.92 5.7 7.47 7.47 0 0 0-8 2.12 2.31 2.31 0 0 0-.33.21c-.22.16-.43.34-.63.51a6 6 0 0 0-7.33 2.84 5.14 5.14 0 0 0-5.19-.88 3.1 3.1 0 0 0-1.88-.81 3.89 3.89 0 0 0-1.9.28c-.65.32-.28.39-.88 0a1.53 1.53 0 0 0-.77-.23 2.58 2.58 0 0 0-2.13.08 2.35 2.35 0 0 0-.82.68 2.41 2.41 0 0 0-2.41.15c-.36.25-1 1-.85 1.48h-.09a3.29 3.29 0 0 0-1.59 2.41 2.52 2.52 0 0 0-2.34.28.49.49 0 0 0-.2-.14.7.7 0 0 0-.64.18 1 1 0 0 0-.27.31 1.1 1.1 0 0 0-.53 0 3.24 3.24 0 0 0-.62.24 3.45 3.45 0 0 1-1 .13c-.57 0-1.3.2-1.34.8l-.06.11a.63.63 0 0 0 .35.8.57.57 0 0 0 .39 0 .71.71 0 0 0 .34-.07 1.56 1.56 0 0 0 .71.21.86.86 0 0 0 .6.12h.07l.15.12a.33.33 0 0 0 .36.21l.25.07a1.75 1.75 0 0 0 1.74-.72 5.79 5.79 0 0 0 4.52 0 2.88 2.88 0 0 0 .66 0l1.49-.11c1.63 1.31 3.62 2.12 5.32.78a7.2 7.2 0 0 0 1.76.75 5.58 5.58 0 0 0 .44.48l-.07.06a2.51 2.51 0 0 0-2.31.34 1.36 1.36 0 0 0-1-.1 1 1 0 0 0-.27.09 5.52 5.52 0 0 0-.53.26c-.53.29-1.51.08-1.61.9a.51.51 0 0 0 0 .43 1 1 0 0 0 1.22.38.52.52 0 0 0 .18-.16 1.6 1.6 0 0 0 .63.23 1.42 1.42 0 0 0 .77.15 2.55 2.55 0 0 0 .69-.2.68.68 0 0 0 .71.4c.38-.08.81-.09 1.18-.15a1.5 1.5 0 0 0 .84.09 1.32 1.32 0 0 0 .73 0l.13.19a3.16 3.16 0 0 0 3.37.91 2.54 2.54 0 0 0 1.29.05h.06a3.4 3.4 0 0 0 1.69.82 4.37 4.37 0 0 0 2.54.25 6.66 6.66 0 0 0 2-.81 3 3 0 0 0 4.11-.18 4.72 4.72 0 0 0 4.16.47 4.17 4.17 0 0 0 .9-.53 3.49 3.49 0 0 0 1.25.62 2.55 2.55 0 0 0 2.67-.91 3.43 3.43 0 0 0 3.7-1.15 4.17 4.17 0 0 0 .4.29 2.88 2.88 0 0 0 .79.34 1.85 1.85 0 0 0 .27.24c1.13.83 2.24-.15 3-1.07a5.31 5.31 0 0 0 4.28 1.85 4 4 0 0 0 .78-.13 2.4 2.4 0 0 0 .87-.24c.11-.06.21 0 .31-.11A5.36 5.36 0 0 0 63.37 61h.24c.57 1 2.29 2.27 3.62 1.35a3.19 3.19 0 0 0 2.13.38 2.58 2.58 0 0 0 1.51-.94h.06C72 63 74.16 63.33 75 61.84l1.84-.12a1.65 1.65 0 0 0 1.49-.91l.89.22a6.94 6.94 0 0 0 4.6 1.23 2.15 2.15 0 0 0 1.92-2.09 1.65 1.65 0 0 0 .61.08 3.17 3.17 0 0 0 2.72.33.91.91 0 0 0 .76-.31 4.52 4.52 0 0 0 1-.69 1.28 1.28 0 0 0 1.17-.14c.77.32 1.66.17 1.88-.75l.29.11a2.08 2.08 0 0 0 1.3.33l.14.09a2.07 2.07 0 0 0 2.11-.38.49.49 0 0 0 .04-.94zm-26.28-.74a1.85 1.85 0 0 1 .27.35 1.84 1.84 0 0 0-.27-.35zm1.23 2.12l-.27.11zm-35.11-1a1.77 1.77 0 0 1 .31-.41 1.77 1.77 0 0 0-.3.45zM21.13 51l-.21-.1.23.09zm-2.87 0a1.45 1.45 0 0 0-.19.1l.17-.09zm29.71 4l-.17-.08zm1.3-.67l.26-.22c-.07-.03-.16.06-.25.14zM61.48 54v.06a2.42 2.42 0 0 0-.26-.36 2.45 2.45 0 0 1 .26.3zM73 59.1l.24-.14zm.57-.38l.18-.14z",

    "M98.34 57a1.53 1.53 0 0 0-.52-.23 1.48 1.48 0 0 0-.55-.18l-.27-.16c-1.09-.33-2.37-.8-3.17.15a1.54 1.54 0 0 0-.89.09 2.07 2.07 0 0 0-1.25 0c-1.12-.34-2.24-.68-3.37-1a3.34 3.34 0 0 0-.16-.61 1.12 1.12 0 0 0-.42-.82A3.14 3.14 0 0 0 85.59 53c-1.33-.19-2.73-.09-3.51 1a3 3 0 0 0-2-.35 10.06 10.06 0 0 0-2.56-1.22 3.07 3.07 0 0 0-.37-2.64 3.38 3.38 0 0 0-.89-1.29 2.71 2.71 0 0 0-3.72-.06 6.2 6.2 0 0 0-2.15-1.13c0-.06.07-.12.1-.18a3.57 3.57 0 0 0-1.18-4.05 5.05 5.05 0 0 0-4.42-.26 9.28 9.28 0 0 0-6.27-2.47 8.86 8.86 0 0 0-8.16 5.72 10.66 10.66 0 0 0-3.43.2 4.88 4.88 0 0 1-1.9.33c-.64-.09-1.29-.59-2-.67a4.51 4.51 0 0 0-3.71 1.18 5.55 5.55 0 0 0-.39.42 3.26 3.26 0 0 0-4.56.71 3.48 3.48 0 0 0-.34.54 3 3 0 0 0-1.44 1.36 4 4 0 0 0-.7.52c-.3.28-.5.47-.63.6a3.16 3.16 0 0 0-.94.48 3.61 3.61 0 0 0-4.12-1.16l-.21.06a1 1 0 0 0-.34-.28 2.13 2.13 0 0 0-.89-1.51 3.26 3.26 0 0 0-4.4 1 4.43 4.43 0 0 0-1.89.66 3.59 3.59 0 0 0-4 2.87h-.06a1.82 1.82 0 0 0-2.87-.05 1.2 1.2 0 0 1-.74 0h-.11a3.53 3.53 0 0 0-.31-.2.8.8 0 0 0-.9.12h-.15c-.55.13-1.08 0-1.65.12a1.57 1.57 0 0 1-.57.11c-.2 0-.38-.17-.61-.17h-.1a.79.79 0 0 0-.57.21 4.59 4.59 0 0 1-.56.34c-.89.38-1.79.05-2.69.17a1.29 1.29 0 0 0-1.13.79.23.23 0 0 0 .28.3.51.51 0 0 0 .2.2 2.26 2.26 0 0 0 1.33.24h.74l.07.08a.77.77 0 0 0 .1.11.83.83 0 0 0 1.27-.3h.16a2 2 0 0 0 2.7.72c1.05.11 2.16.49 3-.3a2.61 2.61 0 0 0 1.59 1.21 3.36 3.36 0 0 0 .61.12c.11.35.53.7 1.46.35.76 1.87 2.18 2.95 4.26 2.34a3.51 3.51 0 0 0 2-1.43 3.15 3.15 0 0 0 1.52 1.58 2.83 2.83 0 0 0 .37.2 3.22 3.22 0 0 0 2.26 0 4 4 0 0 0 1.21-.57 1 1 0 0 0 .35-.44 4.33 4.33 0 0 0 .89.29 4.63 4.63 0 0 0 1.62 0 8.68 8.68 0 0 0 6.81 1 4.65 4.65 0 0 0 1.9 1.07 3.84 3.84 0 0 0 3.91-1.49 2.22 2.22 0 0 0 .6-1.06 13.05 13.05 0 0 0 10.18 2.17 3.45 3.45 0 0 0 2.23-1.56c-.24.92 2.83 2.83 5.14 1.5 2.76 2.76 6.18 2.09 9.54-.66a5.77 5.77 0 0 0 1-1.1h.27a4 4 0 0 0 .67.88 2.82 2.82 0 0 0 3.47.39 1.82 1.82 0 0 0 1.34-.17c1.64-.93 4.27.1 6.1.13a25.19 25.19 0 0 0 6.07-.62 2.08 2.08 0 0 0 .69-.3h.13a2.21 2.21 0 0 0 .66.65A2.18 2.18 0 0 0 93 60a2.11 2.11 0 0 0 1.6-.49 1.18 1.18 0 0 0 .33-.59.39.39 0 0 0 .23-.06 2 2 0 0 1 .83-.24 1 1 0 0 0 .13.2 1.12 1.12 0 0 0 1.42.18 1.19 1.19 0 0 0 .34-.29l.25.15a.57.57 0 0 0 .65-.07.66.66 0 0 0 .44-.46 2.18 2.18 0 0 0-.88-1.33zm-41.68-1.61a1.92 1.92 0 0 1-.69.75 1.94 1.94 0 0 0 .69-.75zm7.8 4.35a7.8 7.8 0 0 0 1.68-.74 7.84 7.84 0 0 1-1.7.72zm-9.69-3.29a2.4 2.4 0 0 0 .59-.06 2.41 2.41 0 0 1-.59.06zm.68-.08a2 2 0 0 0 .47-.2 2 2 0 0 1-.47.2z",

    "M99 50.43c0-.06-.05-.11-.08-.16a.82.82 0 0 0-.84-.7H98a.24.24 0 0 0-.08 0h-.13a1.8 1.8 0 0 0-.62-.1c-.74 0-1.53.27-2.17 0a3 3 0 0 0-2.81-.27 3.68 3.68 0 0 0-4.28-.78 3.74 3.74 0 0 0-2.38-1.23l-.74-.22a2.92 2.92 0 0 0-1.51-2.71 4.47 4.47 0 0 0-3-.48 3.66 3.66 0 0 0-1.22-1.24 7.22 7.22 0 0 0-2.93-1.69 10.18 10.18 0 0 0-4.25-.2c-.38.05-.75.14-1.12.21a4.94 4.94 0 0 0-3.09-.86 14.73 14.73 0 0 0-7.24-3.4l-.69-.08a6.4 6.4 0 0 0-2.19-.94 6.26 6.26 0 0 0-3.41-1 4.6 4.6 0 0 0-3.53 1.17c-3.52.75-6.39 2.34-7.53 4.57a7.75 7.75 0 0 0-4.16-.67 6.47 6.47 0 0 0-6 2.15 3.48 3.48 0 0 0-.87 2.06 5.77 5.77 0 0 0-1.81-.08 5.25 5.25 0 0 0-.58.11 5.22 5.22 0 0 0-.61-.42 2.85 2.85 0 0 0-1.7-.44 2.68 2.68 0 0 0-.84.26 1.52 1.52 0 0 1-1.21.16c-2.16-.39-4.7 1.43-5.61 3.57a5.83 5.83 0 0 0-1 .18 3 3 0 0 0-1.77 1.27 1.87 1.87 0 0 0-1-.46 2.36 2.36 0 0 0-.46 0 3.05 3.05 0 0 0-1.63-.4 3.36 3.36 0 0 0-2.13.68 7.88 7.88 0 0 1-1.61.1 4.36 4.36 0 0 0-.44 0 12.83 12.83 0 0 0-6.9 1c-.8 0-2.1.54-1.58 1.57V51.13h.05a.59.59 0 0 0 1-.17l.34-.06a1.51 1.51 0 0 0 .91.66 2.33 2.33 0 0 0 .43.09 3 3 0 0 0 2.21-.73 4.73 4.73 0 0 0 1-.18 1.15 1.15 0 0 0 .82.44l.11.11a1.18 1.18 0 0 0 1.31.11 2.27 2.27 0 0 0 .46-.4 1.18 1.18 0 0 0 1.3-.06h.07a2.58 2.58 0 0 0 2.05.77 3.5 3.5 0 0 0 1.92-.53 2.34 2.34 0 0 0 .92.08 2.43 2.43 0 0 0 1-.34 4.19 4.19 0 0 0 3.64 1.3 3.71 3.71 0 0 0 1.9-.71 4.91 4.91 0 0 0 .52-.07 3.33 3.33 0 0 0 3 1.26 5.37 5.37 0 0 0 1.47-.2 4.32 4.32 0 0 0 .67.12A12.62 12.62 0 0 0 35 53.78c1.76-.19 3.22-.85 4.91-1.11a4 4 0 0 0 1.49.5c3.8.48 8 1.29 11.24-.53 5.15 2.67 11.16 2.34 13.92.21 1.48 1.37 3.59 1 4.1.08l.41.07a6.2 6.2 0 0 0 2.22 0 54 54 0 0 0 6.43-.33 4.31 4.31 0 0 0 .65-.09q1-.14 1.94-.33l.21.14a3.1 3.1 0 0 0 .86.34 4.5 4.5 0 0 0 2.37.12 3.64 3.64 0 0 0 1.84-.94 2.18 2.18 0 0 0 .29-.37 3.24 3.24 0 0 0 2.27.58 2.76 2.76 0 0 0 1.23-.42 2.37 2.37 0 0 0 .56-.47 2.42 2.42 0 0 0 2.29.14 6.66 6.66 0 0 0 1.9 0c.95.43 1.35-.34 2.13-.4a.79.79 0 0 0 .23-.05c.35.08.67-.16.51-.49zm-13.5-2.68h-.19zm-12.2-.84a2.8 2.8 0 0 1 .25.59 2.79 2.79 0 0 0-.21-.59zm-11.26-3zm1.63-.07h-.12zm-.76.29zm-1.2-.54l-.09-.07zm-.5-.55zm-.48.05h-.13zm-11.6 2.4zm-.39 0h-.15zm1-.9zm.78-1.27l.09-.07zm-.59.77zm.27-.44zm-31.83 6.98h-.14zm4.38-.57h.24a1.84 1.84 0 0 0-.25 0zm1-.2l.08-.13c0 .05-.05.11-.08.17s-.02-.03-.02-.04zm-12.46 1l-.09.06zm8.44 0zm4.22-1.41a3.65 3.65 0 0 1 .37-.47 3.83 3.83 0 0 0-.39.56zm22.7-2.76a1.94 1.94 0 0 0-.12.16zm.47-.53a3 3 0 0 1 .51-.37 2.58 2.58 0 0 1 .37-.09 2.59 2.59 0 0 0-.37.17 3 3 0 0 0-.53.37zm1.25-.65l-.2.06z",

    "M96.3 51.46a.85.85 0 0 0-.64 0 2 2 0 0 0-.49 0 4.13 4.13 0 0 1-1.91-.19 1.56 1.56 0 0 0-.11-.14 1.43 1.43 0 0 0-1.84-.23 1.79 1.79 0 0 1-.48.22c-.16 0-.21-.16-.46-.24a3.26 3.26 0 0 0-2-.14c-.39-.15-.76-.3-1.1-.42a3.19 3.19 0 0 0-.37-.27 1.33 1.33 0 0 0-.76-.37 5.76 5.76 0 0 0-3.24 0l-.62-.12c-.4-2.05-3.47-3.51-5.55-3a5.86 5.86 0 0 0-3.54-3 7.35 7.35 0 0 0-3 0 3.31 3.31 0 0 0-2.12 1 .24.24 0 0 0 0-.1 2.2 2.2 0 0 0-2.36-.28 3.82 3.82 0 0 0-.71-.84 4.88 4.88 0 0 0-.72-.5 3.59 3.59 0 0 0-2.63-1.93 7.34 7.34 0 0 0-.73-.15c.28-2-1.3-4.63-3.52-4.27l-.19-.14c-1.62-2.34-5-3.39-7.28-.94-.15.16-.3.33-.44.51a5.27 5.27 0 0 0-3.69-2.2c-3-.51-7.42 0-8.32 3.3a5.42 5.42 0 0 0-.64 1.35 7.15 7.15 0 0 0-1.69-.81 5.12 5.12 0 0 0-6.61 3.63v.24l-.14.19c-2.37-1.39-5.94-.36-6.16 3v.15a6.91 6.91 0 0 0-.62.57A4.06 4.06 0 0 0 20.39 49a3.36 3.36 0 0 0-1.25 2.39h-.19a3 3 0 0 0-1.52.27A2.23 2.23 0 0 0 16.27 53h-.35a1.43 1.43 0 0 0-.36 0 2.8 2.8 0 0 0-.87 0 1.77 1.77 0 0 0-.82.58h-.21a2.16 2.16 0 0 0-1.5-.35c-.68.1-.71.63-1.42.73A5.78 5.78 0 0 1 9 53.71h-.13a1.49 1.49 0 0 0-.67 0 2 2 0 0 0-.37.06 2 2 0 0 0-1.18.84c-.37-.24-.92.1-1.36.29s-.68.18-1 .27a4.55 4.55 0 0 0-.77.2 1.23 1.23 0 0 0-.9.62.31.31 0 0 0 .12.36c.46.32 1 .11 1.51 0h.18a11.09 11.09 0 0 0 2.49 0l.43-.1a1.33 1.33 0 0 0 .19.2.53.53 0 0 0 .4.11 1.28 1.28 0 0 0 .25.1A1.57 1.57 0 0 0 9.78 56a.7.7 0 0 0 .22 0 .9.9 0 0 0 1 .66 38.06 38.06 0 0 1 5.07-.37h2.79a5.7 5.7 0 0 0 3.51-.29l.21-.12c3.79.43 7.64 1 11.44 1.16 1.81.06 3.5-.55 5.28-.57a38.65 38.65 0 0 1 5 .72c3.64.44 7.48-.56 11.06-1.1q3.63-.55 7.26-1.06c2.11 1.08 5.71 1.28 7.59-.19.91 0 1.81-.07 2.72-.08a4.24 4.24 0 0 0 2.57.21 3.56 3.56 0 0 0 .86-.32 23.68 23.68 0 0 0 4.14-.58 8.09 8.09 0 0 0 1.86 0 4.53 4.53 0 0 0 4-.62h.19a2.35 2.35 0 0 1 .13-.32l.09-.11a.52.52 0 0 0 .12.14 3.61 3.61 0 0 0 3.08.88 7.23 7.23 0 0 0 .86-.35 4.68 4.68 0 0 0 .72-.14h.08c.43 0 .76.35 1.22.32s.68-.42 1.09-.56 1 .07 1.46 0a1.36 1.36 0 0 0 1.1-.56.25.25 0 0 0 .2-.12 1.13 1.13 0 0 0 .08-.2l.09-.08.05-.05h.1a.41.41 0 0 0 .55-.36c-.04-.49-.82-.5-1.27-.48zM72.86 44a.12.12 0 0 0-.06.06l-.32-.11h.31zm-13.61-2.5a1.33 1.33 0 0 0-.16.14v-.1a.15.15 0 0 0 .09 0zm-.34-4.27l-.18-.11.21.12zm-.3-.18a1.84 1.84 0 0 0-.29-.12h-.12a.62.62 0 0 0-.26 0l-.07-.08a2.24 2.24 0 0 1 .74.15z",

    "M99 61.9a.69.69 0 0 0-.33-.07.59.59 0 0 0-.41 0 1 1 0 0 1-.45-.21c-.45-.3-.83.1-1.26-.09-.15-.07-.19-.21-.38-.28a.44.44 0 0 0-.17 0h-.18a1.67 1.67 0 0 0-.87-.3 1.27 1.27 0 0 0-.85-.42 3.54 3.54 0 0 0-.71.15c-.34 0-.52-.18-.81-.25a1.53 1.53 0 0 0-.58 0 1.84 1.84 0 0 1-.65 0c-.14 0-.24-.1-.38-.13a1.57 1.57 0 0 0-.3 0 1.13 1.13 0 0 0-.74.11 1.66 1.66 0 0 0-.49-.49 2 2 0 0 0-1.07-.24 2.66 2.66 0 0 0-1-.21 2.52 2.52 0 0 0-.77.12 1.74 1.74 0 0 0-1.05-.23 2.08 2.08 0 0 0-1.19.09 2 2 0 0 0-3.19-.82c0-3.27-3.37-6.54-6.7-6.27a4.91 4.91 0 0 0-3.07-5 6.44 6.44 0 0 0-3.12-.56 5.31 5.31 0 0 0-3.56-6.33 5.06 5.06 0 0 0-4.54-6 5.25 5.25 0 0 0-1.31 0 4.58 4.58 0 0 0-.6-.81c-2.06-2.21-6.73-1.45-8.33.95a4.79 4.79 0 0 0-.76 3.31l-.34.2a6.33 6.33 0 0 0-2.59 3.33c-2.6-.33-5.07.11-6.9 2.18A8.31 8.31 0 0 0 37.29 48a3.92 3.92 0 0 0-1.09.85c-.18.21-.53.59-.48.91a7.26 7.26 0 0 0-7.29 5c0 .13-.08.27-.12.4a4.7 4.7 0 0 0-.36.91.17.17 0 0 0-.06.07A10 10 0 0 0 20 54.79a8.17 8.17 0 0 0-4.33 3.69c-.08.14-.33.54-.5.84a4.71 4.71 0 0 0-5.06 1.37 1.94 1.94 0 0 0-.87.17l-.13.07a1.65 1.65 0 0 0-1.1.74h-.07a2.32 2.32 0 0 0-3 .42 2.21 2.21 0 0 0-.57.53 1.14 1.14 0 0 1-.47.07 1.37 1.37 0 0 0-.76.08 1.52 1.52 0 0 1-.66.27h-.15a.8.8 0 0 0-.9-.08.23.23 0 0 0-.19.19.92.92 0 0 0-.15.26.18.18 0 0 0-.1.19 1.47 1.47 0 0 1 0 .23H1v.25c.15.43.68.86 1.15.61l.1-.07a.44.44 0 0 0 .32.11h.31a.49.49 0 0 0 .28.31 2.15 2.15 0 0 0 1.18.11l.15-.05a1.72 1.72 0 0 0 2.16.43c.5-.24 1.34.07 1.9.08a4 4 0 0 0 1.74-.3 4.4 4.4 0 0 0 .6-.33c1.18 1.4 4.14.92 5.92.66a5.62 5.62 0 0 0 .86.17l.15.18a1.75 1.75 0 0 0 .75.48 1.16 1.16 0 0 0 .59.16 1.77 1.77 0 0 0 .93 0l.56-.24a2.37 2.37 0 0 0 .85-.85l.08-.17.51-.14a1.93 1.93 0 0 0 .44.61 2.56 2.56 0 0 0 3.62 0 2.19 2.19 0 0 0 .56-.85 3.78 3.78 0 0 0 .85.2 2.84 2.84 0 0 0 1.91-.48l.24-.18a2.36 2.36 0 0 0 .42 1.26q.28.38.57.74a3.24 3.24 0 0 0 1.43.83 3.83 3.83 0 0 0 .54.16c1.25.21 4.1-.49 4.57-1.6v-.11h.47A4 4 0 0 0 39 67a3.13 3.13 0 0 0 1.64.47h.45a3.18 3.18 0 0 0 .56 0A3 3 0 0 0 44.06 66a2.85 2.85 0 0 0 .19-.4 1.66 1.66 0 0 0 .39.35 1.11 1.11 0 0 0 .49.29 2 2 0 0 0 .9.19h.13A2.12 2.12 0 0 0 48 65.35a2.07 2.07 0 0 0 .18-.43l1 .08a3 3 0 0 0 2.64 1.72 3 3 0 0 0 2-.8 1.26 1.26 0 0 0 .51-.16l.13-.05a2.73 2.73 0 0 0 1.15.27 2.57 2.57 0 0 0 .53-.05 2.4 2.4 0 0 0 .22.24 3.38 3.38 0 0 0 2.14.89 3.15 3.15 0 0 0 2.14-.89 2.52 2.52 0 0 0 .57-.8 2.08 2.08 0 0 0 .17.18 2.84 2.84 0 0 0 4 0 2.6 2.6 0 0 0 .75-1.38h.42c.62.08 1.23.17 1.86.22v.05a3.35 3.35 0 0 0 3 2 3.39 3.39 0 0 0 2.31-1 3.26 3.26 0 0 0 .84-1.44v-.36a31.91 31.91 0 0 0 5 .36 1.37 1.37 0 0 0 .31.23l.4.17a1.67 1.67 0 0 0 .88 0 1.27 1.27 0 0 0 .55-.25h-.05a1.44 1.44 0 0 1 .26-.16 1.49 1.49 0 0 0 .46-.34 2 2 0 0 0 .36.45 2.8 2.8 0 0 0 1.92.79 2.72 2.72 0 0 0 1.61-.55 2.69 2.69 0 0 0 1 .21 2.74 2.74 0 0 0 1.9-.55 1.58 1.58 0 0 0 .67 0 1.52 1.52 0 0 0 .53-.26 1.9 1.9 0 0 0 .74.26 1.69 1.69 0 0 0 1.32-.35 1.81 1.81 0 0 0 .53-.63 1.34 1.34 0 0 0 .62.37h.05a1.48 1.48 0 0 0 .92-.07 1.6 1.6 0 0 0 .68.44 1.18 1.18 0 0 0 1.13-.12l.07-.08a.74.74 0 0 0 .26-.07h.1a.63.63 0 0 0 .52-.27.35.35 0 0 0 .27.06l.26-.07a.72.72 0 0 0 1.23.11.3.3 0 0 0 .21-.19c.13-.43.18-.98-.27-1.23zm-27-4.3zm-6.18-10.76h-.06l.06-.06zM96.88 62H97l-.08.1a.43.43 0 0 0-.14-.07h.11zm-4-.93l-.06.08a.64.64 0 0 0-.17-.33c.17.09.04.18.2.28zm-3.16-.62a1.69 1.69 0 0 0-.23-.27 2.21 2.21 0 0 1 .2.3zm-.37-.32zm-86.4 3.4a.9.9 0 0 0-.23 0v-.07h.26z",
  ];

  let amountOfClouds = getRandomInt(10) + 6;

  for (let i = 0; i < amountOfClouds; i++) {
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let wrapper = document.createElementNS("http://www.w3.org/2000/svg", "g");
    wrapper.classList.add("parentCloud");

    let scale = getRandomInt(60) + 20;
    let left = getRandomInt(window.innerWidth);
    let top = getRandomInt(window.innerHeight);
    scale = scale * 0.02;

    left = Math.random() <= 0.5 ? left : left * -1;

    path.setAttribute("d", cloudPaths[i % cloudPaths.length]);
    path.classList.add("cloud");
    path.style.transform = "scale(" + scale + ") translate(" + left + "px, " + Math.abs(top) + "px)";
    path.classList.add("blur");
    wrapper.append(path);
    if (Math.random() <= 0.5) {
      svg.append(wrapper);
    } else {
      svg.prepend(wrapper);
    }
  }
}