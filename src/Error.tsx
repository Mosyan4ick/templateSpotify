import React from 'react';

function Error(props: { err: any }) {
    return (
        <div className="divMessage">
            <h1 className="mainMessage">Ошибка</h1>
            <a className="aMessage" href="./index.html">
                <span className="spareMessage">Ошибка {props.err}</span>
                <button className="buttonMessage">Попробовать еще раз</button>
            </a>
        </div>
    )
}

export default Error