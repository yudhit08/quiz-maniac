import React, { useState } from "react";
import { Link } from "react-router-dom";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function SetQuiz(props) {
    const [isSet, setIsSet] = useState(true)
    const [apiData, setApiData] = useState({
        number: 5,
        category: "Any Category",
        difficulty: "Any Difficulty",
        type: "Any Type",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        if(name === 'number' && (value < 1 || value > 50)) {
            setIsSet(false)
        } else {
            setIsSet(true)
        }
        setApiData((prevApiData) => {
            return {
                ...prevApiData,
                [name]: value,
            };
        });
    }

    function checkInputValue() {
        if(apiData.number < 1 || apiData.number > 50) {
            return (
                <TextField
                    error
                    inputProps={{ type: "number", min: "1", max: "50" }}
                    id='outlined-error-helper-text'
                    label='Number of Question'
                    value={apiData.number}
                    onChange={handleChange}
                    helperText='Value must be between 1 and 50'
                    name='number'
                />
            );
        } else {
            return (
                <TextField
                    inputProps={{ type: "number", min: "1", max: "50" }}
                    name='number'
                    value={apiData.number}
                    onChange={handleChange}
                    id='outlined-basic'
                    label='Number of Question'
                    variant='outlined'
                />
            )
        }
    }

    return (
        <div className='set-quiz-container'>
            <h1>Set your Quiz</h1>
            <FormControl>
                {checkInputValue()}
            </FormControl>
            <FormControl>
                <InputLabel htmlFor='category'>Select Category</InputLabel>
                <Select
                    name='category'
                    id='category'
                    value={apiData.category}
                    onChange={handleChange}
                    input={<OutlinedInput label='Select Category' />}
                >
                    <MenuItem value='Any Category'>Any Category</MenuItem>
                    <MenuItem value='9'>General Knowledge</MenuItem>
                    <MenuItem value='10'>Entertainment: Books</MenuItem>
                    <MenuItem value='11'>Entertainment: Film</MenuItem>
                    <MenuItem value='12'>Entertainment: Music</MenuItem>
                    <MenuItem value='13'>
                        Entertainment: Musicals &amp; Theatres
                    </MenuItem>
                    <MenuItem value='14'>Entertainment: Television</MenuItem>
                    <MenuItem value='15'>Entertainment: Video Games</MenuItem>
                    <MenuItem value='16'>Entertainment: Board Games</MenuItem>
                    <MenuItem value='17'>Science &amp; Nature</MenuItem>
                    <MenuItem value='18'>Science: Computers</MenuItem>
                    <MenuItem value='19'>Science: Mathematics</MenuItem>
                    <MenuItem value='20'>Mythology</MenuItem>
                    <MenuItem value='21'>Sports</MenuItem>
                    <MenuItem value='22'>Geography</MenuItem>
                    <MenuItem value='23'>History</MenuItem>
                    <MenuItem value='24'>Politics</MenuItem>
                    <MenuItem value='25'>Art</MenuItem>
                    <MenuItem value='26'>Celebrities</MenuItem>
                    <MenuItem value='27'>Animals</MenuItem>
                    <MenuItem value='28'>Vehicles</MenuItem>
                    <MenuItem value='29'>Entertainment: Comics</MenuItem>
                    <MenuItem value='30'>Science: Gadgets</MenuItem>
                    <MenuItem value='31'>
                        Entertainment: Japanese Anime &amp; Manga
                    </MenuItem>
                    <MenuItem value='32'>
                        Entertainment: Cartoon &amp; Animations
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor='difficulty'>Select Difficulty</InputLabel>
                <Select
                    name='difficulty'
                    id='difficulty'
                    value={apiData.difficulty}
                    onChange={handleChange}
                    input={<OutlinedInput label='Select Difficulty' />}
                >
                    <MenuItem value='Any Difficulty'>Any Difficulty</MenuItem>
                    <MenuItem value='easy'>Easy</MenuItem>
                    <MenuItem value='medium'>Medium</MenuItem>
                    <MenuItem value='hard'>Hard</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor='type'>Select Type</InputLabel>
                <Select
                    name='type'
                    id='type'
                    value={apiData.type}
                    onChange={handleChange}
                    input={<OutlinedInput label='Select Type' />}
                >
                    <MenuItem value='Any Type'>Any Type</MenuItem>
                    <MenuItem value='multiple'>Multiple Choice</MenuItem>
                    <MenuItem value='boolean'>True &amp; False</MenuItem>
                </Select>
            </FormControl>
            <div className='btn-container'>
                <Link to='/'>
                    <Fab size='medium' aria-label='back'>
                        <ArrowBackIcon />
                    </Fab>
                </Link>
                <Link to={isSet ? '/play-quiz' : ''}>
                    <Button
                        className='start-btn'
                        variant='contained'
                        onClick={() =>
                            props.handleApiData(
                                apiData.number,
                                apiData.category,
                                apiData.difficulty,
                                apiData.type
                            )
                        }
                    >
                        Start
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default SetQuiz;
