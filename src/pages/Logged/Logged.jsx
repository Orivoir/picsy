import React from 'react';
import Loader from './../../core/Loader/Loader';
import {Redirect} from 'react-router-dom';
// import docCookies from 'doc-cookies';
import InputFile from './../../core/InputFile/InputFile';
import Notif from './../../core/Notif/Notif';

export default class Logged extends React.Component {

    state = {
        loader: <Loader full type="az" width={256} bg="rgba(0,0,0,.93)" />
        ,u: false
        ,redirect: false
        ,pseudo: ""
        ,avatar: Logged.defaultAvatar
        ,errors: []
        ,loaderButton: false
    } ;

    static defaultAvatar = '';

    constructor( props ) {

        super( props );

        this.userID = localStorage.getItem('userID') //|| docCookies.getItem('userID') ;

        this.avatarChange = this.avatarChange.bind( this ); 
        this.onSubmit = this.onSubmit.bind( this );
    }

    /**
     * @bind [constructor]
     * @param {SyntheticEvent} e 
     */
    onSubmit( e ) {

        e.preventDefault();

        const {pseudo} = this.state;

        if(
            !(pseudo.length >= 2 &&
            pseudo.length <=40)
        ) {
            this.setState(state => ( {
                errors: [ ...state.errors, <Notif
                    key={Date.now()} 
                    text="pseudo taille invalide"
                    type="error"
                    onClose={ ({remove}) => remove()}
                /> ]
            }) ) ;
        } else{

            const {avatar} = this.state;

            this.setState( {
                loaderButton: <Loader width={16} type="btn" />                
            } , () => {

                this.props.db.users.add( {
                    pseudo: pseudo
                    ,avatar: avatar
                } ).then( data => {

                    const userID = data.id ;

                    localStorage.setItem('userID' , userID);
                    // docCookies.setItem('userID' , userID );

                    this.setState( {
                        redirect: <Redirect to="/dash" />
                    } ) ;
                } )
            } ) ;
        }
    }
    
    /**
     * @bind [constructor]
     * @param {File} file 
     * @param {string} blob 
     * @param {SyntheticEvent} e 
     */
    avatarChange( file, blob , e ) {

        if( file.size <= 1e6 && /image/.test(file.type) ) {
            this.setState( {
                avatar: blob
            } ) ;
            
        } else {
            
            const mssg = file.size >= 1e6 ? "fichier trop volumineux":"ce fichier n'est pas une image .";
            
            this.setState( state => ( {
                errors: [ ...state.errors , <Notif
                    key={Date.now()} 
                    text={mssg}
                    type="error"
                    onClose={ ({remove}) => remove()}
                /> ]
            }) )
        }

    }

    componentDidMount() {

        if( !this.userID ) {

            this.setState( {
                loader: false 
            } ) ;
        } else {

            
            this.props.db.getUser(this.userID)
            .then( user => {

                if( user ) {
                    this.setState( {
                        redirect: <Redirect to="/dash" />
                    } ) ;
                    
                } else {
                    this.setState( {
                        loader: false
                    } ) ;
                }
            } ) ;
            
        }
    }

    render() {

        const {
            loader
            ,redirect
            ,avatar
            ,errors
            ,loaderButton
        } = this.state;

        return(
            <section
                className="Logged"
            >
                {loader}
                {redirect}

                <form
                    onSubmit={this.onSubmit}
                >

                    <div>
                        <label htmlFor="pseudo">pseudo</label>
                        <input 
                            type="text" 
                            name="pseudo"
                            autoComplete="off" 
                            onChange={e => (
                                this.setState({pseudo:e.target.value})
                            )} 
                        />
                    </div>
                    
                    <div>
                        <InputFile
                            className="hide"
                            label={
                                <figure>
                                    <img
                                        src={avatar}
                                        alt="avatar"
                                        width={64}
                                    />
                                </figure>
                            }
                            name="avatar"
                            autoRead
                            onChange={(file,blob,e) => (
                                this.avatarChange(file,blob,e)
                            ) }
                        />
                    </div>

                    <button type="submit">
                        {loaderButton || 'suivant'}
                    </button>
                    {errors.map( error => (
                        error
                    ) )}

                </form>

            </section>
        );
    }
};
