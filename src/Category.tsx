import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ElementFlags, isTemplateExpression } from 'typescript';
import tok from './App';

const Category = (props: { options: any }) => {
    
    if (props.options !== []) {
        return (
            <div>
                <div className="recommendationsLIST">
                    <ul className="recommendationsLIST_ul">
                        {props.options.map((element: any) =>
                            <li key = {element.id}>
                                <div className='recommendationsLIST_ul_li_div'>
                                    <img className='recommendationsLIST_ul_li_div_IMG' src={element.icons[0].url}></img>
                                    <div className='recommendationsLIST_ul_li_div_NAME'>{element.name}</div>
                                </div>
                            </li>
                        )
                        }

                    </ul>
                </div>
            </div>
        )
    }
    else {
        console.log("no");
        return (<div>Не найдено</div>)
    }
}

export default Category