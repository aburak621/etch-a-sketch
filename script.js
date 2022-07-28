const container = document.querySelector('.container');
const resizeButton = document.querySelector('#resize');
resizeButton.addEventListener('click', promptForSize);
let size = 16;
let isMouseDown = false;

createGrid(size);

onmousedown = (e) => {
    isMouseDown = true;
}
onmouseup = (e) => {
    isMouseDown = false;
}

function createGrid(sideLength) {
    for (let i = 0; i < sideLength; i++) {
        let row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < sideLength; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('onmousedown', 'return false');
            cell.addEventListener('mouseenter', (e) => {
                if (isMouseDown) {
                    darken(cell);
                }
            });
            cell.addEventListener('mousedown', (e) => {
                darken(cell);
            });

            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function promptForSize() {
    const size = prompt('Enter the size you want.');
    if (size > 0) {
        container.innerHTML = '';
        createGrid(size);
    }
}

function darken(element, strength = 0.334) {
    // element.style.backgroundColor = 'black';
    let color = getComputedStyle(element).backgroundColor;
    const lastComma = color.lastIndexOf(',');
    let alpha = parseFloat(color.slice(lastComma + 1, color.lastIndexOf(')')));
    alpha += strength;
    console.log(alpha);
    color = color.slice(0, lastComma) + `, ${alpha})`;
    element.style.backgroundColor = color;
    // console.log(getComputedStyle(element).backgroundColor);
}