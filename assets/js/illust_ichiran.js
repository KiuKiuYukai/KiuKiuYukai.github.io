let img_element = new Array();
const menu = document.getElementById('menu');
const sideBar = document.getElementById('sideBar');
const link = document.getElementsByClassName('Link');
const storage = sessionStorage;
let menuOpen = false;
let content_area = document.getElementById("content_area");
let i = 1;

async function loop()
{
    img_element[i] = document.createElement('img');
    img_element[i].src = "assets/img/illust/" + i + ".png";
    console.log(img_element[i].src);  
    if(i <= parseInt(storage.getItem(0)))
    {
       
        img_element[i].classList.add("gazo");
        content_area.appendChild(img_element[i]);
        i++;
        window.requestAnimationFrame(loop);
    }
    else
    {

    }
    
}
loop();

window.onload = () =>
    {
      sideBar.style.width = 0 + "%";
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
    
