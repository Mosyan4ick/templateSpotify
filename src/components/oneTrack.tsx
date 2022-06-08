import React from 'react';

function OneTrack() {
    return (
        <li>
            <div className="recommendationsLIST_ul_li_div">
                <img className="recommendationsLIST_ul_li_div_IMG" src="img/cat_1.jpg" alt="Картинка котика"></img>
                <div className="recommendationsLIST_ul_li_div_NAME">
                    Жизнь котейки
                </div>
                <span className="recommendationsLIST_ul_li_div_COMMENT">
                    Лучшая музыка для ваших питомцев
                </span>
            </div>
        </li>
    )
}

export default OneTrack;