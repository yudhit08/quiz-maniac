import React from "react";

function Score(props) {
    return (
        <div className='score-container'>
            <h3>
                Score: {Math.floor(eval(props.right/props.number * 100))}
            </h3>
        </div>
    );
}

export default Score
