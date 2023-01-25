import React, {useEffect,Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../../redux/questions/questions.action';
import { Link } from 'react-router-dom';

// import SideBar from '../../components/SideBar/SideBar.component';
import PostItem from '../../components/PostItem/PostItem.component';
// import RightSideBar from '../../components/right-sideBar/right-sideBar.component';

import './QuestionsPage.styles.scss'


const QuestionsPage = ({ getQuestions, question: { questions, loading }  }) => {
    useEffect(() => {
        getQuestions();
    }, [getQuestions ]);

    return loading || questions === null ? <Fragment>Loading...</Fragment> : <Fragment>
        <div className='page'>
            {/* <SideBar/> */}
            <div id="content">
                <div id='mainbar' className='questions-page fc-black-800'>
                    <div className='questions-grid'>
                        <h3 className='questions-headline'>All Questions</h3>
                        <div className='questions-btn'>
                            <Link to='/add/question'>
                                <button className = 's-btn s-btn__primary'>Ask Question</button>
                            </Link>
                        </div>
                    </div>
                    {/* <div className='questions-tabs'>
                        <span>19,204,360 questions</span>
                    </div> */}
                    <div className='questions'>
                        {questions.map(question => (
                            <PostItem key={question.id} question={question} />))}
                    </div>
                </div>
                {/* <RightSideBar/> */}
            </div>
        </div>
        </Fragment>
};


QuestionsPage.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    question: state.question
});

export default connect(mapStateToProps, { getQuestions })(QuestionsPage);