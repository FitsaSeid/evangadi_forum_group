import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
import './home.css';
import Question from '../../components/Question/Question';
import Sidebar from '../../components/sidebar/Sidebar';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {getQuestions} from '../../redux/questions/questions.action'


const Home = ({ getQuestions , question: {questions, loading}}) => {

    useEffect(() => {
        getQuestions();
    }, [getQuestions]);

    return (
        <div className=''>
            <div className="row">
                <div className="col-lg-6 col-sm-12 about__user_section">
                    {/* <h3>Welcome {userData.user?.display_name}</h3> */}
                    {/* <button onClick={logout}>Log out</button> */}
                    <Sidebar
                        // user_name={userData.user?.display_name}
                        profile_picture=""
                        like={23}
                        dislike={2}
                    />
                </div>
                <div className="col-lg-6 col-sm-12 question__section">

                    <Question
                        title="How to make a website in 30 minutes only?"
                        description="I want to make an ecommerce website for my business but i dont wat to spent a signle coin, What shall i do?"
                        answerCount={27}
                    />

                    <Question
                        title="React.js vs Angular"
                        description="What is the difference between react and angular? Which one is better for wen development?"
                        answerCount={36}
                    />
                </div>
            </div>

        </div>
    )
}

Home.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getQuestions })(Home);
