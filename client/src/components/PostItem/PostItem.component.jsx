import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './PostItem.styles.scss';

const PostItem = ({ question: { id, question, question_description, tagname, username, user_id, answer_count, comment_count, created_at } }) => {
    const answerVoteUp = (
        <div className='vote answer'>
            <span className='vote-count fc-green-500'>{answer_count}</span>
            <div className='count-text'>answers</div>
        </div>
    )

    const answerVoteDown = (
        <div className='vote'>
            <span className='vote-count'>{answer_count}</span>
            <div className='count-text'>answers</div>
        </div>
    )

    return (
        <div className='posts'>
            <div className='stats-container fc-black-500'>
                <div className='stats'>
                    <div className='vote'>
                        <span className='vote-count'>{comment_count}</span>
                        <div className='count-text'>comments</div>
                    </div>
                    {answer_count > 0 ? answerVoteUp : answerVoteDown}
                    <div className='vote'>
                        <span className='vote-count'>{tagname ? 1 : 0}</span>
                        <div className='count-text'>tags</div>
                    </div>
                </div>
            </div>
            <div className='summary'>
                <h3><Link to={`/questions/${id}`}>
                    {question}
                </Link></h3>
                <div className='brief'>
                    {question_description.substring(0, 200)}...
                </div>
                <div className='question-tags'>
                    <Link className='s-tag' to={`/tags/${tagname}`}>
                        {tagname}
                    </Link>
                </div>
                <div className='question-user'>
                    <div className='user-info'>
                        <div className='user-action-time'>asked { moment(created_at).fromNow(true) } ago</div>
                        <div className='user-gravatar'>
                            <Link to={`/users/${user_id}`}>
                                
                            </Link>
                        </div>
                        <div className='user-details'>
                            <Link to={`/users/${user_id}`}>
                                {username}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

PostItem.propTypes = {
    question: PropTypes.object.isRequired
};


export default connect(null)(PostItem);