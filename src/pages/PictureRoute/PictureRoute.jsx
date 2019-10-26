import React from 'react';
import ImgFilter from './../../core/ImgFilter/ImgFilter';
import Loader from './../../core/Loader/Loader';
import User from './../../core/User/User';
import {Redirect} from 'react-router-dom';
import {HashLink as Link} from 'react-router-hash-link';
import FormFilter from './../../core/FormFilter/FormFilter';
import Notif from './../../core/Notif/Notif';
import docCookies from 'doc-cookies';
import './PictureRoute.css';

export default class PictureRoute extends React.Component {
    
    state = {
        loaderImg: <Loader width={64} type="earth" bg="rgba(0,0,0,.9)" />
        ,loaderUser: <Loader width={64} type="timer" bg="rgba(30,30,42,.95)" />
        ,loaderForm: <Loader width={48} type="az" bg="rgba(30,30,42,.95)" />
        ,user: null
        ,picture: null
        ,redirect: null
        ,blurValue: null
        ,contrastValue: null
        ,grayscaleValue: null
        ,hueRotateValue: null
        ,timeUpdate: 20
    } ;

    constructor( props ) {

        super( props );

        this.pictureID = document.location.hash.split('/').pop() ;
        this.updatePicture = this.updatePicture.bind( this );
        this.timeUpdateUp = this.timeUpdateUp.bind( this );
        document.title = 'Picsy | filtre';
    }
    
    /**
     * @method componentWillUnmount [cyclelife]
     * @description free intervals alloc
     */
    componentWillUnmount() {
        clearInterval( this.updateID ) ;
        clearInterval( this.timeUpdateID ) ;
    }

    componentDidMount() {
        // check logged
        // get img with id in url
        // open intervals
        
        this.userID = localStorage.getItem('useID') || docCookies.getItem('useID') ;

        if( !this.userID ) {
            this.setState( {
                loaderImg: null
                ,loaderUser: null
                ,redirect: <Redirect to="/" /> 
            } ) ;
        } else {
            
            this.props.db.getUser( this.userID )
            .then( user => {

                if( user ) {

                    this.setState( {
                        u: user 
                        ,loaderUser: false
                    } , () => {
                        
                        this.props.db.pictures.doc( this.pictureID )
                        .get()
                        .then( picture => {
                            this.setState({
                                picture: picture
                                ,loaderImg: false
                                ,loaderForm: false
                                ,blurValue: parseInt((picture.get('filters').find( f => f.key === 'blur' ) || {}).val)*2
                                ,contrastValue: parseInt((picture.get('filters').find( f => f.key === 'contrast' ) || {}).val)
                                ,grayscaleValue: parseInt((picture.get('filters').find( f => f.key === 'grayscale' ) || {}).val)
                                ,hueRotateValue: parseInt((picture.get('filters').find( f => f.key === 'hue-rotate' ) || {}).val)
                            } , () => {
                                // go interval update img after get image
                                this.updateID = setInterval( this.updatePicture , 2e4 );
                                this.timeUpdateID = setInterval( this.timeUpdateUp , 1e3 );
                            } );
                            
                        } )
                        .catch( err => {
                            this.setState( {
                                loaderImg: null
                                ,loaderUser: null
                                ,redirect: <Redirect to="/" />
                            } ) ;   
                        } );

                    }  ) ;
                    
                } else {
                    this.setState( {
                        loaderImg: null
                        ,loaderUser: null
                        ,redirect: <Redirect to="/" />
                    } ) ;
                }
            } ) ;
            
        }
    }

    
    timeUpdateUp() {
        this.setState( state => ({ timeUpdate: state.timeUpdate-1 >= 0 ? state.timeUpdate-1: 0 }) );
    }
 
    updatePicture() {

        const {picture} = this.state;

        let currentFilters = localStorage.getItem( `filters-${picture.id}` ) ;

        try {

            currentFilters = JSON.parse( currentFilters ) ;

        } catch( SyntaxError ) {

            currentFilters = [] ;
        }
        finally {
            if( !currentFilters )
                currentFilters = [];
        }

        setTimeout(() => {
            this.setState( {
                loaderForm: <Loader width={48} type="az" bg="rgba(30,30,42,.95)" />
            } ) ;
        }, 420);

        this.props.db.pictureSetFilters(
            picture.id , currentFilters
        ).then( () => {


            this.props.db.pictures.doc( this.pictureID )
            .get()
            .then( pic => {
                this.setState( {
                    picture: pic
                    ,loaderForm: false
                    ,blurValue: parseInt((pic.get('filters').find( f => f.key === 'blur' ) || {}).val) * 2
                    ,contrastValue: parseInt((pic.get('filters').find( f => f.key === 'contrast' ) || {}).val)
                    ,grayscaleValue: parseInt((pic.get('filters').find( f => f.key === 'grayscale' ) || {}).val)
                    ,hueRotateValue: parseInt((picture.get('filters').find( f => f.key === 'hue-rotate' ) || {}).val)
                    ,timeUpdate: 20
                } )
            } )
        } )

    }

    render() {

        const {
            loaderImg
            ,loaderUser
            ,loaderForm
            ,u
            ,picture
            ,blurValue
            ,contrastValue
            ,grayscaleValue
            ,hueRotateValue
            ,timeUpdate
        } = this.state;

        return(
            <section
                className="PictureRoute"
            >

                <header>
                    <User
                        u={u}
                        load={loaderUser}
                    />
                </header>

                <Notif
                    type="back"
                    text={(
                        <Link to="/dash">
                            tableau de bord
                        </Link>
                    )}
                />

                <aside>
                    <ImgFilter
                        load={loaderImg}
                        pics={picture}
                        classFig="fig-filter"
                        figcaption={
                            <>
                                {
                                    !loaderImg && (
                                        <>
                                            <b>{picture.get('name')}</b> 
                                            - <i>{new Date(picture.get('createAt')).toLocaleDateString()}</i>
                                        </>
                                    )
                                }
                            </>
                        }
                        width={512} // default width
                    />
                </aside>

                <p className="update-pic">
                    {
                        !loaderForm && (
                            <>
                                <span>
                                    Recalcul de l'image dans {timeUpdate} 
                                </span>
                                <br />
                                <button
                                    onClick={() => {
                                        clearInterval( this.updateID );
                                        this.updatePicture();
                                        this.updateID = setInterval( this.updatePicture , 2e4 );
                                        this.setState( { timeUpdate: 20 } );
                                    }}
                                >
                                    maintenant
                                </button>
                            </>
                        )
                    }
                </p>

                <FormFilter
                    load={loaderForm}
                    contrastValue={contrastValue}
                    blurValue={blurValue}
                    grayscaleValue={grayscaleValue}
                    hueRotate={hueRotateValue}
                    onChange={({key,val,unity}) => {

                        let currentFilters = localStorage.getItem( `filters-${picture.id}` ) ;

                        try {

                            currentFilters = JSON.parse( currentFilters ) ;
                        } catch( SyntaxError ) {

                            currentFilters = [] ;
                        }
                        finally {
                            if( !currentFilters )
                                currentFilters = [];
                        }

                        let found = false;
                        currentFilters = currentFilters.map( filter => {

                            if(filter.key === key) {
                                filter.val = val+unity;
                                found = true;
                            }
                            return filter;
                        } ) ;

                        if( !found )
                            currentFilters.push( {
                                key: key
                                ,val: val+unity
                            } )

                        localStorage.setItem( 
                            `filters-${picture.id}` ,
                            JSON.stringify( currentFilters )
                        ) ;

                        const delta = {};

                        if( key === 'blur' )
                            val *= 2;

                        delta[ key+'Value' ] = parseInt( val );

                        this.setState( delta );
                    }}
                />
            
            </section>
        )
    }
};
