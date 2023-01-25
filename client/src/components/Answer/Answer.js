import React from 'react'
import './answer.css'

function Answer() {
    return (
        <>
            <div className='answer_title'>
                <h3>Question</h3>
                <h6>Question title</h6>
                <p>Question Description: </p>

                <h3>Answer:</h3>
            </div>

//ANSWER PAGE SKELETON
            <div className='answer__container'>
                <form>
                    <textarea name="" id="answer_text" placeholder='Write your answer here'></textarea>
                    <button className='answer_submit' type='submit'>Submit Answer</button>
                </form>
            </div>
        </>
    )
}

export default Answer
