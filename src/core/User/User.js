import React from 'react';
import './User.css';
import Title from './../Title/Title';
import SignIn from './../SignIn/SignIn';
import Icons from './../Icons/Icons';
import {iconsUser as icons} from './../icons';

function User({
    u,load
}) {

    return (
        <>
            <section className="User">
                {load || (
                    <>
                        <Title
                            title={<><strong>Picsy</strong> application</>}
                            subtitle="version 0.2.1-beta"
                        />
                    
                        <div className="content-user">
                            <figure>
                                <img
                                    src={u.get('avatar')}
                                    alt="avatar"
                                    width="125"
                                />
                                <figcaption>
                                    {u.get('pseudo')}
                                </figcaption>
                            </figure>

                            {
                                icons.map( icon => (
                                    <Icons
                                        key={icon.id}
                                        tooltip={icon.tooltip}
                                        target={icon.target}
                                        className={icon.className}                                        
                                    />
                                ) )
                            }
                        </div>
                      
                        <SignIn />
                    </>
                )}
            </section>
        </>
    ) ;
}

export default User;