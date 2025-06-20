let time = 0;
let i = 0;
let startTime;
let stTime;
let anime;
const ido = 25; //ペンの移動スピード、小さければ小さいほど速い
let rect = new Array(200);
const tx = document.getElementById("ziko");
const tx2 = document.getElementById("naiyou");
const pen =  document.getElementById("pen");
const skip =  document.getElementById("skip");


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
  function addCss(txtElemAry , defaultTime , animeTime) {
    let aryNumner = 0; // 配列の番号(初期値0)
    txtElemAry.forEach( item => {
      [...item.children].forEach( item2 => {
        aryNumner++;
        item2.style.animationDelay = `${defaultTime + aryNumner * animeTime}s`;
        rect[i] = item2.getBoundingClientRect();
        i++;
      }) // cssのアニメーションの実行時間の設定
    })
  }

  skip.addEventListener('click', (event) => {
    skip.style.display = 'none';
    pen.style.display = 'none';
    let txtElemAry = document.querySelectorAll('.line');
    addCss(txtElemAry , 0 , 0);
    txtElemAry = document.querySelectorAll('.line2');
    addCss(txtElemAry , 0 , 0);
    time = -1;
  });

  window.onload = () =>
    {
      startTime = new Date();
      anime = 16.265 * ido / 1000; //表示にかかる時間
    }

  async function draw()
  {
    if(new Date() - startTime >= 12557 && new Date() - startTime <= 12576)
      {
        let txtElemAry = document.querySelectorAll('.line');
        skip.style.display = 'block';
        txtSplit(txtElemAry);
        addCss(txtElemAry , 0 , anime);
        setTimeout(function(){
          tx.style.opacity = 0.8;
          pen.classList.add("fade");
          let txtElemAry = document.querySelectorAll('.line2');
          txtSplit(txtElemAry);
          addCss(txtElemAry , 1.26 , anime);
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