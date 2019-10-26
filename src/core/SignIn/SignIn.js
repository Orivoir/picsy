import React from 'react';
import './SignIn.css';
import Notif from './../Notif/Notif';

function SignIn() {
    return (
        <>
            <Notif
                type="info"
                text="dépot github"
                place="top"
                tooltip="git-link"
            />
        
            <p className="sign-in">
                <span>Application front UI/UX</span>
                &nbsp;développer <span>avec le CRA de Reactjs&nbsp;</span>
                par
                &nbsp;<a data-for="git-link" data-tip="lien github" href="https://github.com/Orivoir/picsy">
                        <i className="fab fa-github"></i>
                        &nbsp;Samuel Gaborieau
                </a>
            </p>
        </>
    ) ;
}

export default SignIn;