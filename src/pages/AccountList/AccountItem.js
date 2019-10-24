import React,{useState,useEffect} from 'react';
import Loader from './../../core/Loader/Loader';
import docCookies from 'doc-cookies';
import ReactToolTip from 'react-tooltip';
import {Redirect} from 'react-router-dom';
import './AccountItem.css';

function AccountItem({id,db}){

    const [loader,setLoader] = useState( <Loader type="earth" width={32} bg="rgba(0,0,0,.9)" /> );
    const [user,setUser] = useState( null ) ;
    const [redirect,setRedirect] = useState( null ) ;
    const [showDetails,setShowDetails] = useState( false );

    useEffect( () => {

        if( !user ) {

            db.users.doc( id )
                .get()
                .then( u => {
                    setUser( u ) ;
                    setLoader( false ) ;
                } )
                .catch( err => {

                    console.error( err );
                } )
        }
    } )

    return (
        <li
            className="AccountItem"
        >
            {redirect}
            {
                loader || (
                    <section
                        id={`${user.id}`}
                        onMouseEnter={() => setShowDetails( true )}
                        onMouseLeave={() => setShowDetails( false )}
                    >
                        <button
                            onClick={() => {
                                docCookies.setItem('useID' , user.id ) ;
                                localStorage.setItem('useID' , user.id ) ;
                                setRedirect( <Redirect to="/dash" />) ;
                            }}
                        >
                            <figure>
                                <figcaption>
                                    {user.get('pseudo')}
                                </figcaption>

                                <img
                                    src={user.get('avatar')}
                                    alt="avatar"
                                    width="64"
                                />

                            </figure>

                            <aside
                                className={`${showDetails ? '': 'o-hide'}`}
                            >
                            
                                <i className="fas fa-running"></i>
                                &nbsp;les données de détails de compte<br />
                                en sueur
                                
                                <ReactToolTip 
                                    id="pls"
                                    type="error"
                                    getContent={()=> (
                                        <p style={{
                                            fontSize: "16px"
                                        }}>
                                            <i className="fas fa-bug"></i>
                                            &nbsp;Les requêtes réseaux en PLS
                                        </p>
                                    )}
                                    effect="solid"
                                    place="right"
                                />
                                &nbsp;<i data-for="pls" data-tip="en pls" className="fab fa-accessible-icon"></i>
                                    
                            </aside>

                        </button>


                    </section>
                )
            }
        </li>
    )
}

export default AccountItem;