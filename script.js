const container = document.querySelector('.grid-container');
const root = document.querySelector(':root');
const toggleGridButton = document.querySelector('#toggle-grid');
const clearAllButton = document.querySelector('#clear-all');
const sizeSlider = document.querySelector('#size-slider');
const sizePrompt = document.querySelector('#size');
const colorPicker = document.querySelector('#color-picker');

const gridSizes = [4, 8, 16, 32, 64];

let size = 16;
let lmbDown = false;
let rmbDown = false;
let mmbDown = false;
let isGridOn = true;
let rootStyle = getComputedStyle(root);
let gridThickness = rootStyle.getPropertyValue('--thickness');

toggleGridButton.addEventListener('click', toggleGrid);
sizeSlider.addEventListener('input', resizeGrid);
sizeSlider.addEventListener('input', printGridSize);
clearAllButton.addEventListener('click', (e) => { createGrid(size); })

window.onload = () => {
    createGrid(size);
}

onmousedown = (e) => {
    switch (e.button) {
        case 0:
            lmbDown = true;
            break;
        case 1:
            mmbDown = true;
            break;
        case 2:
            rmbDown = true;
            break;

        default:
            break;
    }
}

onmouseup = (e) => {
    switch (e.button) {
        case 0:
            lmbDown = false;
            break;
        case 1:
            mmbDown = false;
            break;
        case 2:
            rmbDown = false;
            break;

        default:
            break;
    }
}

// TODO: Shade and lighten

function eyedropper(element) {
    colorPicker.value = rgb2hex(getComputedStyle(element).backgroundColor);
}

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`


function printGridSize(e) {
    let gridSize = gridSizes[e.target.value];
    sizePrompt.textContent = gridSize + 'x' + gridSize;
}

function resizeGrid(e) {
    size = gridSizes[e.target.value];
    createGrid(size);
}

function toggleGrid() {
    isGridOn = !isGridOn;
    if (isGridOn) {
        root.style.setProperty('--thickness', gridThickness);
    } else {
        root.style.setProperty('--thickness', '0px');
    }
}

function createGrid(sideLength) {
    container.innerHTML = '';
    for (let i = 0; i < sideLength; i++) {
        let row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < sideLength; j++) {
            let cell = document.createElement('div');
            cell.style.backgroundColor = 'white';
            cell.classList.add('cell');
            cell.setAttribute('onmousedown', 'return false');
            cell.addEventListener('mouseenter', (e) => {
                if (lmbDown) {
                    paintCell(cell, colorPicker.value);
                } else if (rmbDown) {
                    clearCell(cell);
                }
            });
            cell.addEventListener('mousedown', (e) => {
                switch (e.button) {
                    case 0:
                        if (e.altKey) {
                            eyedropper(cell);
                        } else {
                            paintCell(cell, colorPicker.value);
                        }
                        break;
                    case 2:
                        clearCell(cell);
                        break;

                    default:
                        break;
                }
            });
            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
            });

            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function promptForSize() {
    const size = prompt('Enter the size you want.');
    if (size > 0) {
        createGrid(size);
    }
}

function paintCell(element, color = 'rgba(0, 0, 0, 1)') {
    element.style.backgroundColor = color;
}

function darken(element, strength = 0.334) {
    let color = getComputedStyle(element).backgroundColor;
    const lastComma = color.lastIndexOf(',');
    let alpha = parseFloat(color.slice(lastComma + 1, color.lastIndexOf(')')));
    alpha += strength;
    color = color.slice(0, lastComma) + `, ${alpha})`;
    element.style.backgroundColor = color;
}

function clearCell(element) {
    element.style.backgroundColor = 'rgba(255, 255, 255, 1)';
}