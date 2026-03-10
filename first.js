let popup = document.querySelector("#popup");
let swpm = document.querySelector("#w");
let sacc = document.querySelector("#acc");
let serr = document.querySelector("#err");
let endshow = document.querySelector("#done");
let maxspeed = document.querySelector("#maxs");
let gen1 = document.querySelector("#startbtn");
let para1 = document.querySelector("#maintext");
let bar = document.querySelector("#setnum");
let val = document.querySelector("#storeval");

let i = 0;
let spans = [];
let n = 0;
let errors = 0;
let wpm = 0;
let correctcount = 0;
let totalTyped = 0;  

const wordBank = ["the","and","you","that","was","for","are","with","his","they",
  "this","have","from","one","had","word","but","not","what","all",
  "were","when","your","can","said","there","use","each","which",
  "she","do","how","their","if","will","up","other","about","out",
  "many","then","them","these","so","some","her","would","make","like",
  "time","into","has","look","two","more","write","go","see","number",
  "no","way","could","people","my","than","first","water","been","call",
  "who","its","now","find","long","down","day","did","get","come",
  "made","may","part","over","new","sound","take","only","little",
  "work","know","place","year","live","me","back","give","most",
  "very","after","thing","our","just","name","good","sentence",
  "man","think","say","great","where","help","through","much",
  "before","line","right","too","mean","old","any","same","tell",
  "boy","follow","came","want","show","also","around","form",
  "three","small","set","put","end","does","another","well",
  "large","must","big","even","such","because","turn","here",
  "why","ask","went","men","read","need","land","different",
  "home","us","move","try","kind","hand","picture","again",
  "change","off","play","spell","air","away","animal","house",
  "point","page","letter","mother","answer","found","study",
  "still","learn","should","world","high","every","near",
  "add","food","between","own","below","country","plant",
  "last","school","father","keep","tree","never","start",
  "city","earth","eye","light","thought","head","under",
  "story","saw","left","few","while","along","might",
  "close","something","seem","next","hard","open",
  "example","begin","life","always","those","both",
  "paper","together","got","group","often","run",
  "important","until","children","side","feet",
  "car","mile","night","walk","white","sea",
  "began","grow","took","river","four","carry",
  "state","once","book","hear","stop","without",
  "second","later","miss","idea","enough","eat",
  "face","watch","far","indian","really","almost",
  "let","above","girl","sometimes","mountain",
  "cut","young","talk","soon","list","song",
  "being","leave","family","body","music",
  "color","stand","sun","question","fish",
  "area","mark","dog","horse","birds",
  "problem","complete","room","knew","since",
  "ever","piece","told","usually","friends",
  "easy","heard","order","red","door",
  "sure","become","top","ship","across",
  "today","during","short","better","best"];

val.innerText = bar.value;
n = parseInt(bar.value);

bar.addEventListener("input", () => {
    val.innerText = bar.value;
    n = parseInt(bar.value);
});

function generateText(n) {
    let text = "";
    for (let i = 0; i < n; i++) {
        let random = Math.floor(Math.random() * wordBank.length);
        text += wordBank[random] + " ";
    }
    return text.trim();
}

gen1.addEventListener("click", () => {

    let scent = generateText(n);

    para1.innerHTML = "";
    i = 0;
    correctcount = 0;
    errors = 0;
    totalTyped = 0; 

    scent.split("").forEach(letter => {
        let span = document.createElement("span");
        span.innerText = letter;
        para1.appendChild(span);
    });

    spans = para1.querySelectorAll("span");
});

let startTime;
let start = false;

document.addEventListener("keydown", (event) => {

    if (event.key === "Backspace") {
        if (i > 0) {
            i--;
            spans[i].classList.remove("correct");
            spans[i].classList.remove("wrong");
        }
        return;
    }

    if (event.key.length > 1) return;
    if (spans.length === 0) return;
    if (i >= spans.length) return;

    if (!start) {
        startTime = Date.now();
        start = true;
    }

    totalTyped++; 

    if (event.key.toLowerCase() === spans[i].innerText.toLowerCase()) {
        spans[i].classList.add("correct");
        correctcount++;
    } else {
        spans[i].classList.add("wrong");
        errors++;
    }

    i++;

    if (i >= spans.length) {
        let endTime = Date.now();
        let seconds = (endTime - startTime) / 1000;
        let min = seconds / 60;

        wpm = (correctcount / 5) / min;

        let currentMax = parseFloat(maxspeed.innerText) || 0;
        let speed = Math.max(currentMax, wpm);
        maxspeed.innerText = `Top Speed: ${Math.round(speed)}`;

        pop(wpm, errors);
    }
});

function pop(wpm, errors) {

    swpm.innerText = `WPM: ${Math.round(wpm)}`;
    serr.innerText = `Errors: ${errors}`;

    let accuracy = ((correctcount / totalTyped) * 100).toFixed(1); 
    sacc.innerText = `Accuracy: ${accuracy}%`;

    popup.classList.add("show");

    endshow.addEventListener("click", () => {
        popup.classList.remove("show");
    });
}
