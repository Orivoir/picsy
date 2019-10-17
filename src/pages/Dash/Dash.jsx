import React from 'react';
import Loader from './../../core/Loader/Loader';
import {Redirect} from 'react-router-dom';
import User from './../../core/User/User';
import ListAlbulms from './../../core/ListAlbulms/ListAlbulms';

export default class Dash extends React.Component {

    state = {

        loader: {
            u: <Loader width={64} type="timer" full bg="rgba(0,0,0,.9)" /> ,
            albums: <Loader width={64} type="timer" full bg="rgba(0,0,0,.9)" />
        } ,
        u: null,
        albums: [],
        redirect: false
    } ;

    constructor( props ) {

        super( props ) ;

        this.userID = localStorage.getItem('userID');
    }

    componentDidMount() {

        if( !this.userID ) {
            this.setState( {
                loader: {u: false, albums: false},
                redirect: <Redirect to="/" /> 
            } ) ;
        } else {

            
            this.props.db.getUser( this.userID )
            .then( user => {

                if( user ) {
                    this.setState( state => ({
                        loader: { u: false, albums: state.loader.albums }
                        ,u: user 
                    } ) , () => {

                        this.props.db.getAlbumsOf( user.id ).then( docs => {

                            this.setState( state => ({
                                loader : { u: state.loader.u, albums: false  },
                                albums: docs
                            }))
                        } )

                    }  ) ;
                    
                } else {
                    this.setState( {
                        loader: {u: false, albums: false},
                        redirect: <Redirect to="/" />
                    } ) ;
                }
            } ) ;
            
        }
    }

    render() {

        const {
            loader,
            redirect,
            albums,
            u
        } = this.state ;

        return(
            <section
                className="dash"
            >
                {redirect}

                <User 
                    u={u}
                    load={loader.u} 
                />

                 
                <ListAlbulms
                    db={this.props.db}
                    albums={albums} 
                    load={loader.albums}
                /> 


            </section>
        )
    }
};
