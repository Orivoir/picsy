import React from 'react';
import FormAdd from './../../core/FormAdd/FormAdd';
import {Redirect} from 'react-router-dom';
import docCookies from 'doc-cookies';
import Loader from './../../core/Loader/Loader';
import User from './../../core/User/User';
import Notif from './../../core/Notif/Notif';
import {HashLink as Link} from 'react-router-hash-link';
import ShowAlbum from '../../core/ShowAlbum/ShowAlbum';

export default class AlbumRoute extends React.Component {

    state = {
        loader: <Loader width={16} type="btn" />
        ,redirect: false
        ,loadUser: <Loader full width={48} type="time" bg="rgba(0,0,0,.9)" />
        ,loaderAlbum: <Loader full width={48} type="az" bg="rgba(0,0,0,.9)" />
        ,album: null
        ,errors: []
    } ;

    static add() {

        return "add";
    }

    constructor(props) {

        super( props );

        document.title = 'Picsy | Album' ;
        this.onSubmit = this.onSubmit.bind( this );
    }

    componentDidMount() {
        
        if( this.props.action !== AlbumRoute.add() ) {
            
            this.props.db.albums.doc( document.location.hash.split('/').pop() )
            .get()
            .then( album => {
                this.setState( {
                    album: album
                    ,loaderAlbum: false
                } ) ;
            } ) ;
        }

        this.userID = localStorage.getItem('useID') || docCookies.getItem('useID');

        const notGetUser = {
            loader: false,
            redirect: <Redirect to="/" /> 
        } ;

        this.props.db.isLogged( this.userID )
            .then( response => {

                if( response.success ) {
                    this.setState( {
                        loader: false,
                        user: response.user
                        ,loadUser: false
                    } );
                } else {
                    this.setState( notGetUser ) ;
                }

            } )
            .catch( () => (
                this.setState( notGetUser )
            ) )
        ;
    }

    onSubmit({name,refName}) {

        const {user} = this.state;

        this.setState( {
            loader: <Loader width={16} type="btn" />
        } )

        if( name.length >= 2 && name.length <= 42 ) {

            if( refName.current instanceof Node ) {

                refName.current.value = '';
                refName.current.focus() ;
            }

            this.props.db.addAlbum(
                name , user.id
            ).then( data => {

                if( data.success )
                    this.setState( {
                        loader: false,
                        formHide: true,
                        errors: [],
                        createWithName: name
                    } ) ;
                else
                    this.setState( state => ({
                        loader: false,
                        errors: [...state.errors , (
                            <Notif
                                key={Date.now()}
                                type="error"
                                onClose={({remove}) => remove()}
                                text={`l'album ${name} existe déjà`}
                            />
                        )]
                    } )) ;
            } ) ;
        }
        else
            this.setState( state => ({
                errors: [...state.errors , (
                    <Notif
                        key={Date.now()}
                        type="error"
                        text="taille de nom invalide"
                        onClose={({remove}) => remove()}
                    />
                )] ,
                loader: false
            }));
    }

    render() {

        const 
            {action} = this.props
            ,{
                user,
                loader,
                loadUser,
                errors,
                formHide,
                createWithName,
                loaderAlbum,
                album
            } = this.state
        ;

        return(
            <>
                <User u={user} load={loadUser} />
                {
                    action === AlbumRoute.add() ? (
                        <>
                            <FormAdd
                                load={loader}
                                className={`${formHide ? 'hide':''}`}
                                type="album"
                                onSubmit={this.onSubmit}
                            />
                            
                            {errors}
                            {
                                formHide && (
                                    <Notif
                                        type="success"
                                        text={<span>
                                            l'album
                                            &nbsp;<Link
                                                to={`/dash`}
                                            >
                                            {createWithName}
                                            </Link> à été créé avec succés
                                        </span>}
                                    />
                                )
                            }
                            <Notif 
                                type="back"
                                text={<>
                                    <Link to="/dash">
                                        Tableau de bord
                                    </Link>
                                </>}
                            />
                        </>
                    )  : (
                        // show album
                        <>
                            <ShowAlbum
                                db={this.props.db}
                                loaderAlbum={loaderAlbum}
                                album={album}
                            />
                        </>
                    )
                    
                }
            </>
        )
    }
};
