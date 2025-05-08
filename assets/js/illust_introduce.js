const katen = document.getElementById('ka-ten');
const pictures = document.getElementById("picture");
const data = document.getElementById("data");
const comment = document.getElementById("comment");
const menu = document.getElementById('menu');
const sideBar = document.getElementById('sideBar');
const link = document.getElementsByClassName('Link');
let menuOpen = false;
let date = new Array("2025/04/06","2025/03/07","2025/02/09","2024/12/24","2024/10/20","2024/10/08", "2024/05/19","2024/04/18" , "2024/02/25" , "2024/01/15" , "2023/08/19" , "2023/07/11" , "2023/04/04" , "2022/11/07" , "2022/10/05" , "2022/10/05" , "2022/10/04" , "2022/09/23" , "2022/09/22" , "2022/09/17");
let com = new Array("全年齢対象です","アイコン用に作ったイラストです\nモデルはもちろん魔理沙です","アクリルキーホルダー用のイラストです","十六夜咲夜×レミリア・スカーレットです\nイメージは姫と騎士です","芝浦祭用に描いたイラストです\n影のタッチを変えてみました","芝浦祭用に描いたイラストです\n","おおむね満足ですが、\n顔周りはまだまだ改善したいなと思っています" , "ｺｲｼﾁｬﾝｶﾜｲｲﾔｯﾀｰ" , "現代風霊夢です。なんか上着が焼き芋みたいな色してますね、じゅるり" , "日付...共テ...うっ頭が" , "だいぶ手抜きです。\n正直満足な出来栄えではないのでいつか改良します" , "実は水彩ペンで描いた初めての作品だったりします" , "ゆっくり実況用に作ったので差分が大量にあります" , "いろいろと新しい試みを試していたら滅茶苦茶になった作品です\nちなみに未完成です" , "一番のお気に入りです。ぎゅっと抱き着きたい" , "お世辞にもうまいとは言えませんが、ここから始まりました" ,"鳥居だけはなかなか上手いでしょ" , "地味に気に入っている作品です" , "親に勝手にみられた挙句、幼稚園生の落書きと言われました(泣)" ,"初めてibisPaintで完成させた作品です");
let num = 0;
let startTime;
let cOpen = true;
let sTop , sLeft , sHeight , sWidth;

function slide()
{
    if(new Date() - startTime > 4000 && new Date() - startTime < 6500 && cOpen == true)
        {
            katen.src = "assets/img/カーテン閉開2.gif";
            cOpen = false;
        }
    if(new Date() - startTime > 6500 && cOpen == false)
        {
            katen.src = "assets/img/カーテン開閉1.gif";
            ImageDraw();
            cOpen = true;
        }
    if(new Date() - startTime > 10000)
        {
            startTime = new Date();
        }
    window.requestAnimationFrame(slide);
}
slide();

window.onload = () =>
    {
      startTime = new Date();
      ImageDraw();
      sideBar.style.width = 0 + "%";
    }

function ImageDraw()
{
    console.log(date.length - num);
   pictures.src = "assets/img/illust/" + (date.length - num) + ".png";
   data.innerHTML = "Num : " + (num + 1) + " / " + date.length + " Date : " + date[num];
   comment.innerHTML = com[num];
   if(date.length - num - 1 > 0)
    {
        num++;
    }
    else
    {
        num = 0;
    }
}

menu.addEventListener('click', (event) => {
    if(menuOpen == false && sideBar.style.width == 0 + "%")
    {
        menu.src = "assets/img/ノーマルの太さのバツアイコン.png";
        
        menu.style.top = 1 + "vw";
        menu.style.left = 0.5 + "vw";
        menu.style.width = 4 + "vw";
        sideBar.classList.add("menuOpen");
        sideBar.classList.remove("menuClose");
        menuOpen = true;
        setTimeout(function(){
            link[0].style.display = 'block';
            link[1].style.display = 'block';
            link[2].style.display = 'block';
            sideBar.style.width = 20 + "%";
          } ,1000);
    }
    else if(menuOpen == true && sideBar.style.width == 20 + "%")
    {
        menu.src = "assets/img/26297099.png"
        menu.style.top = 1.5 + "vw";
        menu.style.left = 2 + "vw";
        menu.style.width = 8 + "vw";
        sideBar.classList.add("menuClose");
        sideBar.classList.remove("menuOpen");
        link[0].style.display = 'none';
        link[1].style.display = 'none';
        link[2].style.display = 'none';
        menuOpen = false;
        setTimeout(function(){
            sideBar.style.width = 0 + "%";
          } ,1000);
    }
  });