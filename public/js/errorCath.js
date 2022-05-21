const errorHref = "http://localhost:3000/error.html"

function errCath(error){
    switch(error) {
        case 400:
            window.localStorage.setItem("status","400");
            window.location.href = errorHref;
            break;
        case 401:
            window.localStorage.setItem("status","401");
            window.location.href = errorHref;
            break;
        case 403:
            window.localStorage.setItem("status","403");
            window.location.href = errorHref;
            break;
    }
}
export{errCath}