document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const timerDisplay = document.getElementById('timer')
    const timerScore = document.getElementById('timerScore')
    const width = 8
    const squares = []
    let timeUpdating = false
    let score = 0
    let timer = 30
    let timerMS = 0
    let isPaused = false
    let leftSide = [8, 16, 24, 32, 40, 48]
    let rightSide = [15, 23, 31, 39, 47, 55]
    let bottomSide = [57, 58, 59, 60, 61, 62]
    let topSide = [1, 2, 3, 4, 5, 6]
    let topLeftCorner = [0]
    let topRightCorner = [7]
    let bottomLeftCorner = [56]
    let bottomRightCorner = [63]

    const catColours = [
        'url(images/fig.png)',
        'url(images/marm.png)',
        'url(images/biskit.png)',
        'url(images/rory.png)',
        'url(images/milo.png)',
        'url(images/otis.png)'
    ]
    // Create board
    function createBoard() {
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random() * catColours.length)
            square.style.backgroundImage = catColours[randomColor]
            grid.appendChild(square)
            squares.push(square)
            scoreDisplay.innerHTML = score
            timerDisplay.innerHTML = timer
        }
    }
    createBoard()

    // Drag the cats
    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced

    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragLeave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart() {
        colorBeingDragged = this.style.backgroundImage
        squareIdBeingDragged = parseInt(this.id)

        if (leftSide.includes(squareIdBeingDragged)) {
            squares[squareIdBeingDragged].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged + 1].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged + width].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged - width].setAttribute("class", "drag-border");
        } else if (rightSide.includes(squareIdBeingDragged)) {
            squares[squareIdBeingDragged].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged - 1].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged + width].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged - width].setAttribute("class", "drag-border");
        } else if (bottomSide.includes(squareIdBeingDragged)) {
            squares[squareIdBeingDragged].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged - 1].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged + 1].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged - width].setAttribute("class", "drag-border");
        } else if (topSide.includes(squareIdBeingDragged)) {
            squares[squareIdBeingDragged].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged - 1].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged + 1].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged + width].setAttribute("class", "drag-border");
        } else if (topLeftCorner.includes(squareIdBeingDragged)) {
            squares[squareIdBeingDragged].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged + 1].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged + width].setAttribute("class", "drag-border");
        } else if (topRightCorner.includes(squareIdBeingDragged)) {
            squares[squareIdBeingDragged].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged - 1].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged + width].setAttribute("class", "drag-border");
        } else if (bottomLeftCorner.includes(squareIdBeingDragged)) {
            squares[squareIdBeingDragged].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged + 1].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged - width].setAttribute("class", "drag-border");
        } else if (bottomRightCorner.includes(squareIdBeingDragged)) {
            squares[squareIdBeingDragged].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged - 1].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged - width].setAttribute("class", "drag-border");
        }
        else {
            squares[squareIdBeingDragged].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged - 1].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged + 1].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged + width].setAttribute("class", "drag-border");
            squares[squareIdBeingDragged - width].setAttribute("class", "drag-border");
        }
    }

    function dragOver(e) {
        e.preventDefault()
    }

    function dragEnter(e) {
        e.preventDefault()
    }

    function dragLeave() {
        this.style.backgroundImage = ''
    }

    function dragDrop() {
        colorBeingReplaced = this.style.backgroundImage
        squareIdBeingReplaced = parseInt(this.id)
        this.style.backgroundImage = colorBeingDragged
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
        if (leftSide.includes(squareIdBeingDragged)) {
            squares[squareIdBeingDragged].setAttribute("class", "none");
            squares[squareIdBeingDragged + 1].setAttribute("class", "none");
            squares[squareIdBeingDragged + width].setAttribute("class", "none");
            squares[squareIdBeingDragged - width].setAttribute("class", "none");
        } else if (rightSide.includes(squareIdBeingDragged)) {
            squares[squareIdBeingDragged].setAttribute("class", "none");
            squares[squareIdBeingDragged - 1].setAttribute("class", "none");
            squares[squareIdBeingDragged + width].setAttribute("class", "none");
            squares[squareIdBeingDragged - width].setAttribute("class", "none");
        } else if (bottomSide.includes(squareIdBeingDragged)) {
            squares[squareIdBeingDragged].setAttribute("class", "none");
            squares[squareIdBeingDragged - 1].setAttribute("class", "none");
            squares[squareIdBeingDragged + 1].setAttribute("class", "none");
            squares[squareIdBeingDragged - width].setAttribute("class", "none");
        } else if (topSide.includes(squareIdBeingDragged)) {
            squares[squareIdBeingDragged].setAttribute("class", "none");
            squares[squareIdBeingDragged - 1].setAttribute("class", "none");
            squares[squareIdBeingDragged + 1].setAttribute("class", "none");
            squares[squareIdBeingDragged + width].setAttribute("class", "none");
        } else if (topLeftCorner.includes(squareIdBeingDragged)) {
            squares[squareIdBeingDragged].setAttribute("class", "none");
            squares[squareIdBeingDragged + 1].setAttribute("class", "none");
            squares[squareIdBeingDragged + width].setAttribute("class", "none");
        } else if (topRightCorner.includes(squareIdBeingDragged)) {
            squares[squareIdBeingDragged].setAttribute("class", "none");
            squares[squareIdBeingDragged - 1].setAttribute("class", "none");
            squares[squareIdBeingDragged + width].setAttribute("class", "none");
        } else if (bottomLeftCorner.includes(squareIdBeingDragged)) {
            squares[squareIdBeingDragged].setAttribute("class", "none");
            squares[squareIdBeingDragged + 1].setAttribute("class", "none");
            squares[squareIdBeingDragged - width].setAttribute("class", "none");
        } else if (bottomRightCorner.includes(squareIdBeingDragged)) {
            squares[squareIdBeingDragged].setAttribute("class", "none");
            squares[squareIdBeingDragged - 1].setAttribute("class", "none");
            squares[squareIdBeingDragged - width].setAttribute("class", "none");
        }
        else {
            squares[squareIdBeingDragged].setAttribute("class", "none");
            squares[squareIdBeingDragged - 1].setAttribute("class", "none");
            squares[squareIdBeingDragged + 1].setAttribute("class", "none");
            squares[squareIdBeingDragged + width].setAttribute("class", "none");
            squares[squareIdBeingDragged - width].setAttribute("class", "none");
        }
    }

    function dragEnd() {
        // what is a valid move?
        let validMoves = [squareIdBeingDragged - 1 , squareIdBeingDragged - width, squareIdBeingDragged + 1, squareIdBeingDragged + width]
        let validMove = validMoves.includes(squareIdBeingReplaced)
    
        if (squareIdBeingReplaced && validMove) {
            PlayAudioFile('sounds/zapsplat_foley_wood_bambo_swoosh_through_air_001.mp3');
            squareIdBeingReplaced = null
        } 
        else if (squareIdBeingReplaced && !validMove) {
           squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
           squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        } 
        else {
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        }
    }

    // Drop cats when some have been cleared
    function moveDown() {
        for (i = 0; i <= 55; i ++) {
            if (squares[i + width].style.backgroundImage === '') {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ''
            }
            const firstRow = [0,1,2,3,4,5,6,7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && squares[i].style.backgroundImage === '') {
                let randomColor = Math.floor(Math.random() * catColours.length)
                squares[i].style.backgroundImage = catColours[randomColor]
            }
        }
    }

    // Checking for matches
    // Check row of four
    async function checkRowForFive() {
        for (i = 0; i <= 59; i ++){
            let rowOfFive = [i, i+1, i+2, i+3, i+4]
            let decidedColour = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfFive.every(index => squares[index].style.backgroundImage === decidedColour && !isBlank)) {
                score += 5
                scoreDisplay.innerHTML = score
                updateTimer(decidedColour, 5)
                rowOfFive.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
                await sleep(100);
            }
        }
    }
    checkRowForFive()

    // Check column of four
    async function checkColumnForFive() {
        for (i = 0; i <= 31; i ++){
            let columnOfFive = [i, i+width, i+width*2, i+width*3, i+width*4]
            let decidedColour = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (columnOfFive.every(index => squares[index].style.backgroundImage === decidedColour && !isBlank)) {
                score += 5
                scoreDisplay.innerHTML = score
                updateTimer(decidedColour, 5)
                columnOfFive.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
                await sleep(100);
            }
        }
    }
    checkColumnForFive()

    // Checking for matches
    // Check row of four
    async function checkRowForFour() {
        for (i = 0; i <= 60; i ++){
            let rowOfFour = [i, i+1, i+2, i+3]
            let decidedColour = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColour && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                updateTimer(decidedColour, 3)
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
                await sleep(100);
            }
        }
    }
    checkRowForFour()

    // Check column of four
    async function checkColumnForFour() {
        for (i = 0; i <= 39; i ++){
            let columnOfFour = [i, i+width, i+width*2, i+width*3]
            let decidedColour = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedColour && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                updateTimer(decidedColour, 3)
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
                await sleep(100);
            }
        }
    }
    checkColumnForFour()

    // Check row of three
    async function checkRowForThree() {
        for (i = 0; i <= 61; i ++){
            let rowOfThree = [i, i+1, i+2]
            let decidedColour = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColour && !isBlank)) {
                score += 1
                scoreDisplay.innerHTML = score
                updateTimer(decidedColour, 1)
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
                await sleep(100);
            }
        }
    }
    checkRowForThree()

    // Check column of three
    async function checkColumnForThree() {
        for (i = 0; i <= 47; i ++){
            let columnOfThree = [i, i+width, i+width*2]
            let decidedColour = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColour && !isBlank)) {
                score += 1
                scoreDisplay.innerHTML = score
                updateTimer(decidedColour, 1)
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
                await sleep(100);
            }
        }
    }
    checkColumnForThree()

    async function countdownTimer() {
        timerMS += 1
        if (timerMS % 10 === 0) {
            timer -= 1
            if (timer < 0) {
                isPaused = true;
                document.getElementById('score').id = 'scoreStopped';
                localStorage.setItem("FinalScore", score);
                document.body.style = 'pointer-events: none'
                PlayAudioFile('sounds/mixkit-bonus-extra-in-a-video-game-2064.wav');
                await sleep(2200)
                window.location.replace("gameover.html");
            }
            else {
                if (!timeUpdating) {
                    timerDisplay.innerHTML = timer
                }
            }
        }
    }

    function updateTimer(decidedColour, time) {
        if (decidedColour.includes("marm") || decidedColour.includes("fig")) {
            if (!timeUpdating)
            {
                PlayAudioFile('sounds/mixkit-bonus-earned-in-video-game-2058.wav');
                timeUpdating = true
                timer += time
                timerDisplay.innerHTML = timer + '(+' + time + ')'
                timerDisplay.style.color = 'Tomato'
                window.setTimeout(revertColorTimerScore, 500)
            }
            else
            {
                timer += time
                timerDisplay.innerHTML = timer + '(+' + time + ')'
            }
        }
        else {
            PlayAudioFile('sounds/zapsplat_multimedia_game_sound_slot_machine_single_mallet_chime_plink_65514.mp3');
        }
    }

    function revertColorTimerScore() {
        timerDisplay.style.color = '#2b1f13'
        timerDisplay.innerHTML = timer
        timeUpdating = false
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function PlayAudioFile(src) {
            var sound = document.createElement('audio');
            sound.src = src;
            sound.type = 'audio/mpeg';
            document.body.appendChild(sound);
            sound.load();
            sound.play().catch(() => void 0);
    }
    
    window.setInterval(function() {
        if (!isPaused) {
            checkRowForFive()
            checkColumnForFive()
            checkRowForFour()
            checkColumnForFour()
            checkRowForThree()
            checkColumnForThree()
            moveDown()
            countdownTimer()
        }
    }, 100)

    // TODO for initial game
    // - Hightlight where you can drag to - Done(rough)
    // - 5 row/column (5 seconds, 5 points) - Done(more testing needed)
    // - Add sound (meow with time+ and normal sound effects)
    // - Update start screen to be better (images?)
    // - Work with touch
    // - Better animations when falling and when clearing - Done(rough)
    // - Responsive on smaller screens
    // - Test and balance

    // Future work:
    // - Move time out of game logic and use a DateTime counter

})