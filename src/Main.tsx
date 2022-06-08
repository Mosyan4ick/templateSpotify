import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { idText } from 'typescript';
import OneTrack from './components/oneTrack';
import PlaylistName from './components/PlaylistName';
import { VoiceTrack } from './App';

const Main = (props: { options: any }) => {
    const { linkTrack, setLinkTrack } = useContext(VoiceTrack);
    if (props.options !== []) {
        return (
            <div className='Recommendations_menu_div'>
                {props.options.map((element: any) =>
                    <div key={element.id}>
                        <div className='recommendations_div_header'>
                            <h2 className='recommendations_div_h2'>
                                <a className='recommendations_div_a'>{element.name}</a>
                            </h2>
                            <a className='recommendations_div_a'>
                                <span className='recommendations_div_a_span'>Все</span>
                            </a>
                        </div>
                        <div className="recommendationsLIST">
                            <ul className="recommendationsLIST_ul this_ul">
                                {element.tracks.items.map((track: any) =>
                                    <li key={track.id} onClick={()=>{
                                        if(track.preview_url){
                                            setLinkTrack(track)
                                        }
                                    }}>
                                        <div className="recommendationsLIST_ul_li_div">
                                            <img className="recommendationsLIST_ul_li_div_IMG" src={element.images[0].url   } alt="Картинка котика"></img>
                                            <div className="recommendationsLIST_ul_li_div_NAME">
                                                {track.name}
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                )
                }
            </div>
        )
    }
    else {
        return (<div>Не найдено</div>)
    }
}

export default Main