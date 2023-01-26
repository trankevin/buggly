import LoginForm from "components/Forms/LoginForm";
import { Card } from "react-bootstrap";
import style from "./AuthCard.module.scss";
import logo from '../../bug-icon.png';
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AuthCard = () => {
    const userAuth = useSelector(state => state.userAuth);

    const randomQuotes = ['Welcome Back!', 'Seize The Day!', 'Knew You\'d Be Back!', 'Got More Bugs?', 'Another Day, Another Bug'];

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
                    {userAuth.loggingIn && <Card.Title className={style.cardTitle}>{randomQuotes[randomIndex]}</Card.Title>}

                    { (!userAuth.loggedIn && !userAuth.loggingIn) &&
                    <>
                    {/* <Card.Title className={style.cardTitle}>Login</Card.Title> */}
                    <LoginForm/>
                    </>
                    }
                </Card.Body>            
            </Card>
        </div>
        
    )
}
export default AuthCard;