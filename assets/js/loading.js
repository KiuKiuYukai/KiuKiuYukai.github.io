const canvas = document.getElementById('danmaku');
const gameOver = document.getElementById('gameOver');
const kuro = document.getElementById('kuro');
const buttons = document.getElementById('buttons');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const charactor = new Image();
const loadTime = 1200;
charactor.src = "assets/img/chara.png";
let danEnd = false; //終了時trueになる
let flag = 0; //弾幕のフラグ管理
let game = 0; //ゲーム全体のフラグ管理
let isDragging;
let startTime;
let endTime;
let clearTime;
let dx , dy;
let i , j = 60 , k ,l;
let dWidth = new Array(2); //弾幕の当たり判定の大きさ
let dHeight = new Array(2);
let Mozi = ["" , "N", "No" , "Now" , "Now " , "Now L" , "Now Lo" , "Now Loa" ,"Now Load" , "Now Loadi" , "Now Loadin" , "Now Loading"];
let Mozi2 = ["N" , "o" , "w" , "L" , "o" ,"a" ,"d" , "i" , "n" ,"g"];
let dLeftX = new Array(17); //弾幕の左上座標
let dLeftY = new Array(17);
let time = new Array(10).fill(0);
let dX = new Array(10); //自機狙いのときのプレイヤー座標
let dY = new Array(10);
let leftX , leftY; //キャラの左上座標
let x , y; //キャラの中心座標
let a = 0 , b = 0 , c = 0 , d = false;

//たまにキャンバスサイズを画面サイズに合わせる
window.onload = () =>
  {
    buttons.style.visibility = 'hidden';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

function drawImages()
{
    ctx.clearRect(0 , 0 , canvas.width , canvas.height); //いったんクリアする
    ctx.fillRect(0 , canvas.height * 3 / 5 +  canvas.width / 20 * charactor.naturalHeight / charactor.naturalWidth, canvas.width , canvas.height * 2 / 5)
    ctx.font = "5vw Meiryo UI";
    //キャラ画像を生成し横幅を画面サイズに合わせて縮小し、縦幅を自然な比率に合わせる
    ctx.strokeRect(dLeftX[0] , dLeftY[0] ,dWidth[0] , dHeight[0]);
    x = leftX + window.innerWidth / 40; //プレイヤーの中心座標を定義
    y = leftY + window.innerWidth / 40 * charactor.naturalHeight / charactor.naturalWidth;
    if(endTime - startTime < loadTime)
    {
      dx = dLeftX[0] + 2 * (canvas.width / 45);
      dy = dLeftY[0] - (canvas.height / 15);
        ctx.fillRect(dLeftX[0],dLeftY[0],dWidth[0] * (endTime - startTime) / loadTime ,dHeight[0]);
    }
    else
    {
        ctx.fillRect(dLeftX[0],dLeftY[0], dWidth[0] ,dHeight[0]);
    }
    for(i = 1; i < 12; i ++)
      {
          if(i <= (endTime - startTime) / loadTime * 12 && flag <= 0)
          {
            ctx.fillText(Mozi[i], dx , dy);
          }
          if(flag > 0)
          {
            if(flag < 7)
            ctx.fillText(Mozi[11 - flag], dx, dy);
            else
            ctx.fillText(Mozi[10 - flag], dx, dy);
            if(flag == 10 && d == false)
              {
                clearTime = new Date();
                d = true;
              }
            if(i <= flag)
            {
              
              if(game >= 2 && game <= 12)
                {
                  if(11 - i != game - 1)
                    {
                      dX[11 - i] = 0;
                      dY[11 - i] = 0;
                    }
                  if(dLeftY[game - 1] >= window.innerHeight * 3 / 5 +  window.innerWidth / 20 * charactor.naturalHeight / charactor.naturalWidth )
                    {
                      dX[game - 1] = 0;
                      dY[game - 1] = 0;
                    }
                }
              ctx.fillText(Mozi2[10 - i], dLeftX[11 - i], dLeftY[11 - i]);
            }
          }
      }
    if(game == 0)
      {
        ctx.drawImage(charactor, leftX, leftY , window.innerWidth / 20 , window.innerWidth / 20 * charactor.naturalHeight / charactor.naturalWidth);
      }
    if(d == true && new Date - clearTime >= 2000)window.location.href = 'home.html';
}

canvas.addEventListener('mousedown', (event) => {
    //マウスの座標がキャラクターの範囲に入ってるか確かめてから実行する
    if(event.offsetX > leftX && event.offsetY > leftY && event.offsetX < leftX + charactor.width && event.offsetY < leftY + charactor.height)
    {
        leftY =  window.innerHeight * 55 / 100;
        drawImages();
        isDragging = true;
    }
  });
  
canvas.addEventListener('mousemove', (event) => {
    if (isDragging == true) 
    {
        leftX = event.offsetX - window.innerWidth / 40;
        drawImages();
    }
  });
  
canvas.addEventListener('mouseup', () => {
    isDragging = false;
    leftY =  window.innerHeight * 3 / 5;
    drawImages();
  });
  
canvas.addEventListener('mouseleave', () => {
    isDragging = false;
    leftY =  window.innerHeight * 3 / 5;
    drawImages();
  });

window.addEventListener('resize', () => { //ウィンドウのサイズが変更されたとき実行される
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dWidth[0] = window.innerWidth / 2.5;
    dHeight[0] = window.innerWidth / 25;
    dLeftX[0] =  window.innerWidth / 2 - dWidth[0] / 2;
    dLeftY[0] =  window.innerHeight / 2.5 - dHeight[0] / 2;
    leftX = window.innerWidth / 2 - window.innerWidth / 40;
    leftY = window.innerHeight * 3 / 5;
    dx = dLeftX[0] + 2 * (canvas.width / 45);
    dy = dLeftY[0] - (canvas.height / 15);
    drawImages();
  });

charactor.onload = () => { //初期位置
    startTime = new Date();
    dWidth[0] = window.innerWidth / 2.5;
    dHeight[0] = window.innerWidth / 25;
    dLeftX[0] =  window.innerWidth / 2 - dWidth[0] / 2;
    dLeftY[0] =  window.innerHeight / 2.5 - dHeight[0] / 2;
    leftX = window.innerWidth / 2 - window.innerWidth / 40;
    leftY = window.innerHeight * 3 / 5;
    gameOver.classList.remove("fade");
    gameOver.style.opacity = 0;
    gameOver.style.display = 'none';
    buttons.style.visibility = 'hidden';
    kuro.style.opacity = 0;
    kuro.style.display = 'none';
    drawImages();
};

function draw() //繰り返し行いたい処理をここに書く
{
    endTime = new Date();
    if(endTime - startTime - 1000 >= loadTime && game == 0)
    {
      j -= 3;
      if(j > 0)
      {
        dLeftY[0] += window.innerHeight / j;
      }
      else
      {
        dLeftY[0] += window.innerHeight;
        if(flag == 0)flag = 1;
      }
    }
    else if(game == 1)
      {
        dLeftY[0] = window.innerHeight * 3 / 5 +  window.innerWidth / 20 * charactor.naturalHeight / charactor.naturalWidth - dHeight[0];
      }
    if(flag >= 1)
    {
      if(time[10 - flag] == 0)
      {
        if(flag < 8)
        dLeftX[11 - flag] = dx + ctx.measureText(Mozi[11 - flag]).width;
        else
        dLeftX[11 - flag] = dx + ctx.measureText(Mozi[10 - flag]).width;
        dLeftY[11 - flag] = dy;
        dX[11 - flag] = (x - dLeftX[11 - flag])/20;
        dY[11 - flag] = (y  - dLeftY[11 - flag])/20;
      }
      else
      {
        for(l = 1; l <= 10;l++)
          {
            dLeftX[11 - l] += dX[11 - l];
            dLeftY[11 - l] += dY[11 - l];
          }
      }
      if(game == 0)
        {
          time[10 - flag]++;
          if(time[10 - flag] >= 30 && flag < 10 )
          {
            flag++;
          }
        }
    }
    if(leftY > dLeftY[0] && leftY < dLeftY[0] + dHeight[0]) //ゲージとプレーヤーの当たり判定
      {
        if(Math.sign(dLeftX[0] + dWidth[0] - leftX) != Math.sign(dLeftX[0] - (leftX + window.innerWidth / 20)))
        //物体が重なっているときには、Bの右辺からAの左辺を引いた正負とBの左辺からAの右辺を引いた正負が異なることを利用して当たり判定を設定する
          {
            game = 1;
          }
      }
      for(k = 1; k <= 10; k++)
        {
          if(flag > 0 && leftX <= dLeftX[k] + ctx.measureText(Mozi2[k - 1]).width && dLeftX[k] <= leftX + window.innerWidth / 20) //文字とプレイヤーの当たり判定
          {
            if(leftY <= dLeftY[k] + ctx.measureText(Mozi2[k - 1]).width && dLeftY[k] <= leftY + window.innerWidth / 20 * charactor.naturalHeight / charactor.naturalWidth)
              //物体が重なっているときには、Bの右辺からAの左辺を引いた正負とBの左辺からAの右辺を引いた正負が異なることを利用して当たり判定を設定する
                {     
                  game = k + 1;
                }
          }
        }

    if(danEnd == false && game != 0)
    {
      End();
    }
        drawImages();
    window.requestAnimationFrame(draw);
}
draw();

function End()
        {
          if(danEnd == false)
          {
            kuro.style.opacity = 0;
            gameOver.style.opacity = 0;
            buttons.style.opacity = 0;
            kuro.style.display = 'block';
            gameOver.style.display = 'block';
            buttons.style.visibility = 'visible';
          }
          danEnd = true;
          gameOverEffect();
        }

function gameOverEffect()
{
  if(kuro.style.opacity < 0.3)
  {
    a += 0.01;
    kuro.style.opacity = a;
  }
  else if(gameOver.style.opacity < 1)
  {
    b += 0.02;
    gameOver.style.opacity = b;
  }
  else if(buttons.style.opacity < 1)
  {
    c += 0.02;
    buttons.style.opacity = c;
  }
  window.requestAnimationFrame(gameOverEffect);
}
//待機関数
function sleep(msec) 
{
  if(danEnd == true)
  {
    return 0;
  }
  return new Promise(function(resolve) {
  setTimeout(function() {resolve()}, msec);
  })
}
