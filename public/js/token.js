import { errCath } from "./errorCath.js";
import { client_id, client_secret } from "./key.js";

async function token(){
    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
        },
        body: 'grant_type=client_credentials'
            }).catch(function(error){
                errCath(error);
            })
            const data = await res.json();
            var datAccessTok = data.access_token;
            window.localStorage.setItem("token", datAccessTok);
            window.localStorage.setItem('tokenTime', +new Date());
            return datAccessTok;
}

/**
 * @returns Возвращает токен API для доступа к сервисам Spotify
 */
async function tok()  {
    if (window.localStorage.getItem("tokenTime") != null){
        let tokenTime = window.localStorage.tokenTime;
        let checkTime =  !((+new Date() - tokenTime) > 3600 * 1000);
        if (!checkTime)
        {
            window.localStorage.clear;
        }
        if((window.localStorage.getItem("token") != null) && (checkTime))
        {
            return window.localStorage.token;
        }
        else
        {
            return token();
        }
    }
    else{
        return token();
    }
}

export{tok,client_id,client_secret};

