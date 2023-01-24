import React from 'react'
import './question.css'
import Icon from '../../asset/image/question.png'
import { Link } from 'react-router-dom'
function Question({ id, question, question_description, username }) {

    return (
        <Link Link to={`/questions/${id}`}>
            <div className='question__shelf'>
                <img className='question_avatar' src={Icon} alt="" />

                <div className="question">
                    <div className="question_title">
                        <h2>{question}</h2>
                        <small>{username}</small>
                    </div>

                    <div className="question__description">
                        <p>{question_description}</p>
                    </div>


                </div>
            </div>

        </Link>
    )
}

export default Question
