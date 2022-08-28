//Start Section
let start = document.querySelector("#start");

//guide Section
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#start");

//Quiz Section
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

//question Section
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

//Multiple Choices Of Questions
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

//correct and next Button
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");

//Result Section
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#quit");
let startAgain = document.querySelector("#startAgain");

//Get All 'H4' From Quiz Section (MCQS)
let choice_que = document.querySelectorAll(".choice_que");


let index = 0;
let timer = 0;
let interval = 0;
let time1;


//total points
let correct = 0;

//store Answer Value
let UserAns = undefined;

//what happen when 'Start' Button Will Click
start.addEventListener("click", () => {
start.style.display = "none";
guide.style.display = "block";
 
});


//Creating Timer For Quiz Timer Section

let countDown = () => {
if (timer === 20) {
    clearInterval(interval);
    next_question.click();
} else {
    timer++;
    time.innerText = timer;
}
}

//setInterval(countDown,1000);

let loadData = () => {
questionNo.innerText = index + 1 + ". ";
questionText.innerText = MCQS[index].question;
option1.innerText = MCQS[index].choice1;
option2.innerText = MCQS[index].choice2;
option3.innerText = MCQS[index].choice3;
option4.innerText = MCQS[index].choice4;

//    timer start
timer = 0;
}

loadData();

//what happen when 'Continue' Button Will Click
continueBtn.addEventListener("click", () => {
quiz.style.display = "block";
guide.style.display = "none";
time1 = new Date().getTime(); 

interval = setInterval(countDown, 1000);
loadData();

//    remove All Active Classes When Continue Button Will Click

choice_que.forEach(removeActive => {
    removeActive.classList.remove("active");
})

total_correct.innerHTML = `${correct = 0} Out Of ${MCQS.length} Questions`;
});

choice_que.forEach((choices, choiceNo) => {
choices.addEventListener("click", () => {
    choices.classList.add("active");
    //check answer
    if (choiceNo === MCQS[index].answer) {
        correct++;
    } else {
        correct += 0;
    }
    //stop Counter
    clearInterval(interval);

    //disable All Options When User Select An Option
    for (i = 0; i <= 3; i++) {
        choice_que[i].classList.add("disabled");
    }
})
});

////what happen when 'Next' Button Will Click
next_question.addEventListener("click", () => {
//    if index is less then MCQS.length
if (index !== MCQS.length - 1) {
    index++;
    choice_que.forEach(removeActive => {
        removeActive.classList.remove("active");
    })

    //question
    loadData();

    //result
    total_correct.style.display = "block";
    total_correct.innerHTML = `${correct} Out Of ${MCQS.length} Questions`;
    clearInterval(interval);
    interval = setInterval(countDown, 1000);
} else {
    index = 0;


    //when Quiz Question Complete Display Result Section
    clearInterval(interval);
    quiz.style.display = "none";
    
    let time2 = new Date().getTime();
    let  time3 = time2 - time1;
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(time3 / day);
    const textHour = Math.floor((time3 % day) / hour);
    const textMinute = Math.floor((time3 % hour) / minute);
    const textSecond = Math.floor((time3 % minute) / second);
            points.innerHTML = `You Got ${correct} Out Of ${MCQS.length} And Taken ${textDay+":"+textHour+":"+textMinute+":"+textSecond} Time`;
            result.style.display = "block";    
}
for (i = 0; i <= 3; i++) {
    choice_que[i].classList.remove("disabled");
}
})

//what happen when 'Quit' Button Will Click
quit.addEventListener("click", () => {
start.style.display = "block";
result.style.display = "none";
});