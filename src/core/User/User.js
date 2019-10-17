import React from 'react';
import './User.css';
import {HashLink as Link} from 'react-router-hash-link'

const defaultAvatar = "";

function User({u,load}) {

    return (
        <>
            <section className="User">
                {load || (
                    <>
                        <figure>
                            <img
                                src={u.get('avatar') || defaultAvatar}
                                alt="avatar"
                                width="96"
                            />
                            <figcaption>
                                {u.get('pseudo')}
                            </figcaption>
                        </figure>
                        <p>
                            <Link to="/add-account">
                                <i className="fas fa-user-plus"></i>
                            </Link>
                        </p>
                    </>
                )}
            </section>
        </>
    ) ;
}

export default User;