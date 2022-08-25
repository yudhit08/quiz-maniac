import React from "react";
import Button from '@mui/material/Button';

export default function Quiz(props) {
    const optionElements = props.options.map((opt) => {
        let clickAnswer;
        let styles;

        if (props.isOver) {
            if (opt === props.answer) {
                styles = {
                    backgroundColor: "#00c985",
                    color: "#fff",
                    border: "2px solid green"
                };
            } else if (props.selectedAnswer === opt) {
                styles = {
                    backgroundColor: "#F8BCBC",
                    color: "#293264",
                    border: "2px solid red",
                };
            }
        } else {
            clickAnswer = () => {
                props.setAnswer(props.id, opt);
            };
        }

        return (
            <div
                className={props.selectedAnswer === opt ? 'option selected' : 'option'}
                key={opt}
                onClick={clickAnswer}
                style={styles}
            >
                {opt}
            </div>
        );
    });

    function clearAnswer() {
        const handleClear = props.options.map(() => {
            props.setAnswer(props.id, '')
        })

        return handleClear
    }

    return (
        <div className='card-quiz' key={props.id}>
            <div className='questions'>
                <h3>{props.question}</h3>
            </div>
            <div className='option-container'>{optionElements}</div>
            {!props.isOver && <Button variant='text' className="clear-btn" onClick={clearAnswer}>clear</Button>}
        </div>
    );
}
