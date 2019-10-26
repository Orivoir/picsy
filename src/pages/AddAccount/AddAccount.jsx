import React from 'react';
import docCookies from 'doc-cookies';
import {Redirect} from 'react-router-dom';
import Notif from './../../core/Notif/Notif';
import Loader from './../../core/Loader/Loader';
import FormUser from './../../core/FormUser/FormUser';
import './AddAccount.css';

export default class AddAccount extends React.Component {

    state = {
        pseudo: ""
        ,fileName: ""
        ,avatar: AddAccount.defaultAvatar
        ,errors: []
        ,loaderSubmit: null
    } ;

    constructor( props ) {

        super( props );
        
        this.userID = localStorage.getItem('userID') || docCookies.getItem('userID');

        try {
            this.userID = JSON.parse( this.userID ) ;
        } catch( SyntaxError ) {
            this.userID = [];
        }
    }
    
    static defaultAvatar = 'https://image.flaticon.com/icons/png/128/149/149071.png';

    render() {

        const {
            avatar
            ,errors
            ,fileName
            ,loaderSubmit
            ,redirect
        } = this.state;

        return(
            <section
                className="AddAccount"
            >
                {redirect}

                <h1>
                    Ajouté
                    <span className="one-word">&nbsp;un&nbsp;</span>
                    <span className="user-word">
                        utlisateur
                    </span>
                    &nbsp;<span className="hide account-word">
                        compte
                    </span>
                </h1>
                <FormUser
                    onSubmit={e => {

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
                                loaderSubmit: <Loader width={16} type="btn" />
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
                                } ).catch( err => console.error( err ) ) ;
                            } ) ;
                        }
                    }}
                    onChangePseudo={e => (
                        this.setState( { pseudo: e.target.value.trim()} )
                    )}
                    avatar={avatar}
                    fileName={fileName}
                    errors={errors}
                    valuePseudo={this.state.pseudo}
                    loaderSubmit={loaderSubmit}
                    onChangeAvatar={(file,blob,e) => {
                        
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
                
                    }}
                />

            </section>
        ) ;
    }
};
