import React from 'react';
import Loader from './../../core/Loader/Loader';
import {Redirect} from 'react-router-dom';
import User from './../../core/User/User';
import ReactTooltip from 'react-tooltip';
import ListAlbums from '../../core/ListAlbulms/ListAlbums';
import {HashLink as Link} from 'react-router-hash-link';
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
        this.userID = localStorage.getItem('userID');

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

                <ReactTooltip
                    id="add-album"
                    type="info"
                    getContent={()=> (
                        <p style={{
                            fontSize: "16px"
                        }}>
                            <i className="fas fa-info-circle"></i>
                            &nbsp;créé un album
                        </p>
                    )} 
                    effect="solid"
                    place="top"
                />
                <aside className="add-album">
                    <p>
                        <Link
                            data-for="add-album"
                            data-tip="créé un album"
                            to="/add-album"
                        >
                            <i className="fas fa-folder-plus"></i>
                        </Link>
                    </p>
                </aside>

            </section>
        )
    }
};
