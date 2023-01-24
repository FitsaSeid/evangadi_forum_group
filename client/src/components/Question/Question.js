import React from 'react'
import './question.css'
import question from '../../asset/image/question.png'
import { Link } from 'react-router-dom'
function Question({id, title, description, answerCount }) {


    return (
        <Link Link to ={`/questions/${id}`}>
            <div className='question__shelf'>
                <img className='question_avatar' src={question} alt="" />

                <div className="question">
                    <div className="question_title">
                        <h2>{title}</h2>
                    </div>

                    <div className="question__description">
                        <p>{description}</p>
                    </div>

                    <div className="question__answer__count">
                        <p>{answerCount} - answers</p>
                    </div>
                </div>
            </div>

        </Link>
    )
}

export default Question
