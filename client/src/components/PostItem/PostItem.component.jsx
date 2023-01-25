import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './PostItem.styles.scss';

const PostItem = ({ question: { id, question, question_description, tagname, username, user_id, comment_count, created_at } }) => {
    return (
        <div className='posts'>
            <div className='stats-container fc-black-500'>
                <div className='stats'>
                    <div className='vote'>
                        <div className='count-text'>Question</div>
                    </div>
                    <div className='vote'>
                        <div className='count-text'>Description </div>
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
                        <div className='user-action-time'>asked {moment(created_at).fromNow(true)} ago</div>
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