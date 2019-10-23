import React,{useState} from 'react';
import {useParams} from 'react-router-dom';
import FormAdd from './../FormAdd/FormAdd';
import Loader from './../Loader/Loader';
import Notif from './../Notif/Notif';
import ListImg from './../ListImg/ListImg';
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
    const [voidForm,setVoidForm] = useState( false );
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
                        name.length <= 42 &&
                        name.length >= 2 &&
                        picture
                    ) {
                        setLoaderAddPicture( <Loader type="btn" width={16} />);
                        db.addPicture(id,name, picture)
                        .then( ({success}) => {

                            setLoaderAddPicture(false);

                            if( success ) {
                                setVoidForm( true );
                                setTimeout(() => {
                                    setVoidForm( false );
                                }, 100);
                                setPictures({
                                    pics:null,loader:<Loader
                                    width={64}
                                    bg="rgba(0,0,0,.9)"
                                    type="timer"
                                />})

                            } else {
                                setErrors( [ ...errors , <Notif
                                    key={Date.now()}
                                    text="nom déjà existant"
                                    type="error"
                                    onClose={({remove}) => remove()}
                                /> ] ) ;
                            }

                        } ) ;
                    }
                    else {

                        const mssg = picture ? "taille de nom invalide":"vous n'avez pas envoyé de fichier"

                        setErrors( [ ...errors , <Notif
                            key={Date.now()}
                            text={mssg}
                            type="error"
                            onClose={({remove}) => remove()}
                        /> ] ) ;
                    }
                }}
                load={loaderAddPicture}
            />
            {errors.map( error => error )}

        </section>
    )
}

export default ShowAlbum;