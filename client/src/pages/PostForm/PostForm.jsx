import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addQuestion } from '../../redux/questions/questions.action';

import './QuestionForm.styles.scss';
import Youtube from '../../components/Youtube/Youtube';

const PostForm = ({ auth: { isAuthenticated, loading }, addQuestion }) => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        question: '',
        question_description: '',
        tagname: ''
    });

    const { question, question_description, tagname } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        addQuestion({ question, question_description, tagname });
        setFormData({
            question: '',
            question_description: '',
            tagname: ''
        });
    };

    if (!isAuthenticated) {
        return navigate('/login')
    }

    return loading === null ? <Fragment>Loading...</Fragment> : <Fragment>
        <div className='post-form-container'>
            <div className='post-form-content'>
                <div className='post-form-header'>
                    <div className='post-form-headline title-desc fc-black-800'>
                        Ask a question
                    </div>
                </div>
                <div className='post-form-section'>
                    <div className='postform' style={{ width: '100%' }}>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className='question-form p16 s-card'>
                                <div className='question-layout'>
                                    <div className='title-grid'>
                                        <label className='form-label s-label'>
                                            Question
                                            <p className='title-desc fs-caption fc-black-700'>
                                                Ask your question here
                                            </p>
                                        </label>
                                        <input
                                            className='title-input s-input'
                                            type='text'
                                            name='question'
                                            value={question}
                                            onChange={e => onChange(e)}
                                            id='question'
                                            placeholder='Please write your question here!'
                                        />
                                    </div>
                                    <div className='body-grid '>
                                        <label className='form-label s-label fc-black-700'>
                                            Description
                                            <p className='body-desc fw-normal fs-caption fc-black-800'>Include all the information someone would
                                                need to answer your question</p>
                                        </label>
                                        <textarea
                                            className='s-textarea'
                                            name='question_description'
                                            cols='30'
                                            rows='9'
                                            value={question_description}
                                            onChange={e => onChange(e)}
                                            placeholder='Enter description with minimum 30 characters'
                                            id='question_description'
                                        >
                                        </textarea>
                                    </div>
                                    <div className='tag-grid'>
                                        <label className='form-label s-label'>
                                            Tag Name
                                            <p className='tag-desc fw-normal fs-caption'>
                                                Add up to 5 tags to describe what your question is about
                                            </p>
                                        </label>
                                        <input
                                            className='tag-input s-input'
                                            type='text'
                                            name='tagname'
                                            value={tagname}
                                            onChange={e => onChange(e)}
                                            id='tagname'
                                            placeholder='Javascript'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='post-button mt32'>
                                <button className='bn632-hover bn23 s-btnt s-btn__primary' id='submit-button' name='submit-button'>Send your question</button>
                            </div>
                        </form>
                    </div>
                    <aside>
                        <div className='right-panel'>
                            <div className='widget'>
                            <Youtube />
                                {/* <div className='s-sidebarwidget--header'>
                                    Step 1: Draft your question
                                </div>
                                <div className='widget-content fc-black-800'>
                                    <div className='summary'>
                                        <p className='sec1'>
                                            The community is here to help you with specific coding, algorithm, or language problems.
                                        </p>
                                        <p className='sec2'>
                                            Avoid asking opinion-based questions.
                                        </p>
                                    </div>
                                    <ol className='step-section'>
                                        <li className='step'>
                                            <button >
                                                <div className='step-cell'>
                                                    <div>
                                                        <img src='https://cdn.sstatic.net/Img/list-1.svg?v=e8dd475ba207' width='16' height='16' alt='1.' />
                                                    </div>
                                                    <span>Summarize the problem</span>
                                                </div>
                                            </button>
                                            <div className='inst'>
                                                <div className='inst-content'>
                                                    <ul>
                                                        <li><p>Include details about your goal</p></li>
                                                        <li><p>Describe expected and actual results</p></li>
                                                        <li><p className='except'>Include any error messages</p></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className='step'>
                                            <button>
                                                <div className='step-cell'>
                                                    <div>
                                                        <img src='https://cdn.sstatic.net/Img/list-2.svg?v=9382fc2c3631' width='16' height='16' alt='2.' />
                                                    </div>
                                                    <span>Summarize the problem</span>
                                                </div>
                                            </button>
                                            <div className='inst'>
                                                <div className='inst-content'>
                                                    <p className='step2'>
                                                        Show what you’ve tried and tell us what you found (on this site or elsewhere) and why it didn’t meet your needs. You can get better answers when you provide research.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li style={{ borderBottomRightRadius: '3px', borderBottomLeftRadius: '3px' }} className='step except-step'>
                                            <button>
                                                <div className='step-cell'>
                                                    <div>
                                                        <img src='https://cdn.sstatic.net/Img/list-3.svg?v=323a95564232' width='16' height='16' alt='3.' />
                                                    </div>
                                                    <span>Summarize the problem</span>
                                                </div>
                                            </button>
                                            <div className='inst'>
                                                <div className='inst-content'>
                                                    <p className='step3'>
                                                        When appropriate, share the minimum amount of code others need to reproduce your problem (also called a minimum, reproducible example)
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div> */}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </Fragment>
};

PostForm.propTypes = {
    addQuestion: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addQuestion })(PostForm);