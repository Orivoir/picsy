import React from 'react';
import Loader from './../../core/Loader/Loader';
import {Redirect} from 'react-router-dom';
import docCookies from 'doc-cookies';
import Notif from './../../core/Notif/Notif';
import FormUser from './../../core/FormUser/FormUser';
import './Logged.css' ;

export default class Logged extends React.Component {

    state = {
        loader: <Loader full type="az" width={256} bg="rgba(0,0,0,.93)" />
        ,u: false
        ,redirect: false
        ,pseudo: ""
        ,avatar: Logged.defaultAvatar
        ,errors: []
        ,loaderButton: false
        ,fileName: ""
    } ;

    static defaultAvatar = 'https://image.flaticon.com/icons/png/128/149/149071.png';

    constructor( props ) {

        super( props );

        this.userID = localStorage.getItem('userID') || docCookies.getItem('userID');

        try {

            this.userID = JSON.parse( this.userID ) ;
        } catch( SyntaxError ) {
            this.userID = [];
        }

        this.avatarChange = this.avatarChange.bind( this );
        this.onSubmit = this.onSubmit.bind( this );

        document.title = 'Picsy | Log in';
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

                    if( !this.userID )
                        this.userID = [];

                    this.userID.push(data.id);

                    localStorage.setItem('userID' , JSON.stringify( this.userID ) );
                    docCookies.setItem('userID' , JSON.stringify( this.userID ) , new Date( ( Date.now() * 1.5 ) ) );
                    this.setState( {
                        redirect: <Redirect to="/account-list" />
                    } ) ;
                } ) ;
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
                ,fileName: file.name
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

        if( !this.userID || !this.userID.length ) {
            this.setState( {
                loader: false 
            } ) ;
        } else {
            this.setState( {
                redirect: <Redirect to="/account-list" />
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
            ,fileName
        } = this.state;

        return(
            <section
                className="Logged"
            >
                {loader}
                {redirect}

                <FormUser
                    onSubmit={this.onSubmit}
                    onChangePseudo={e => (
                        this.setState({pseudo:e.target.value.trim()})
                    )}
                    avatar={avatar}
                    valuePseudo={this.state.pseudo}
                    fileName={fileName}
                    errors={errors}
                    loaderSubmit={loaderButton}
                    onChangeAvatar={(file,blob,e) => (
                        this.avatarChange(file,blob,e)
                    )}
                />

                <section className="banner-sm-screen hide">

                        <p>
                            Picsy et Lorem dolore veniam culpa velit sint ,
                            Anim cupidatat mollit consequat et ipsum ipsum eu ullamco eu ullamco elit non.
                        </p>

                        <button type="button">
                            get started
                        </button>
                </section>

            </section>
        );
    }
};
