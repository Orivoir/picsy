import React from 'react';
import docCookies from 'doc-cookies';
import {Redirect} from 'react-router-dom';
import AccountItem from './AccountItem';
import {HashLink as Link} from 'react-router-hash-link';
import Notif from './../../core/Notif/Notif';
import './AccountList.css';

export default class AccountList extends React.Component {

    state = {
        redirect: false
    } ;

    constructor( props ) {

        super( props ) ;
        this.userID = localStorage.getItem('userID') || docCookies.getItem('userID');

        try {

            this.userID = JSON.parse( this.userID )
        } catch(SyntaxError) {
            this.userID = [];
        }
        if( !this.userID )
            this.userID = [];
        
        document.title = 'Picsy | comptes';
    }

    componentDidMount() {

        if( !this.userID.length ) {
            this.setState( {
                redirect: <Redirect to="/" /> 
            } ) ;
        }
    }

    render() {

        const 
            { redirect } = this.state
            ,{db} = this.props
        ;

        return (
            <section
                className="AccountList"
            >
                {redirect}

                <ul>
                    {
                        this.userID.map( id => (
                            <AccountItem key={id} db={db} id={id} />
                        ) )
                    }
                </ul>

                <Notif
                    type="back"
                    text={(
                        <Link to="/dash">
                            Tableau de bord
                        </Link>
                    )}
                />

            </section>
        ) ;
    }
    
};
