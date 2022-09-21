import React from "react";
import './Player.css';

export class Player extends React.Component{

    

    render(){
        return (
            <div className="Player">
                <iframe src={this.props.currentSong}
                width="100%" height="380" frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" title="song">
                </iframe>
                <button className='PlayerButton' onClick={this.props.closePLayer}>CLOSE</button>
            </div>
        )
    }
}
