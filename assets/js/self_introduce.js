let time = 0;
let i = 0;
let startTime;
let stTime;
const ido = 25; //ペンの移動スピード、小さければ小さいほど速い
let rect = new Array(200);
const tx = document.getElementById("ziko");
const tx2 = document.getElementById("naiyou");
const pen =  document.getElementById("pen");
const menu = document.getElementById('menu');
const sideBar = document.getElementById('sideBar');
const link = document.getElementsByClassName('Link');
let menuOpen = false;

function txtSplit(txtElemAry) {
    txtElemAry.forEach( item => {
      let txt = '' // HTMLの導入部分初期化
      const textContentAry = item.textContent.split('') // テキスト1文字ずつを配列に格納
      textContentAry.forEach( item2 => {
        txt += item2.replace(/(\S)/g, '<span class="txtInner">$&</span>') // 追加するHTMLなど記載
      })
      item.innerHTML = txt // HTMLの内容を変更
    })
  }
  function addCss(txtElemAry , defaultTime) {
    let aryNumner = 0; // 配列の番号(初期値0)
    const animeTime = 16.265 * ido / 1000; //表示にかかる時間
    txtElemAry.forEach( item => {
      [...item.children].forEach( item2 => {
        aryNumner++;
        item2.style.animationDelay = `${defaultTime + aryNumner * animeTime}s`;
        rect[i] = item2.getBoundingClientRect();
        i++;
      }) // cssのアニメーションの実行時間の設定
    })
  }

  window.onload = () =>
    {
      startTime = new Date();
      sideBar.style.width = 0 + "%";
    }

  async function draw()
  {
    if(new Date() - startTime >= 12557 && new Date() - startTime <= 12576)
      {
        let txtElemAry = document.querySelectorAll('.line');
        txtSplit(txtElemAry);
        addCss(txtElemAry , 0);
        setTimeout(function(){
          tx.style.opacity = 0.8;
          pen.classList.add("fade");
          let txtElemAry = document.querySelectorAll('.line2');
          txtSplit(txtElemAry);
          addCss(txtElemAry , 1.26);
        } ,1);
        setTimeout(function(){
         
          tx2.style.opacity = 0.8;
        } ,1260);
      }
      else if(new Date() - startTime >= 12600 && time != -1)
        {
          for(let k = 0;k < 200; k++)
            {
              if(rect[k + 1] != null)
                {
                  let animeTime = 16.2 * ido;
                  stTime = new Date();
                  pen.style.opacity = 0.8;
                  do
                  {
                    console.log((new Date() - stTime) / animeTime);
                    pen.style.left = (rect[k].x)  + ((rect[k + 1].x) - (rect[k].x)) * (new Date() - stTime) / animeTime + "px";
                    pen.style.top = (rect[k].y - pen.height + rect[k].height / 2) + ((rect[k + 1].y - pen.height + rect[k + 1].height / 2) - (rect[k].y - pen.height + rect[k].height / 2)) * (new Date() - stTime) / animeTime + "px";
                    await sleep(5);
                  }
                  while((new Date() - stTime) / animeTime < 1);
                }
              else
              {
                pen.style.opacity = 0;
                time = -1;
                break;
              }
            }

            /*
            for(k = 0; k < 200; k++)
              {
                if(rect[k + 1] != null)
                  {
                    for(let j = 0;j < ido; j++)
                      {
                        pen.style.opacity = 0.8;
                        pen.style.top = (rect[k].y - pen.height + rect[k].height / 2) + ((rect[k + 1].y - pen.height + rect[k + 1].height / 2) - (rect[k].y - pen.height + rect[k].height / 2)) * j / ido + "px";
                        pen.style.left = (rect[k].x)  + ((rect[k + 1].x) - (rect[k].x)) * j / ido + "px";
                        await sleep(15);
                      }  
                  }
                  else
                  {
                    pen.classList.add("fade2");
                    time = -1;
                    setTimeout(function(){
                      pen.style.opacity = 0;
                    } , 500);
                    break;
                  } 
              }
                  */
        }
    window.requestAnimationFrame(draw);
  }
  draw();

  function sleep(msec) 
{
  return new Promise(function(resolve) {
  setTimeout(function() {resolve()}, msec);
  })
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