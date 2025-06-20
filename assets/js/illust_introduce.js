const katen = document.getElementById('ka-ten');
const pictures = document.getElementById("picture");
const pictures2 = document.getElementById("picture2");
const data = document.getElementById("data");
const data2 = document.getElementById("mainiti_num");
const comment = document.getElementById("comment");
const mainiti_date = document.getElementById("mainiti_illust_text");
const loadScene = document.getElementById("loadScene");
const api_url = 'https://script.google.com/macros/s/AKfycbxPHU9CKfFbm3zmlzWmYOclJGfkL_fZFtQZc476dnfQeaagKxNR_sE_djpGblOD0g_q/exec';
let illustList1 = [];
let illustList2 = [];
const storage = sessionStorage;
let num = 0;
let startTime;
let cOpen = true;
let sTop , sLeft , sHeight , sWidth;

async function info_convert()
{
    const response = await fetch(api_url);
    const data2 = await response.json();
    let a = false;
    data2.forEach(dataInfo => {
        if(!dataInfo.des && !dataInfo.link && !dataInfo.date)
        {
            a = true;
        }
        else
        {
            if(a == false)illustList1.push({date : dataInfo.date , link : dataInfo.link ,des : dataInfo.des});
            else illustList2.push({date : dataInfo.date , link : dataInfo.link ,des : dataInfo.des});
        }
    });
    console.log(illustList2.length);
    mainiti_date.innerHTML = illustList2[illustList2.length - 1].date;
    pictures.src = "https://lh3.googleusercontent.com/d/" + illustList1[illustList1.length - 1].link;
    pictures2.src = "https://lh3.googleusercontent.com/d/" + illustList2[illustList2.length - 1].link;
    pictures.onload = () =>
        {
            ImageDraw();
        }
    pictures2.onload = () =>
        {
            ImageDraw2();
            loadScene.style.visibility = 'hidden';
            window.scrollTo(0 , 0);
        }
}

function slide()
{
    if(new Date() - startTime > 4000 && new Date() - startTime < 6500 && cOpen == true)
        {
            katen.src = "assets/img/カーテン閉開2.gif";
            cOpen = false;
        }
    if(new Date() - startTime > 6500 && cOpen == false)
        {
            pictures.src = "https://lh3.googleusercontent.com/d/" + illustList1[illustList1.length - num - 1].link;
            pictures.onload = () =>
                {
                    ImageDraw();
                    katen.src = "assets/img/カーテン開閉1.gif";
                    cOpen = true;
                }
        }
    if(new Date() - startTime > 10000)
        {
            startTime = new Date();
        }
    window.requestAnimationFrame(slide);
}
slide();

function illust_click()
{
    storage.clear();
    storage.setItem('list1' , JSON.stringify(illustList1));
}

function mainiti_click()
{
    storage.clear();
    storage.setItem('list1' , JSON.stringify(illustList2));
}

src="assets/img/26365191.png";
katen.src = "assets/img/04カーテン開.png";
window.onload = () =>
    {
        startTime = new Date();
        info_convert();
    }



function ImageDraw()
{
        console.log(num);
        data.innerHTML = "Num : " + (num + 1) + " / " + illustList1.length + "<br>Date : " + illustList1[illustList1.length - num - 1].date;
        comment.innerHTML = illustList1[illustList1.length - num - 1].des;
        if(illustList1.length - num - 1 > 0)
        {
            num++;
        }
        else
        {
            num = 0;
        }
}

function ImageDraw2()
{
        console.log(num);
        data2.innerHTML = "No. " + illustList2.length;
}