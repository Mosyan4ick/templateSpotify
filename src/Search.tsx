import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RCont, VoiceTrack } from './App';
import Error from './Error';


const Search = (props: any) => {
    const [item, setItem] = useState('');
    const [items, setItems] = useState([]);
    const token = useContext(RCont);
    const { linkTrack, setLinkTrack } = useContext(VoiceTrack);


    const hend = (event: any) => {
        setItem(event.target.value)
    }

    useEffect(() => {
        if (item != "" && token !== '') {
            fetch('https://api.spotify.com/v1/search?q=track:+' + item + '++&type=track', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                }
                else {
                    return res.json()
                }
            }).then((data) => {
                setItems(data.tracks.items);
            }).catch(function (error) {
                <Error err={error}></Error>
            });
        }
    }, [item, token])

    const res = () => {
        if (item == "") {
            return (
                <div></div>
            )
        }
        else {
            return (
                <div className="searchingBox">
                    {items.map((el: any) =>
                        <div className='search_container_div' key={el.id}>
                            <a onClick={() => {
                                if(el.preview_url){
                                    setLinkTrack(el)
                                }
                            }} className='search_container_content'>
                                <img className='search_container_img' src={el.album.images[0].url}></img>
                                <span className='search_container_name'>{el.name}</span>
                            </a>
                        </div>
                    )}
                </div>
            )
        }
    }

    const location = useLocation()
    if (location.pathname != "/category") {
        return (<div></div>);
    }
    else {
        return (<div>
            <input defaultValue="" className="searchLine" type="text" placeholder="Исполнитель,трек или подкаст" onKeyUp={hend}></input>
            {res()}
        </div>
        )
    }
}

export default Search;