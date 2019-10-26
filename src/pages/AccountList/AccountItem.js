import React,{useState,useEffect} from 'react';
import Loader from './../../core/Loader/Loader';
import docCookies from 'doc-cookies'; 
import {Redirect} from 'react-router-dom';
import './AccountItem.css';

function AccountItem({id,db}){

    const [loader,setLoader] = useState( <Loader type="earth" width={32} bg="rgba(0,0,0,.9)" /> );
    const [user,setUser] = useState( null ) ;
    const [redirect,setRedirect] = useState( null ) ;
    const [showDetails,setShowDetails] = useState( false );
    const [albums,setAlbums] = useState( false );
    const [pictures,setPictures] = useState( [] ) ;
    const [loaderAlbum,setLoaderAlbum] = useState( <Loader type="earth" width={32} bg="rgba(0,0,0,.9)" /> ) ;

    useEffect( () => {

        if( !user ) {

            db.users.doc( id )
                .get()
                .then( u => {
                    setUser( u ) ;
                    setLoader( false ) ;

                    db.getAlbumsOf( u.id )
                        .then( albums => {
                            setAlbums( albums );
                            setLoaderAlbum( false );
    
                            albums.forEach(album => {

                                db.getPictureOf( album.id )
                                .then( pics => {
                                    setPictures( [...pictures, ...pics] ) ;
                                } ) ;
                            });

                        } )

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
                                                            
                                {
                                    loaderAlbum || (
                                        <>
                                            <ul>
                                                <li>
                                                    {albums.length} album{albums.length > 1 ? 's':''}
                                                </li>
                                                
                                                <li>
                                                    {pictures.length} image{pictures.length > 1 ? 's':''}
                                                </li>
                                            </ul>
                                        </>
                                    )
                                }

                            </aside>

                        </button>

                    </section>
                )
            }
        </li>
    )
}

export default AccountItem;