import React from 'react';
import FormAdd from './../../core/FormAdd/FormAdd';
import {Redirect} from 'react-router-dom';
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
        ,errors: []
    } ;

    static add() {

        return "add"
    }

    constructor(props) {

        super( props );
        this.userID = localStorage.getItem('userID');

        
        if( !this.userID ) {
            this.setState( {
                loader: false,
                redirect: <Redirect to="/" /> 
            } ) ;
        } else {

            this.props.db.getUser( this.userID )
            .then( user => {

                if( user ) {
                    this.setState( {
                        loader: false,
                        user: user
                        ,loadUser: false
                    } );
                } else {
                    this.setState( {
                        loader: false,
                        redirect: <Redirect to="/" /> 
                    } ) ;   
                }
            });

        }
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
                createWithName
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
                                onSubmit={({name}) => {

                                    this.setState( {
                                        loader: <Loader width={16} type="btn" />
                                    } )

                                    if( name.length >= 2 && name.length <= 42 )

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
                                }}
                            />
                            {errors}
                            {
                                formHide && (
                                    <Notif
                                        type="success"
                                        text={<span>
                                            l'album
                                            &nbsp;<Link
                                                to={`/album/${createWithName}`}
                                            >
                                            {createWithName}
                                            </Link> à été créé avec succés
                                        </span>}
                                    />
                                )
                            }
                        </>
                    )  : (
                        // show album
                        <>
                            <ShowAlbum db={this.props.db} />
                        </>
                    )
                    
                }
            </>
        )
    }
};
