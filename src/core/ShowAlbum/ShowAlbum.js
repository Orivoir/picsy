import React,{useState} from 'react';
import {useParams} from 'react-router-dom';
import FormAdd from './../FormAdd/FormAdd';
import Loader from './../Loader/Loader';
import Notif from './../Notif/Notif';
import ListImg from './../ListImg/ListImg';
import Previews from './../Previews/Previews';
import './ShowAlbum.css';

const getPics = (db,id) => {

    return new Promise( (resolve,reject) => {

        db.getImgsOf( id )
            .then( pics => {
                resolve( pics );
            } )
            .catch( err => reject(err) )
        ;
    } ) ;
}

function ShowAlbum({db,loaderAlbum,album}) {
    
    const {id} = useParams();
    const [loaderAddPicture,setLoaderAddPicture] = useState( false );
    const [errors,setErrors] = useState([]);
    const [successFor,setSuccessFor] = useState([]);
    const [previews,setPreviews] = useState( [] );
    const [pictures,setPictures] = useState({
        pics:false
        ,loader:<Loader
            width={64}
            bg="rgba(0,0,0,.9)"
            type="timer"
        />
    });

    return (
        <section className="ShowAlbum">
            {
                !loaderAlbum && (
                    <h2>
                        {album.get('name')}
                    </h2>
                )
            }
            <ListImg
                items={
                    !pictures.pics ?
                    getPics(db,id).then( pics => {
                        setPictures( {
                            pics:pics
                            ,loader:false
                        } )
                    } ) : pictures.pics
                }
                load={pictures.loader}
                db={db}
            />

            <FormAdd
                type="picture"
                // voidForm={voidForm}
                onSubmit={() => {
                    
                    if( loaderAddPicture ) return ;

                    if( // if: user have send file.s
                        previews.length
                    ) {
                        setLoaderAddPicture( <Loader type="btn" width={16} />);

                        Promise.all( // resolve promise.s add picture.s
                            Array.from(
                                Array( previews.filter( preview => (
                                    preview.name.length >= 2 &&
                                    preview.name.length < 42
                                ) ).length ).keys()
                            ).map( key => db.addPicture(
                                id, previews[key].name, previews[key].blob
                            ) )
                        ).then( responses => {

                            let
                             finalSucessFor = [],
                             finalPreviews = previews,
                             finalErrors = errors
                            ;

                            responses.forEach( response => {
                                
                                if( response.success ) {

                                    finalPreviews = finalPreviews.filter( p => (
                                        p.name !== response.name
                                    ) ) ;

                                    finalSucessFor.push( response.name ) ;

                                } else {
                                    
                                    if( response.status === 401 ) {
                                        // Bad request

                                        // rname here
                                        finalErrors.push( <Notif
                                            key={Date.now()}
                                            text={`${response.name} existe déjà `}
                                            type="error"
                                            onClose={({remove}) => remove()}
                                        /> ) ;
                                    } else {

                                        finalErrors.push( <Notif
                                            key={Date.now()}
                                            text={`une erreur de réseaux et survenue , check README.md ERROR_CODE[10b2] branch => v0.2.2-beta`}
                                            type="error"
                                            onClose={({remove}) => remove()}
                                        /> ) ;

                                        console.error('unknow error in add image response : ', response )
                                    }
                                }

                            } ) ;
                            
                            // notif success pictures add
                            setSuccessFor( finalSucessFor || [] );
                            
                            // notif errors pictures add
                            setErrors( finalErrors ) ;
                            
                            // contains pictures errors 
                            setPreviews( finalPreviews) ;
                            
                            // off loader submit form
                            setLoaderAddPicture( false ) ;

                            // force reload all pictures to next render
                            setPictures( {
                                pics:false,
                                loader:<Loader
                                    width={64}
                                    bg="rgba(0,0,0,.9)"
                                    type="timer"
                                /> 
                            } ) ;

                        } )
                        .catch( err => {
                            setLoaderAddPicture( false ) ;
                            console.error( err ) ;
                        } ) ;
                    }
                    else { // not file.s send

                        setErrors( [ ...errors , <Notif
                            key={Date.now()}
                            text="vous n'avez pas envoyé de fichier"
                            type="error"
                            onClose={({remove}) => remove()}
                        /> ] ) ;
                    }
                }}
                onChange={(file,blob,name) => {
                    
                    if( name.length < 2 || name.length >= 42 ) {

                        setErrors( [ ...errors , <Notif
                            key={Date.now()}
                            text="taille de nom invalide"
                            type="error"
                            onClose={({remove}) => remove()}
                        /> ] ) ;

                    } else if( previews.find( preview => preview.name === name ) ) {
                        setErrors( [ ...errors , <Notif
                            key={Date.now()}
                            text="ce nom d'image éxiste déjà"
                            type="error"
                            onClose={({remove}) => remove()}
                        /> ] ) ;
                    }
                    else if( previews.length >= 3 ) {
                        
                        setErrors( [ ...errors , <Notif
                            key={Date.now()}
                            text="Vous ne pouvez pas ajouté plus d'images en 1 seule fois ."
                            type="error"
                            onClose={({remove}) => remove()}
                        /> ] ) ;
                    }
                    else {
                        
                        setPreviews( [...previews,{
                            blob: blob,
                            name: name
                        }] ) ;
                    }
                } }
                load={loaderAddPicture}
                imgsLength={previews.length}
            />

            {errors.map( error => error )}

            {
                (
                    previews.length ? (
                        <Previews
                            onRname={(currentName,rname) => {
                                
                                if( previews.find( preview => preview.name === rname ) ) {
                                    // here re name value already exists

                                    // notif error

                                    setErrors( [...errors , <Notif
                                        key={Date.now().toString() + Math.random().toString()}
                                        type="error"
                                        onClose={({remove,hide}) => !remove() ? hide(): null}
                                        text="ce nom d'image existe déjà"
                                    />] ) ;


                                } else {

                                    
                                    setErrors( [...errors , <Notif
                                        key={Date.now().toString() + Math.random().toString()}
                                        type="success" // lol
                                        onClose={({remove,hide}) => !remove() ? hide(): null}
                                        text={`l'image ${currentName} à été re nomé en ${rname}`}
                                    />] ) ;

                                    setPreviews( previews.map( preview => {
                                        if(preview.name === currentName)
                                        preview.name = rname ;
                                        return preview;
                                    } ) ) ;
                                }
                            }}
                            onRemove={preview => (
                                setPreviews( previews.filter( p => p.name !== preview.name ) )
                            )}
                            items={previews}
                        />
                    ) : null
                )
            }

            {
                (
                    successFor.length ? (
                        <ul>
                            {
                                successFor instanceof Array ? 
                                successFor.map( (name,key) => (
                                    <li key={key}>
                                        <Notif
                                            type="success"
                                            onClose={({remove,hide}) => !remove() ? hide(): null}
                                            text={`L'image ${name} à été ajouté avec succés`}
                                        />
                                    </li>
                                ) ) : null
                            }
                        </ul>
                    ) : null
                )
            }
        </section>
    )
}

export default ShowAlbum;