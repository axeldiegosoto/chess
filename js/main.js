'use strict'

// Functions
function hideMovements(squares = []) {
    squares.forEach(square_move => {
        square_move.classList.remove('move')
    })
}

function letterToNumber(letter) {
    let number = 0
    if (letter == 'a') {
        number = 1
    } else if (letter == 'b') {
        number = 2
    } else if (letter == 'c') {
        number = 3
    } else if (letter == 'd') {
        number = 4
    } else if (letter == 'e') {
        number = 5
    } else if (letter == 'f') {
        number = 6
    } else if (letter == 'g') {
        number = 7
    } else if (letter == 'h') {
        number = 8
    }

    return number
}

function numberToLetter(number) {
    let letter = ''
    if (number == 1) {
        letter = 'a'
    } else if (number == 2) {
        letter = 'b'
    } else if (number == 3) {
        letter = 'c'
    } else if (number == 4) {
        letter = 'd'
    } else if (number == 5) {
        letter = 'e'
    } else if (number == 6) {
        letter = 'f'
    } else if (number == 7) {
        letter = 'g'
    } else if (number == 8) {
        letter = 'h'
    }

    return letter
}

// Chess movements
let squares = Array.from(document.getElementsByClassName('square'))
let coordinates = []

let piece_selected = false
let movements_allowed = []

squares.forEach(square => {
    coordinates.push([square.classList[1], square.classList[2]])
    square.addEventListener('click', () => {
        // Capture piece
        if (piece_selected && square.children.length == 1) {
            square.innerHTML = piece_selected.innerHTML

            piece_selected.innerHTML = ''
            piece_selected = false

            // Hide movements
            hideMovements(squares)
        }
        // Select piece
        else if (square.children.length == 1) {
            piece_selected = square

            // Moves by piece
            let piece = {
                name: piece_selected.children[0].classList[1],
                color: piece_selected.children[0].classList[2],
                coordinates: {
                    column: piece_selected.classList[1],
                    row: piece_selected.classList[2],
                },
            }
            let piece_coor = {
                column: letterToNumber(piece.coordinates.column),
                row: Number(piece.coordinates.row),
            }
            console.log(piece_coor)
            if (piece.name == 'pawn') {
                for (let i = 1; i <= 2; i++) {
                    if (piece.color == 'black') {
                        movements_allowed.push(
                            document.getElementsByClassName(
                                numberToLetter(piece_coor.column) +
                                    ' ' +
                                    String(piece_coor.row - i)
                            )[0]
                        )
                    } else {
                        movements_allowed.push(
                            document.getElementsByClassName(
                                numberToLetter(piece_coor.column) +
                                    ' ' +
                                    String(piece_coor.row + i)
                            )[0]
                        )
                    }
                }
                console.log(movements_allowed)
            }

            // Show movements
            movements_allowed.forEach(square_move => {
                square_move.classList.add('move')
            })
        }
        // Move piece
        else if (piece_selected) {
            square.innerHTML = piece_selected.innerHTML

            piece_selected.innerHTML = ''
            piece_selected = false

            // Hide moves
            hideMovements(squares)
            movements_allowed = []
        }
    })
})

/*
let test = document.getElementsByClassName(
    coordinates[0][0] + ' ' + coordinates[0][1]
)
test[0].classList.add('move')
*/
