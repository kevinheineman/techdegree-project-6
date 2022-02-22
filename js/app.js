const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const resetButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const tries = document.querySelectorAll('.tries img');
let wrongLetter = 0;

const phrases = [
    'fortune favors the bold',
    'i think therefore i am',
    'time is money',
    'practice makes perfect',
    'i came i saw i conquered'
]

function getPhrase(arr) {
    const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    const phraseArr = randomPhrase.split('');
    return phraseArr
}

function addPhraseToDisplay(arr) {
    const phraseUl = document.querySelector('#phrase ul');
    const li = document.createElement('li');
    const phraseArr = getPhrase(arr);
    for (let i = 0; i < phraseArr.length; i++) {
        const character = phraseArr[i];
        const li = document.createElement('li');
        li.textContent = character;
        if (character === ' ') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
        phraseUl.append(li);
    }

}

function checkLetter(btn) {
    const letters = document.querySelectorAll('.letter');
    let matchLetter = null;
    for (let i = 0; i < letters.length; i++) {
        if (letters[i].textContent === btn.textContent) {
            matchLetter = (letters[i] === btn.textContent);
            letters[i].className += ' show';
        }
    }
    return matchLetter;
}

function checkWin() {
    const lettersShow = document.querySelectorAll('.show');
    const letters = document.querySelectorAll('.letter');
    const h2 = document.createElement('h2');
    h2.className = 'result';
    if (lettersShow.length === letters.length) {
        overlay.style.display = 'initial';
        overlay.className = 'win';
        overlay.insertBefore(h2, resetButton);
        h2.textContent = 'Winner, Winner!';
        resetButton.textContent = 'Play Again';
        resetButton.addEventListener('click', (event) => {
            resetGame()
        })
    } else {
        if (wrongLetter >= 5) {
            overlay.style.display = 'initial';
            overlay.className = 'lose';
            overlay.insertBefore(h2, resetButton);
            h2.textContent = 'Better Luck Next Time...';
            resetButton.textContent = 'Play Again';
            resetButton.addEventListener('click', (event) => {
                resetGame()
            })
        }
    }
}

function resetGame() {
    const phraseLi = document.querySelectorAll('#phrase ul li');
    const tries = document.querySelectorAll('.tries img');
    const qwertyBtn = document.querySelectorAll('#qwerty .keyrow button');
    const result = document.querySelector('.result');
    for (let i = 0; i < phraseLi.length; i++) {
        phraseLi[i].remove(phraseLi[i]);
    }
    for (let i = 0; i < qwertyBtn.length; i++) {
        qwertyBtn[i].className = ''; 
        qwertyBtn[i].disabled = false;
    }
    for (let i = 0; i < tries.length; i++) {
        tries[i].src = 'images/liveHeart.png'; 
    }
    overlay.style.display = 'none';
    if (result) {
        result.remove(result);
    }
    wrongLetter = 0;
    addPhraseToDisplay(phrases)

}

resetButton.addEventListener('click', (event) => {
    overlay.style.display = 'none';
    getPhrase(phrases);
    addPhraseToDisplay(phrases);
});

qwerty.addEventListener('click', (event) => {
    const btn = event.target;
    if (btn.tagName === 'BUTTON') {
        const letterFound = checkLetter(btn);
        letterFound;
        if (letterFound === null) {
            tries[wrongLetter].src = 'images/lostHeart.png';
            wrongLetter++;
            }
        btn.className = 'chosen';
        btn.disabled = true;
        checkWin();
        }
})