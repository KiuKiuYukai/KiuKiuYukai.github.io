let img_element = new Array();
const image = document.getElementById("image");
const data = document.getElementById("data");
const comment = document.getElementById("comment")
let content_area = document.getElementById("content_area");
let i = 0;
const storage = sessionStorage;
const list1 = JSON.parse(storage.getItem('list1'));
console.log(list1[0].date);
async function loop()
{
    if(i < list1.length)
    {
        img_element[i] = document.createElement('img');
        img_element[i].src = "https://lh3.googleusercontent.com/d/" + list1[i].link;
        img_element[i].classList.add("gazo");
        img_element[i].id = i;
        content_area.appendChild(img_element[i]);
        i++;
    }
    window.requestAnimationFrame(loop);
    
}
loop();

 window.addEventListener('click', (event) => {
                if(event.target.id >= 0 && event.target.id < list1.length)
                    {
                        image.src = "https://lh3.googleusercontent.com/d/" + list1[event.target.id].link;
                        data.innerHTML = "Num : " + (parseInt(event.target.id) + 1) + " / " + list1.length + " Date : " + list1[event.target.id].date;
                        comment.innerHTML = list1[event.target.id].des;
                        window.scrollTo(0 , 0);
                    }
            });

function clickModoru()
{
    window.location.href = 'illust_introduce.html';
}