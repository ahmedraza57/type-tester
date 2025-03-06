const data = [
    {
        custom: "The quick brwon fox jumps over the lazy dog",
        random : [
            "The only way to do great work is to love what you do.",
            "The greatest glory in living lies not in never falling, but in rising every time we fall.",
            "Life is what happens when you're busy making other plans.",
            "The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.",
            "The only way to do great work is to love what you do.",
            "The greatest glory in living lies not in never falling, but in rising every time we fall.",
            "Life is what happens when you're busy making other plans.",
            "The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.",
            "The only way to do great work is to love what you do.",
            "The greatest glory in living lies not in never falling, but in rising every time we fall."
        ]
    }
    
]

const Data = data[0];

// capturing html element
const p = document.getElementById('dsiplay-text');
const textarea = document.getElementById('textarea');

const timer = document.getElementById('timer');
const wpm = document.getElementById('wpm');
const accuracy = document.getElementById('accuracy');
const time = document.getElementById('time');

const resetButton = document.getElementById('reset-button');
const testing = document.getElementById('testing');
const check = document.getElementById('check');
// toggle buttons
const customBtn = document.getElementById('custom')
const freeStyleButton = document.getElementById('freestyle');
const randomParagraph = document.getElementById('paragraph')

p.textContent = Data.custom;

function valueToContent() {
    wpm.textContent = wpmCalaulation(letterToWord(userTypedText), timeCount);
    accuracy.textContent = accuracyCalculation(letterToWord(userTypedText), timeCount)
    stopTime();
    textarea.value = '';
    userTypedText= [];
    textarea.addEventListener('keydown', settingfuncTime)
}

//  event listen on the buttons 
customBtn.addEventListener('click', () => {
    // p.hidden = false;
    check.hidden = true;
    p.textContent = Data.custom;
    textarea.setAttribute('maxlength', Data.custom.length);
})
randomParagraph.addEventListener('click', () => {
    // p.hidden = false;
    check.hidden = true;
    let randomNum = Math.floor(Math.random()* Data.random.length)
    p.textContent = Data.random[randomNum];
    textarea.setAttribute('maxlength',  Data.random[randomNum].length)

})
freeStyleButton.addEventListener('click', () => {
    p.hidden = true;
    check.hidden = false;
    check.addEventListener('click', () => {
        valueToContent();
    })
})

// Timing Section
let interval;
let timeCount = 0;
let score = 0;
function startTime () {
    interval =  setInterval(() => {
        timeCount += 1;
        timer.textContent = timeCount;
        console.log(timeCount);
        
    }, 1000)
}
function stopTime (){
    clearInterval(interval);
    timeCount = 0;
    timer.textContent = timeCount;
}

function settingfuncTime() {
    startTime();
    textarea.removeEventListener('keydown', settingfuncTime);
}
// hadnling user input
let userTypedText = [];
function keyChecking(val){
    if (val.key == "Backspace") {
        userTypedText.pop(-1);
    } else if(val.key == "Control" || val.key == "Alt" || val.key == "Shift"){
        return;
    } else{
        userTypedText.push(val.key)
    }
}

function lengthMatch(){
    if(p.hidden == false){
        if (textarea.value.length == p.textContent.length){
            alert('Sir your test is taken your report is')
            valueToContent()
        }
    }
}


// formullas
function letterToWord (arr) {
    return arr.join('').split(' ');
}

function wpmCalaulation(words, time){
    return (words.length * 60) / time;
}

function accuracyCalculation(letters, totalTypedletter){
    return (letters.length / totalTypedletter) * 100;
}

// reset button
function reset(){
    stopTime();
    textarea.value = '';
    wpm.textContent = null;
    accuracy.textContent = null;
    userTypedText = [];
}

// testing eventListener
textarea.addEventListener('keydown', settingfuncTime)
textarea.addEventListener('keydown',(event) => {
    keyChecking(event);
    lengthMatch();

})
resetButton.addEventListener('click', reset);