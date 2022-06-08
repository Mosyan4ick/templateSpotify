import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Main from './Main';
import Error from './Error';
import Category from './Category';
import Search from './Search';
import TypeForAudio from './TypeForAudio';
import HelpType from './HelpType';
import MyAudio from './Audio';
export const RCont = React.createContext<string>("");
export const VoiceTrack = React.createContext<TypeForAudio>({} as TypeForAudio);
function App() {

    let client_id = "05a343f866334a1db3c0800095b80d17"
    let client_secret = "a52cfac5c8cd42e5b59441d0597c5779"



    const [tok, setTok] = useState('');
    const [categories, setCategories] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [linkTrack, setLinkTrack] = useState<HelpType>({} as HelpType);
    const value = useMemo(() => ({ linkTrack, setLinkTrack }), [linkTrack]);

    useEffect(() => {
        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
            },
            body: 'grant_type=client_credentials'
        }).then((res) => {
            if (!res.ok) {
                return Promise.reject(res.status);
            }
            else {
                return res.json();
            }
        }).then((data) => {
            setTok(data.access_token);
            fetch('https://api.spotify.com/v1/browse/categories', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + data.access_token
                }
            }).then((res) => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                }
                else {
                    return res.json();
                }
            }).then((data) => {
                setCategories(data.categories.items);
            }).catch(function(error){
                console.log("Ошибка " + error)
            })

            fetch('https://api.spotify.com/v1/albums?ids=5r36AJ6VOJtp00oxSkBZ5h,6z0HnebcVUIyPCaewpjyNX,3zNNrndqM4v0WP9fS4qDBo,4ktDOYU0Jual1ELFTPhFd6', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + data.access_token
                }
            }).then((res) => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                }
                else {
                    return res.json();
                }
            }).then((data) => {
                setAlbums(data.albums);
            }).catch(function(error){
                console.log("Ошибка " + error);
            })

        }).catch(function (error) {
            console.log(error);
        })
    }, [client_id])


    return (
        <div className="App">
            <Router>
                <VoiceTrack.Provider value ={value} >
                    <RCont.Provider value={tok}>
                        <header className="header">
                            <nav className="left_menu_nav">
                                <a>
                                    <img className="logo" src="./img/spoty.png"></img>
                                </a>
                                <ul className="left_menu this_ul">
                                    <li className="left_menu_liElement"><svg role="img" height="24" width="24" className="Svg-sc-1bi12j5-0 hDgDGI home-active-icon img_left left_menu_svgImg" viewBox="0 0 24 24"><path fill="white" d="M21 22V7.174l-9.001-5.195L3 7.214V22h7v-7h4v7z"></path></svg><Link className="left_menu_link" to="/">Главная</Link></li>
                                    <li className="left_menu_liElement"><svg role="img" height="24" width="24" className="Svg-sc-1bi12j5-0 hDgDGI search-icon img_left left_menu_svgImg" viewBox="0 0 24 24"><path fill="white" d="M16.387 16.623A8.47 8.47 0 0019 10.5a8.5 8.5 0 10-8.5 8.5 8.454 8.454 0 005.125-1.73l4.401 5.153.76-.649-4.399-5.151zM10.5 18C6.364 18 3 14.636 3 10.5S6.364 3 10.5 3 18 6.364 18 10.5 14.636 18 10.5 18z"></path></svg><Link className="left_menu_link" to="/category">Поиск</Link></li>
                                    <li className="left_menu_liElement"><svg role="img" height="24" width="24" className="Svg-sc-1bi12j5-0 hDgDGI collection-icon img_left left_menu_svgImg" viewBox="0 0 24 24"><path fill="white" d="M13.66 4.097l-.913.406 7.797 17.513.914-.406L13.66 4.097zM3 22h1V4H3v18zm6 0h1V4H9v18z"></path></svg><Link className="left_menu_link" to="/">Моя медиатека</Link></li>
                                </ul>
                                <div className="two_buttons_menu">  
                                    <button className="add_playlist">
                                        <div className="add_playlist_div_for_svg">
                                            <div className="add_playlist_div_for_svg_under">
                                                <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-1bi12j5-0 hDgDGI"><path className="path_playlist" d="M15.25 8a.75.75 0 01-.75.75H8.75v5.75a.75.75 0 01-1.5 0V8.75H1.5a.75.75 0 010-1.5h5.75V1.5a.75.75 0 011.5 0v5.75h5.75a.75.75 0 01.75.75z"></path></svg>
                                            </div>
                                        </div>
                                        <span className="add_playlist_text">Создать плейлист</span>
                                    </button>
                                    <button className="favorite_tracks">
                                        <div className="favorite_tracks_div_for_svg">
                                            <div className="favorite_tracks_div_for_svg_under">
                                                <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-1bi12j5-0 hDgDGI"><path className="path_favorite_tracks" d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path></svg>
                                            </div>
                                        </div>
                                        <span className="favorite_tracks_text">Любимые треки</span>
                                    </button>
                                </div>
                            </nav>

                        </header>

                        <main className="central_menu">
                            <nav className="central_menu_nav">
                                <div className="left">
                                    <button className="left_but">
                                        <svg role="img" focusable="false" height="24" width="24" viewBox="0 0 24 24" className="Svg-ytk21e-0 dMCjEC TAwjQ24UpWZGFAfa7bQ3"><polyline points="16 4 7 12 16 20" fill="none" stroke="white"></polyline></svg>
                                    </button>
                                    <button className="left_but">
                                        <svg role="img" focusable="false" height="24" width="24" viewBox="0 0 24 24" className="Svg-ytk21e-0 dMCjEC TAwjQ24UpWZGFAfa7bQ3"><polyline points="8 4 17 12 8 20" fill="none" stroke="white"></polyline></svg>
                                    </button>
                                    <Search></Search>
                                </div>
                                <div className="rigth">
                                    <button className="right_but registr">ЗАРЕГЕСТРИРОВАТЬСЯ</button>
                                    <button className="right_but join">ВОЙТИ  </button>
                                </div>
                            </nav>
                            <Routes>
                                {/* <Route path='/error:tracks' element={<Error />}>
                                </Route> */}
                                <Route path='/category' element={<Category options={categories} />}>
                                </Route>
                                <Route path="/" element={<Main options={albums} />}>
                                </Route>
                            </Routes>
                            <MyAudio></MyAudio>
                        </main >

                        <footer className="footer">
                            <div className="footer_div_up">
                                <div className="footer_div_under">
                                    <p className="footer_text_one">ПРЕДВАРИТЕЛЬНЫЙ ПРОСМОТР SPOTOFY</p>
                                    <p className="footer_text_two">Зарегестрируйся, чтобы слушать музыку и подкасты без ограничений. Иногда мы будем показывать вам рекламу, но ты сможешь пользоваться сервисом бесплатно!</p>
                                </div>
                                <button className="footer_register_button">ЗАРЕГЕСТРИРОВАТЬСЯ</button>
                            </div>
                        </footer>
                    </RCont.Provider>
                </VoiceTrack.Provider>
            </Router>
        </div>

    );
}

export default App;
