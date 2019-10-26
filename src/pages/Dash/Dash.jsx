import React from 'react';
import Loader from './../../core/Loader/Loader';
import {Redirect} from 'react-router-dom';
import docCookies from 'doc-cookies';
import User from './../../core/User/User';
import Icons from './../../core/Icons/Icons';
import Notif from './../../core/Notif/Notif';
import ListAlbums from '../../core/ListAlbulms/ListAlbums';
import './Dash.css';

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
        this.userID = localStorage.getItem('useID') || docCookies.getItem('useID') ;

        document.title = 'Picsy | Dash';
    }

    componentDidMount() {

        if( !this.userID ) {
            this.setState( {
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
                className="Dash"
            >
                {redirect}

                <User 
                    u={u}
                    load={loader.u} 
                />

                 
                <ListAlbums
                    db={this.props.db}
                    albums={albums} 
                    load={loader.albums}
                />
                <aside className="add-album">
                    <Icons
                        tooltip={(
                            <Notif
                                tooltip="add-album"
                                type="infos"
                                text="créé un album"
                                place="top"
                            />
                        )}
                        className="fas fa-folder-plus"
                        target="/add-album"
                    />
                </aside>

            </section>
        )
    }
};
