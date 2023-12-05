import { getPrediction, getHello } from "./services.js"

let canvas, ctx, prevPos
const w = 500
let currPos = {x: 0, y: 0}
let mouseDown = false
let drawMode = true

window.onload = function() {
  canvas = document.getElementById("myCanvas")
  canvas.width = canvas.height = w
  canvas.addEventListener("mousemove", handleMousemove)
  canvas.addEventListener("touchmove", handleMousemove)
  canvas.addEventListener("click", handleMouseClick)
  canvas.addEventListener("mousedown", () => {mouseDown = true})
  canvas.addEventListener("mouseup", () => {mouseDown = false})
  canvas.addEventListener("mouseout", () => {mouseDown = false})
  ctx = canvas.getContext("2d")
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, w, w)
  document.getElementById("submitButton").addEventListener('click', submit)
  document.getElementById("resetButton").addEventListener('click', reset)
  document.getElementById("helloButton").addEventListener('click', async () => {console.log(await getHello())})
  document.getElementById("drawButton").addEventListener('click', handleDrawButton)
  document.getElementById("eraseButton").addEventListener('click', handleEraseButton)
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
    ctx.strokeStyle = drawMode ? "black" : 'white'
    ctx.lineWidth = drawMode ? 5 : 20
    ctx.stroke()
    ctx.closePath()
  }
}

function handleMouseClick() {
  ctx.beginPath()
  ctx.fillStyle = drawMode ? "black" : 'white'
  let radius = drawMode ? 3 : 10
  ctx.arc(currPos.x, currPos.y, radius, 0, Math.PI * 2)
  ctx.fill()
}

function aOrAn(nextWord) {
  return ['a', 'e', 'i', 'o', 'u'].includes(nextWord[0].toLowerCase()) ? 'an' : 'a'
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

async function submit() {
  const image = canvas.toDataURL('image/jpeg', 1.0)
  const result = await getPrediction(image)
  let values = Object.values(result)
  values.sort((a, b) => a < b ? 1 : -1)
  let guesses = values.map(x => getKeyByValue(result, x))
  document.getElementById("prediction").innerHTML = `
    This is ${aOrAn(guesses[0])} ${guesses[0]} (${(values[0] * 100).toFixed(1)}%)
  `
  if (values[1] > 0.2) {
    document.getElementById("prediction").innerHTML += `
    <br>hmmm... or maybe ${aOrAn(guesses[1])} ${guesses[1]}? (${(values[1] * 100).toFixed(1)}%)`
  }
  console.log(result)
}

function reset() {
  ctx.clearRect(0, 0, w, w)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, w, w)
  document.getElementById("prediction").innerHTML = "Just wondering ..."
}

function  handleDrawButton() {
  drawMode = true
  document.getElementById("drawButton").className = 'button2clicked'
  document.getElementById("eraseButton").className = 'button2'
}

function  handleEraseButton() {
  drawMode = false
  document.getElementById("drawButton").className = 'button2'
  document.getElementById("eraseButton").className = 'button2clicked'
}
