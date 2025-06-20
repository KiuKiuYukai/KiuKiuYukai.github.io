const menu = document.getElementById('menu');
const sideBar = document.getElementById('sideBar');
const link = document.getElementsByClassName('Link');
let menuOpen = false;

//メニューバーを最初に非表示にする
sideBar.style.width = 0 + "%";

//メニューボタンがクリックされたときの挙動
window.addEventListener('click', (event) => {
  if(event.target.id == "menu" && menuOpen == false && sideBar.style.width == 0 + "%")
  {
    //メニューオープン
      menu.src = "assets/img/ノーマルの太さのバツアイコン.png";
      menu.style.top = 1 + "vw";
      menu.style.left = 0.5 + "vw";
      menu.style.width = 4 + "vw";
      sideBar.classList.add("menuOpen");
      sideBar.classList.remove("menuClose");
      setTimeout(function(){
          for(let i = 0; i < link.length; i++) link[i].style.display = 'block';
          menuOpen = true;
          sideBar.style.width = 20 + "%";
        } ,1000);
  }
  else if(menuOpen == true && sideBar.style.width == 20 + "%" && (event.target.id == "menu" || event.pageX > sideBar.getBoundingClientRect().right))
  {
    //メニュークローズ
      menu.src = "assets/img/26297099.png"
      menu.style.top = 1.5 + "vw";
      menu.style.left = 2 + "vw";
      menu.style.width = 8 + "vw";
      sideBar.classList.add("menuClose");
      sideBar.classList.remove("menuOpen");
      for(let i = 0; i < link.length; i++) link[i].style.display = 'none';
      menuOpen = false;
      setTimeout(function(){
          sideBar.style.width = 0 + "%";
        } ,1000);
  }
});