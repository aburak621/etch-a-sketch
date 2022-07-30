const container = document.querySelector('.container');
// const resizeButton = document.querySelector('#resize');
const root = document.querySelector(':root');
const toggleGridButton = document.querySelector('#toggle-grid');
const clearAllButton = document.querySelector('#clear-all');
const sizeSlider = document.querySelector('#sizeSlider');

let size = 16;
let lmbDown = false;
let rmbDown = false;
let mmbDown = false;
let isGridOn = true;
let rootStyle = getComputedStyle(root);
let gridThickness = rootStyle.getPropertyValue('--thickness');
const gridSizes = [4, 8, 16, 32, 64];

// resizeButton.addEventListener('click', promptForSize);
toggleGridButton.addEventListener('click', toggleGrid);
sizeSlider.addEventListener('input', resizeGrid);
clearAllButton.addEventListener('click', (e) => {
    createGrid(size);
})

createGrid(size);

// TODO: Color picker
// TODO: Shade and lighten

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

function createGrid(sideLength) {
    container.innerHTML = '';
    for (let i = 0; i < sideLength; i++) {
        let row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < sideLength; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('onmousedown', 'return false');
            cell.addEventListener('mouseenter', (e) => {
                if (lmbDown) {
                    paintCell(cell);
                } else if (rmbDown) {
                    clearCell(cell);
                }
            });
            cell.addEventListener('mousedown', (e) => {
                switch (e.button) {
                    case 0:
                        paintCell(cell);
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