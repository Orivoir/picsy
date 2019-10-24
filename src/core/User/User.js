import React from 'react';
import './User.css';
import {HashLink as Link} from 'react-router-hash-link';
import ReactToolTip from 'react-tooltip' ;
import SignIn from './../SignIn/SignIn';

const defaultAvatar = "";

function User({u,load}) {

    return (
        <>
            <section className="User">
                {load || (
                    <>
                        <h1>
                            <strong>Picsy</strong> application
                            version 0.1.0-beta
                        </h1>
                        <div className="content-user">
                            <figure>
                            <img
                                src={u.get('avatar') || defaultAvatar}
                                alt="avatar"
                                width="125"
                            />
                            <figcaption>
                                {u.get('pseudo')}
                            </figcaption>
                        </figure>
                            
                            <ReactToolTip 
                                id="user"
                                type="info"
                                getContent={()=> (
                                    <p style={{
                                        fontSize: "16px"
                                    }}>
                                        <i className="fas fa-info-circle"></i>
                                        &nbsp;ajouté un compte
                                    </p>
                                )} 
                                effect="solid"
                                place="bottom"
                            />
                            
                            <p data-for="user" data-tip="<em>ajouté</em> un compte">
                                <Link to="/add-account">
                                    <i className="fas fa-user-plus"></i>
                                </Link>
                            </p>

                            
                            <ReactToolTip 
                                id="change"
                                type="info"
                                getContent={()=> (
                                    <p style={{
                                        fontSize: "16px"
                                    }}>
                                        <i className="fas fa-info-circle"></i>
                                        &nbsp;changé de compte
                                    </p>
                                )} 
                                effect="solid"
                                place="bottom"
                            />

                            <p
                                data-for="change"
                                data-tip="changer de compte"
                            >
                                <Link to="/account-list">
                                    <i class="fas fa-person-booth"></i>
                                </Link>
                            </p>
                        </div>
                        <SignIn />
                    </>
                )}
            </section>
        </>
    ) ;
}

export default User;