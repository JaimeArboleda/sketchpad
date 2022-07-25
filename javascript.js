let randomColor = false;
const canvas = document.querySelector(".canvas");
const sizeCell = document.querySelector("#sizeCell");
const randomColorCheck = document.querySelector("#random-color");
const colorPicker = document.querySelector("#colorpicker");
const clearSketch = document.querySelector("#clear-sketch");

function random(num) {
    return Math.floor(num * Math.random())
}

function darken(event) {
    const element = event.target;
    const state = element.getAttribute("state");
    if (state === "colorUnset") {
        element.setAttribute("state", "colorSet");
        if (randomColor){
            let red = random(256);
            let green = random(256);
            let blue = random(256);
            element.style["background-color"] = `rgb(${red}, ${green}, ${blue})`;
        } else {
            let red = parseInt(colorPicker.value.substr(1,2), 16)
            let green = parseInt(colorPicker.value.substr(3,2), 16)
            let blue = parseInt(colorPicker.value.substr(5,2), 16);
            element.style["background-color"] = `rgb(${red}, ${green}, ${blue})`;
        }
    } else {
        let color = element.style["background-color"];
        let colors = color.split(',');
        let currentRed = colors[0].slice(4);
        let currentGreen = colors[1];
        let currentBlue = colors[2].slice(0,-1);
        let factor = 0.9;
        let newRed = Math.floor(currentRed * factor);
        let newGreen = Math.floor(currentGreen * factor);
        let newBlue = Math.floor(currentBlue * factor);
        element.style["background-color"] = `rgb(${newRed}, ${newGreen}, ${newBlue})`;
    }

}

function initCanvas(event) {
    size = sizeCell.value;
    
    let percentage = 100.0 / size;   
    canvas.style["grid-template-rows"] = `repeat(${size}, 1fr);`;
    let childs = Array.from(canvas.childNodes);
    childs.forEach( (elem) => canvas.removeChild(elem));
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let div = document.createElement("div");
            div.className = "block";
            div.style["grid-column"] = i+1;
            div.style["grid-row"] = j+1;
            div.setAttribute("state", "colorUnset");
            div.addEventListener("mouseover", darken);
            canvas.appendChild(div);
        }
    }
    
    console.log(canvas);
}

initCanvas();

sizeCell.addEventListener("change", initCanvas);
clearSketch.addEventListener("click", initCanvas);

function toggleRandom(event) {
    if (event.target.checked) {
        randomColor = true;
        colorPicker.disabled = true;
    } else {
        randomColor = false;
        colorPicker.disabled = false;
    }
}

randomColorCheck.addEventListener("change", toggleRandom);