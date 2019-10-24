import React from 'react';
import './SignIn.css';
import ReactToolTip from 'react-tooltip';

function SignIn() {
    return (
        <>
          <ReactToolTip 
                id="git-link"
                type="info"
                getContent={()=> (
                    <span style={{
                        fontSize: "16px"
                    }}>
                        <i className="fas fa-info-circle"></i>
                        &nbsp;dépot github
                    </span>
                )} 
                effect="solid"
                place="top"
            />
        
            <p className="sign-in">
                Application front UI/UX développer <span>avec le CRA de Reactjs&nbsp;</span>
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