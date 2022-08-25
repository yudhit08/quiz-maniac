import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { nanoid } from "nanoid";
import swal from "sweetalert";
import { Triangle } from "react-loader-spinner";
import Button from "@mui/material/Button";

import Home from "./components/Home";
import Quiz from "./components/Quiz";
import SetQuiz from "./components/SetQuiz";
import Score from "./components/Score";

import "./App.css";

export default function App() {
    const [datas, setDatas] = useState([]);
    const [isOver, setIsOver] = useState(false);
    const [score, setScore] = useState(0);
    const [play, setPlay] = useState(true);
    const [loader, setLoader] = useState(false);
    const [api, setApi] = useState("https://opentdb.com/api.php?amount=5");
    let number;

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * arr.length);
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    function handleApiData(number, category, difficulty, type) {
        let categoryApi =
            category === "Any Category" ? "" : `&category=${category}`;
        let difficultyApi =
            difficulty === "Any Difficulty" ? "" : `&difficulty=${difficulty}`;
        let typeApi = type === "Any Type" ? "" : `&type=${type}`;
        setApi(
            `https://opentdb.com/api.php?amount=${number}${categoryApi}${difficultyApi}${typeApi}`
        );
        setPlay((prevPlay) => !prevPlay);
    }

    useEffect(() => {
        async function getDataApi() {
            setLoader(true);
            const res = await fetch(api);
            setLoader(false);
            const data = await res.json();
            number = 1;
            setDatas(
                data.results.map((data) => {
                    function decodeHtml(html) {
                        var txt = document.createElement("textarea");
                        txt.innerHTML = html;
                        return txt.value;
                    }
                    return {
                        question: number++ + ". " + decodeHtml(data.question),

                        answer: decodeHtml(data.correct_answer),

                        options: shuffleArray(
                            data.incorrect_answers.concat(data.correct_answer)
                        ),
                        selected_answer: "",
                        id: nanoid(),
                    };
                })
            );
        }
        getDataApi();
    }, [play]);

    //to save selected answer
    const setSelectAnswer = (id, answer) => {
        setDatas((prevDatas) => {
            return prevDatas.map((question) => {
                return question.id === id
                    ? { ...question, selected_answer: answer }
                    : question;
            });
        });
    };

    //quizElements that is passed into Quiz component
    const quizElements = datas.map((data) => {
        return (
            <Quiz
                key={data.id}
                id={data.id}
                question={data.question}
                answer={data.answer}
                options={data.options}
                selectedAnswer={data.selected_answer}
                isOver={isOver}
                setAnswer={setSelectAnswer}
            />
        );
    });

    //to check if all questions are answered
    const checkIfOver = () => {
        if (
            datas.length > 0 &&
            datas.every((data) => data.selected_answer !== "")
        ) {
            setIsOver(true);
            window.scrollTo({top:0})
        } else {
            swal("Perhatian", "isi semua pertanyaan", "warning");
        }
    };

    useEffect(() => {
        let totalScore = 0;
        if (isOver) {
            for (let i = 0; i < datas.length; i++) {
                if (datas[i].selected_answer === datas[i].answer) {
                    totalScore++;
                }
            }
            setScore(totalScore);
        }
    }, [isOver, datas]);

    const loaderAnimation = (
        <Triangle
            height='80'
            width='80'
            color='#3B9AE1'
            ariaLabel='triangle-loading'
            wrapperStyle={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            wrapperClassName=''
            visible={true}
        />
    );

    function mainElements() {
        return (
            <div className='container'>
                {isOver && <Score right={score} number={datas.length} />}
                <div className='quiz-container'>
                    <header>
                        <Link to='/'>Quiz Maniac</Link>
                    </header>
                    {quizElements}
                </div>

                {isOver ? (
                    <Link to='/set-quiz'>
                        <Button
                            className='restart-btn'
                            variant='contained'
                            onClick={() => {
                                setIsOver(false);
                                setPlay((prevPlay) => !prevPlay);
                            }}
                        >
                            Play Again
                        </Button>
                    </Link>
                ) : (
                    <Button
                        className='submit-btn'
                        variant='contained'
                        onClick={checkIfOver}
                    >
                        Finish Quiz
                    </Button>
                )}
            </div>
        );
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route
                        path='/set-quiz'
                        element={<SetQuiz handleApiData={handleApiData} />}
                    ></Route>
                    <Route
                        path='/play-quiz'
                        element={loader ? loaderAnimation : mainElements()}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
