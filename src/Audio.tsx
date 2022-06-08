import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { VoiceTrack } from "./App";

const MyAudio = () => {
    const [audio] = useState(() => new Audio())
    const { linkTrack, setLinkTrack } = useContext(VoiceTrack);
    const [playing, setPlaying] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (playing) {
            audio.play()
        }
        else {
            audio.pause()
        }
    }, [playing])

    if (linkTrack === null || location.pathname === "/error:status") {
        return (
            <div></div>
        )
    }
    else {
        audio.src = linkTrack.preview_url
        return (
            <div className="divButPlay">
                <button className="butPlay" onClick={() => { if (!playing) { setPlaying(true); } else { setPlaying(false); } }}>{!playing && "►"}{playing && "❚❚"}</button>
                <div className="play-name">{linkTrack.name}</div>
            </div>
        )
    }
}

export default MyAudio;
