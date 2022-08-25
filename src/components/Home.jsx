import React from "react";
import { Link } from "react-router-dom";
import ParticlesBg from "particles-bg";
import Button from "@mui/material/Button"

export default function Start(props) {
    return (
        <div className='home'>
            <div className='home-title'>
                <h2>Quiz Maniac</h2>
                <h4>Start a quiz and improve your knowledge</h4>
            </div>
            <Link to='/set-quiz'>
                <Button className='start-btn' variant='contained' onClick={props.startFunc}>Get Started</Button>
            </Link>
            <ParticlesBg type='cobweb' bg={true} />
        </div>
    );
}
