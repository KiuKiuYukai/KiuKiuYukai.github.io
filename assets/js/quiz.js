const mode = document.getElementById('mode');
const titles = document.getElementById('titles');
const startButton = document.getElementById('startButton');
const title_scene = document.getElementById('title_scene');
const loadScene = document.getElementById("loadScene");
const api_url = 'https://script.google.com/macros/s/AKfycbw_p4Oro83XSuwQLll0zkNc0hMrXYRsIOiEtoIjnLG0QAUWAkOhSsy4FGOyuVEuMNkdGg/exec'
const question_text = document.getElementById('question_text');
const seihu = document.getElementById('seihu');
const hint_box = document.getElementById('hint_box');
const hint = document.getElementById('hint');
const hint_checkbox = document.getElementById('hint_checkbox');
let answer = [];
let answer_text = [];

for(let k = 0; k <= 3; k++)
{
    answer[k] = document.getElementById('answer' + (k + 1));
    answer_text[k] = document.getElementById('answer_text' + (k + 1));
}

let number = 3;
let miss = 3;
let te_num = 1; //現在何問目を解いているか  
let te_miss = 0;
let i = 0;
let set = true; //あらかじめ決められた問題数だけ出題されるセット形式か否か
let kaito_tyu = false;
let list_num = [];
let answer_num = [0 , 1 , 2 , 3];
let question_list = [];
let answer_list = [];
let not_answer_list = [];

function m(num , str , s)
{
    this.num = num;
    this.str = str;
    this.s = s;
}
let modeMozi = [new m(3 , "3問クイズ" , true) , new m(5 , "5問クイズ" , true) ,new m(10 , "10問クイズ" , true) , new m(15 , "15問クイズ" , true) , new m(20 , "20問クイズ" , true) , new m(1 , "1ライフ性クイズ" , false) , new m(3 , "3ライフ性クイズ" , false) , new m(5 , "5ライフ性クイズ" , false)];

async function info_convert()
{
    const response = await fetch(api_url);
    const data = await response.json();
    let a = 0;
    list_num[a] = 0;
    question_list[a] = new Array();
    answer_list[a] = new Array();
    not_answer_list[a] = new Array();
    data.forEach(dataInfo => {
        if(!dataInfo.question && !dataInfo.answer && !dataInfo.hint && !dataInfo.not_answer)
        {
            a++;
            list_num[a] = a;
            question_list[a] = new Array();
            answer_list[a] = new Array();
            not_answer_list[a] = new Array();
        }
        else
        {
            if(dataInfo.question) question_list[a].push(dataInfo.question);
            if(dataInfo.answer) answer_list[a].push({answer : dataInfo.answer , hint: dataInfo.hint});
            if(dataInfo.not_answer) not_answer_list[a].push(dataInfo.not_answer);
        }
    });
    list_num.pop();
    loadScene.style.visibility = 'hidden';
}

window.onload = () => {
    mode.innerHTML = modeMozi[0].str;
    number = modeMozi[0].num;
    set =  modeMozi[0].s;
    hint_box.style.visibility = 'hidden';
    info_convert();
};

 hint_checkbox.addEventListener('change',function(){
    if(this.checked == true)hint_box.style.visibility = 'visible';
    else hint_box.style.visibility = 'hidden';
  });

 function right()
 {
    if(i >= modeMozi.length - 1)i = 0;
    else i++;
    mode.innerHTML = modeMozi[i].str;
    if(modeMozi[i].s == true)number =  modeMozi[i].num;
    else
    {
        number = list_num.length;
        miss = modeMozi[i].num;
    }
    set =  modeMozi[i].s;
 }

 function left()
 {
    if(i <= 0)i = modeMozi.length - 1;
    else i--;
    mode.innerHTML =  modeMozi[i].str;
    if(modeMozi[i].s == true)number =  modeMozi[i].num;
    else number = list_num.length;
    set = modeMozi[i].s;
 }

 startButton.onclick = () =>{
    titles.style.visibility = 'hidden';
    title_scene.style.opacity = 1.0;
    startButton.style.opacity = 1.0;
    startBtn();
    list_num = shuffleArray(list_num);
    syutudai(list_num[0]);
 }

 for(let k = 0; k <= 3; k++) //正負判定
    {
        answer[k].onclick = () =>{
            if(kaito_tyu == false)
            {
                kaito_tyu = true;
                te_num++;
                setTimeout(function(){
                    if(answer_num[0] == k)
                    {
                        seihu.src = "assets/img/maru.png";
                    }
                    else
                    {
                        seihu.src = "assets/img/batu.png";
                        te_miss++;
                    }
                    seihu.onload = () =>{
                        seihu.style.visibility = 'visible';
                    }
                    setTimeout(function(){
                        if((set == true && te_num <= number)|| (set == false && te_miss < miss)) //続ける
                        {
                             seihu.style.visibility = 'hidden';
                            syutudai(list_num[te_num]);
                            kaito_tyu = false;
                        }
                        else if((set == true && te_num > number)|| (set == false && te_miss >= miss)) //終わる
                        {
                            title_scene.style.opacity = 1.0;
                            title_scene.style.visibility = 'visible';
                        }
                    } ,1000);
                } ,500);
            }
        }
    }

 const syutudai = (q) =>{
    answer_list[q] = shuffleArray(answer_list[q]);
    not_answer_list[q] = shuffleArray(not_answer_list[q]);
    question_text.innerHTML = question_list[q];
    hint.innerHTML = answer_list[q][0].hint;
    answer_num = shuffleArray(answer_num);
    answer_text[answer_num[0]].innerHTML = answer_list[q][0].answer;
    for(let k = 1; k < 4; k++)
    {
        answer_text[answer_num[k]].innerHTML = not_answer_list[q][k];
    }
 }

 function startBtn()
 {
    if(title_scene.style.opacity > 0)
    {
        startButton.style.opacity -= 0.1;
        title_scene.style.opacity -= 0.08;
        window.requestAnimationFrame(startBtn);
    }
    else
    {
        title_scene.style.visibility = 'hidden';
    }
 }

const shuffleArray = (array) => {
    const cloneArray = [...array];

    for (let i = cloneArray.length - 1; i >= 0; i--) {
      let rand = Math.floor(Math.random() * i);
      // 配列の要素の順番を入れ替える
      let tmpStorage = cloneArray[i];
      cloneArray[i] = cloneArray[rand];
      cloneArray[rand] = tmpStorage;
    }

    return cloneArray;
  }
