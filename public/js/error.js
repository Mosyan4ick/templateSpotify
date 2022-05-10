switch(window.localStorage.getItem("status")){
    case '401':
        document.querySelector(".mainMessage").textContent += ' ' + window.localStorage.getItem("status");
        document.querySelector(".spareMessage").textContent = "Ошибка на сервере";
        break;
    case '403':
        document.querySelector(".mainMessage").textContent += ' ' + window.localStorage.getItem("status");
        document.querySelector(".spareMessage").textContent = "Spotify недоступен в этой стране";
        break;
    case '400':
        document.querySelector(".mainMessage").textContent += ' ' + window.localStorage.getItem("status");
        document.querySelector(".spareMessage").textContent = "Некорректный запрос";
        break;
}
