import React, { useState } from "react";
import './teams.css';

function Teams(){
    return(
        <div className="container">
            <div className="team-DAL">
                <span>Dallas</span>
                <img className="team-logo" src="./dal.png" alt=""></img>
            </div>
            <div className="team-LAL">
                <span>Los Angeles Lakers</span>
                <img className="team-logo" src="./images/dal.png" alt=""></img>
            </div>
        </div>
    );
}
export default Teams