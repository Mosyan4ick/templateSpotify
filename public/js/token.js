var client_id = "05a343f866334a1db3c0800095b80d17"
var client_secret = "a52cfac5c8cd42e5b59441d0597c5779"
/**
 * @returns Возвращает токен API для доступа к сервисам Spotify
 */
async function tok()  {
    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
        },
        body: 'grant_type=client_credentials'
            }).catch(function(error){
                switch(error) {
                    case 400:
                        window.localStorage.setItem("status","400");
                        window.location.href = "http://localhost:3000/error.html";
                        break;
                    case 401:
                        window.localStorage.setItem("status","401");
                        window.location.href = "http://localhost:3000/error.html";
                        break;
                    case 403:
                        window.localStorage.setItem("status","403");
                        window.location.href = "http://localhost:3000/error.html";
                        break;
                }
            })

            const data = await res.json();
            return data.access_token;
        }

export{tok,client_id,client_secret};

