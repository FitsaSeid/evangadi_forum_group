import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
import './home.css';
import Question from '../../components/Question/Question';
import Sidebar from '../../components/sidebar/Sidebar';

import {getTopQuestions} from '../../redux/questions/questions.action'


const Home = ({ getTopQuestions , question: {questions, loading}}) => {

    useEffect(() => {
        getTopQuestions();
    }, [getTopQuestions]);

    return loading || questions === null ? <Fragment>Loading...</Fragment> : <Fragment>
        <div className=''>
  
            <div className="row">
                <div className="col-lg-6 col-sm-12 about__user_section">
                    <h3>Welcome </h3>
                    {/* <Link to = '/questions'>
                    <button >Ask Question</button>
                    </Link> */}
                    {/* <Sidebar
                        // user_name={userData.user?.display_name}
                        profile_picture=""
                        like={23}
                        dislike={2}
                    /> */}
                </div>
                <div className="col-lg-6 col-sm-12 question__section">
                        {questions?.map(question => (
                            <Question key={question.id} question={question} />))} 
                        
                </div>
            </div>

        </div>
    </Fragment>
}

Home.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    question: state.question
});

export default connect(mapStateToProps, { getTopQuestions })(Home);
