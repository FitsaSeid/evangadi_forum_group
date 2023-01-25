import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getQuestions } from '../../redux/questions/questions.action';

// import SideBar from '../../components/SideBar/SideBar.component';
import PostItem from '../../components/PostItem/PostItem.component';
// import RightSideBar from '../../components/right-sideBar/right-sideBar.component';

import './HomePage.styles.scss';
import YoutubeVideos from '../../components/Youtube/Youtube';

const HomePage = ({ getQuestions, question: { questions, loading }  }) => {
    useEffect(() => {
        getQuestions();
    }, [getQuestions ]);

    return <Fragment>
        <div className='page'>
            {/* <SideBar/> */}
            <div id="content">
                <div id='mainbar' className='homepage fc-black-800'>
                    <div className='questions-grid'>
                        <h3 className='questions-headline'>Top Questions</h3>
                        <div className='questions-btn'>
                            <Link to='/add/question'>
                                <button className = 's-btn btn__ primary'>Ask Question</button>
                            </Link>
                        </div>
                    </div>
                   
                    <div className='questions'>
                        {questions?.map(question => (
                            <PostItem key={question?.id} question={question}/>))}
                    </div>
                </div>
               
            </div>
            <YoutubeVideos />
        </div>
    </Fragment>
};

HomePage.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    question: state.question
});

export default connect(mapStateToProps, { getQuestions })(HomePage);