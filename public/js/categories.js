import {tok} from "./token.js";
import { errCath } from "./errorCath.js";
/**
 * Функция выводит плейлисты в вкладку поиска
 */
async function categories(){
   await fetch('https://api.spotify.com/v1/browse/categories',{
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
        console.log(data);
        let mainDiv = document.createElement("div");
        mainDiv.classList.add("recommendationsLIST");

        let mainUl = document.createElement("ul");
        mainUl.classList.add("recommendationsLIST_ul");
        
        mainDiv.appendChild(mainUl);
        document.querySelector(".Recommendations_menu_div").appendChild(mainDiv);
        data.categories.items.forEach(element => {

            let new_li = document.createElement("li");

            let new_container = document.createElement("div");
            new_container.classList.add("recommendationsLIST_ul_li_div");
            
            let new_container_img = document.createElement("img");
            new_container_img.classList.add("recommendationsLIST_ul_li_div_IMG");
            
            // Не совсем понял о чем вы, но предположил, что это исправит
            if (!!element.icons){
                new_container_img.src = element.icons[0].url;
            }

            let new_container_div = document.createElement("div")
            new_container_div.classList.add("recommendationsLIST_ul_li_div_NAME");
            new_container_div.textContent = element.name;

            let new_container_span = document.createElement("span");
            new_container_span.classList.add("recommendationsLIST_ul_li_div_COMMENT");

            
            new_container.appendChild(new_container_img);
            new_container.appendChild(new_container_div);
            new_container.appendChild(new_container_span);
            new_li.appendChild(new_container);
            document.querySelector(".recommendationsLIST_ul").appendChild(new_li);
            });
    }).catch(function(error) {
        errCath(error);
    })
    
}

categories();

