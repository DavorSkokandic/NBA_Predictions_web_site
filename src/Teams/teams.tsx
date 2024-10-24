import React, { useState } from "react";
import './teams.css';

function Teams(){
    return(
        <div className="container">
            <div className="team">
                <span>Dallas</span>
                <img className="team-logo" src="./images/dal.png"></img>
            </div>
            <div className="team">
                <span>Los Angeles Lakers</span>
                <img className="team-logo" src="./images/dal.png"></img>
            </div>
        </div>
    );
}
export default Teams