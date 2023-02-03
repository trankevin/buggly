import LoginForm from "components/Forms/LoginForm";
import { Card } from "react-bootstrap";
import style from "./AuthCard.module.scss";
import logo from '../../bug-icon.png';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SignUpForm from "components/Forms/SignUpForm";

const AuthCard = () => {

    const userAuth = useSelector(state => state.userAuth);
    const [showSignUp, setShowSignUp] = useState(false);

    const randomQuotes = ['Welcome Back!', 'Knew You\'d Be Back!', 'Got More Bugs?', 'Another Day, Another Bug'];

    const randomIndex = Math.floor(Math.random() * randomQuotes.length);


    return (
        <div className={style.authCard}>
            
            <Card className={style.card}>
                <Card.Body className={style.cardBody}>
                    <div className={style.brand}>
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            />{' '}
                        Buggly            
                    </div>

                    {(userAuth.loggingIn && !userAuth.signingUp) && <Card.Title className={style.cardTitle}>{randomQuotes[randomIndex]}</Card.Title>}
                    {userAuth.signingUp && <Card.Title className={style.cardTitle}>Getting you set up...</Card.Title>}
                    

                    { (!userAuth.loggedIn && !userAuth.loggingIn && !userAuth.signingUp && !userAuth.signingUpSuccess) &&
                    <div className={style.loginFormContent}>
                    {/* <Card.Title className={style.cardTitle}>Login</Card.Title> */}
                    {
                        !showSignUp ?
                        <>
                            <p>Login into your account, use the demo login below or <a href="#" onClick={(e) => {e.preventDefault(); setShowSignUp(true);}}>sign up!</a></p>
                            <p>Email: demo@buggly.com<br/>
                            Password: password123</p>
                            <LoginForm/>
                        </>
                        :
                        <>
                            <p>Create an account or go back to <a href="#" onClick={(e) => {e.preventDefault(); setShowSignUp(false);}}>Login</a>.</p>
                            <SignUpForm/>
                        </>
                        
                    }
                    </div>
                    }
                </Card.Body>            
            </Card>
        </div>
        
    )
}
export default AuthCard;