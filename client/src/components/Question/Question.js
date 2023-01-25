import React from 'react'
import './question.css'
import Icon from '../../asset/image/question.png'
import { Link } from 'react-router-dom'
import Answer from '../Answer/Answer'
function Question({ id, question, question_description, username, tagname, created_at }) {

    return (
        <Link className='link_wrapper' to={`/questions/${id}`}>
            <div className='question__shelf'>
                {/* <img className='question_avatar' src={Icon} alt="" /> */}

                <div className="question">
                    <div className="question-and-date">
                        <div className="question_title">
                            <h2>{question}</h2>
                        </div>
                        <div className='created-at'>
                            <h5>{created_at}</h5>
                        </div>
                    </div>

                    <small>{username}</small>
                    <hr />
                    <div className="question__description">
                        <p>{question_description.substring(0, 200)}...</p>
                    </div>


                </div>
            </div>


        </Link>
    )
}

export default Question
