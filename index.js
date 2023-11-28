import { getPrediction, getHello } from "./services.js"

let canvas, ctx, prevPos, image
const w = 600
let currPos = {x: 0, y: 0}
let mouseDown = false

window.onload = function() {
  canvas = document.getElementById("myCanvas")
  canvas.width = canvas.height = w
  canvas.addEventListener("mousemove", handleMousemove)
  canvas.addEventListener("click", handleMouseClick)
  canvas.addEventListener("mousedown", () => {mouseDown = true})
  canvas.addEventListener("mouseup", () => {mouseDown = false})
  canvas.addEventListener("mouseout", () => {mouseDown = false})
  ctx = canvas.getContext("2d")
  document.getElementById("submitButton").addEventListener('click', submit)
  document.getElementById("resetButton").addEventListener('click', () => {ctx.clearRect(0, 0, w, w)})
  document.getElementById("helloButton").addEventListener('click', async () => {console.log(await getHello())})
}

function getMousePos(canvas, evt) {
  //This function gets the mouse position and returns with an object:  {x, y}
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  }
}

function handleMousemove(evt) {
  prevPos = {...currPos}
  currPos = getMousePos(canvas, evt)
  if (mouseDown) {
    ctx.beginPath()
    ctx.moveTo(prevPos.x, prevPos.y)
    ctx.lineTo(currPos.x, currPos.y)
    ctx.strokeStyle = "black"
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.closePath()
  }
}

function handleMouseClick() {
  ctx.beginPath()
  ctx.fillStyle = "black"
  ctx.arc(currPos.x, currPos.y, 3, 0, Math.PI * 2)
  ctx.fill()
}

async function submit() {
  const image = canvas.toDataURL()
  const result = await getPrediction(image)
  console.log(result)
  console.log(image)
}
