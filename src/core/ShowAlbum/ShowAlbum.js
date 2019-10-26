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
    const [voidForm,setVoidForm] = useState( false );
    const [sendPreview,setSendPreview] = useState( false );
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
                voidForm={voidForm}
                onSubmit={({name,picture}) => {
                    
                    if(
                        previews.length
                    ) {
                        setLoaderAddPicture( <Loader type="btn" width={16} />);

                        let tempPreviews = previews ;
                        let finish = 0;
                        let total = tempPreviews.length;

                        previews.forEach( preview => {

                            if(!(
                                preview.name.length <= 42 &&
                                preview.name.length >= 2
                            )) {
                                return setErrors( [ ...errors , <Notif
                                    key={Date.now()}
                                    text="taille de nom invalide"
                                    type="error"
                                    onClose={({remove}) => remove()}
                                /> ] ) ;
                            } 

                            // else add picture
                            db.addPicture(id,preview.name, preview.blob)
                            .then( response => {

                                finish++;
                                setLoaderAddPicture(false);

                                if( response.success ) {
                                    
                                    tempPreviews = tempPreviews.filter( p => p.name !== response.name ) ;

                                    if( finish >= total ) {

                                        setSuccessFor( 
                                            Array.from( 
                                                Array( total - tempPreviews.length ).keys()
                                            ).map( key => previews[key].name )
                                        ) ;

                                        setPreviews( tempPreviews );
                                        setSendPreview( true );

                                        setTimeout(() => {
                                            setSendPreview( false );
                                            setPreviews( [] );
                                        }, 5e3);
                                            
                                        setVoidForm( true );
                                        setTimeout(() => {
                                            setVoidForm( false );
                                        }, 100);
                                        setPictures({
                                            pics:null
                                            ,loader:<Loader
                                                width={64}
                                                bg="rgba(0,0,0,.9)"
                                                type="timer"
                                            />
                                        }) ;
                                    }
                                } else {
                                    setErrors( [ ...errors , <Notif
                                        key={Date.now()}
                                        text="nom déjà existant"
                                        type="error"
                                        onClose={({remove}) => remove()}
                                    /> ] ) ;
                                }

                            } ) ;

                        } ) ;
                    }
                    else {

                        const mssg = "vous n'avez pas envoyé de fichier"

                        setErrors( [ ...errors , <Notif
                            key={Date.now()}
                            text={mssg}
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
                            onRemove={preview => (
                                setPreviews( previews.filter( p => p.name !== preview.name ) )
                            )}
                            items={previews}
                            error={!!sendPreview}
                        />
                    ) : null
                )
            }

            {
                (
                    successFor.length ? (
                        <ul>
                            {
                                successFor.map( (name,key) => (
                                    <li key={key}>
                                        <Notif
                                            type="success"
                                            onClose={({remove,hide}) => !remove() ? hide(): null}
                                            text={`L'image ${name} à été ajouté avec succés`}
                                        />
                                    </li>
                                ) )
                            }
                        </ul>
                    ) : null
                )
            }
        </section>
    )
}

export default ShowAlbum;