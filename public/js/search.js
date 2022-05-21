import { tok } from "./token.js";
import { errCath } from "./errorCath.js";

/**
 * Обеспечивает задержку между поисковыми запросами.
 * @param {*} fn Функция, запросы которой нужно разделить
 * @param {*} ms Кол-во миллисекунд 
 * @returns Вызов функции с задержкой
 */
 const debounce = (fn, ms) => {
    let timeout;
    return function () {
      const fnCall = () => { fn.apply(this, arguments) }
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms)
    };
  }

/**
 * Функция для поиска по трекам
 */
async function search () {
    if(document.querySelector(".searchLine").value!=""){
        document.querySelector(".searchingBox").style.display = 'flex';
       let params = new URLSearchParams({ q: "track\:"+document.querySelector(".searchLine").value, type: "track" });
        fetch('https://api.spotify.com/v1/search?'+params.toString(),{
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ await tok()
            }
        }).then((res)=>{
            if(!res.ok){
                return Promise.reject(res.status);
            }
            else{
                return res.json();
            }
        }).then((data)=>{
            const search_container = document.querySelector(".searchingBox");
            while(search_container.firstChild){
                search_container.removeChild(search_container.firstChild);
            }
            data.tracks.items.forEach(element => {
                const search_container_a = document.createElement("a");
                search_container_a.classList.add("search_container_a");
                
                const search_container_div = document.createElement("div");
                search_container_div.classList.add("search_container_div");

                search_container_div.addEventListener("click", function(){
                    let aud = document.querySelector(".aud");
                    aud.src = element.preview_url;
                });

                const search_container_img = document.createElement("img");
                search_container_img.classList.add("search_container_img");
                search_container_img.src = element.album.images[0].url;

                const search_container_span = document.createElement("span");
                search_container_span.classList.add("search_container_span");
                search_container_span.textContent = element.name;

                search_container_a.appendChild(search_container_img);
                search_container_a.appendChild(search_container_span);
                search_container_div.appendChild(search_container_a);
                search_container.appendChild(search_container_div);
            });
        }).catch(function(error){
            errCath(error);
        });
    }
    else {
        document.querySelector(".searchingBox").style.display = 'none';
    }
};


search = debounce(search, 300);


document.querySelector(".searchLine").addEventListener("keyup", async () => {
        await search();
        
})
