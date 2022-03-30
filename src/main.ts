import "./style.css";

const video = document.querySelector("video") as HTMLVideoElement;
const canvas1 = document.querySelectorAll("canvas")[0] as HTMLCanvasElement;
const ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;
const canvas2 = document.querySelectorAll("canvas")[1] as HTMLCanvasElement;
const ctx2 = canvas2.getContext("2d") as CanvasRenderingContext2D;
const ascii = document.getElementById("ascii") as HTMLDivElement;

const sourceW = 640;
const sourceH = 480;

const destW = 128;
const destH = 96;

canvas1.width = destW;
canvas1.height = destH;

canvas2.width = destW;
canvas2.height = destH;

canvas2.style.width = sourceW + "px";
canvas2.style.height = sourceH + "px";

const buffer = new Array(destH);
for (let i = 0; i < buffer.length; i++) {
  buffer[i] = new Array(destW).fill("*");
}
buffer[0][0] = "0";

// const density = ".:░▒▓█";
const density = " .:-=+*#%@";

async function main() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {},
  });

  video.srcObject = stream;
  video.onloadedmetadata = function () {
    window.requestAnimationFrame(async function frame() {
      const img = new Image();
      img.src = "./test.png";
      await new Promise((r) => (img.onload = r));

      ctx1.drawImage(video, 0, 0, destW, destH);
      const pixels = ctx1.getImageData(0, 0, destW, destH);
      // ctx2.putImageData(pixels, 0, 0);

      // for (let x = 0; x < destW; x++) {
      //   console.log(
      //     pixels.data[4 * x + 15 * destW * 4 + 0],
      //     pixels.data[4 * x + 15 * destW * 4 + 1],
      //     pixels.data[4 * x + 15 * destW * 4 + 2]
      //   );
      // }

      for (let y = 0; y < buffer.length; y++) {
        for (let x = 0; x < buffer[y].length; x++) {
          const r = pixels.data[4 * x + y * destW * 4 + 0];
          const g = pixels.data[4 * x + y * destW * 4 + 1];
          const b = pixels.data[4 * x + y * destW * 4 + 2];
          const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          const brightness = Math.floor((l * density.length) / 255);
          buffer[y][x] = density[brightness];
        }
      }
      drawAscii();

      window.requestAnimationFrame(frame);
    });
  };
}

function drawAscii() {
  let text = "";
  for (let y = 0; y < buffer.length; y++) {
    for (let x = 0; x < buffer[y].length; x++) {
      text += buffer[y][x];
    }
    text += "\n";
  }
  ascii.innerText = text;
}

main();
