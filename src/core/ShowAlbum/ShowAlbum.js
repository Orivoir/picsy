import React,{useState} from 'react';
import {useParams} from 'react-router-dom';
import FormAdd from './../FormAdd/FormAdd';
import Loader from './../Loader/Loader';
import Notif from './../Notif/Notif';

function ShowAlbum({db}) {
    const {id} = useParams();
    const [loaderAddPicture,setLoaderAddPicture] = useState( false );
    const [errors,setErrors] = useState([]);

    return (
        <>
            <FormAdd
                type="picture"
                onSubmit={({name,picture}) => {
                    
                    if( 
                        name.length <= 42 &&
                        name.length >= 2
                    ) {
                        setLoaderAddPicture( <Loader type="btn" width={16} />);
                        db.addPicture(id,name, picture)
                        .then( ({success}) => {

                            setLoaderAddPicture(false);

                            if( success ) {

                                setErrors( [ <Notif
                                    key={Date.now()}
                                    text="fichier ajouté avec succés"
                                    type="success"
                                    onClose={({remove}) => remove()}
                                /> ] ) ;

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
                        setErrors( [ ...errors , <Notif
                            key={Date.now()}
                            text="taille de nom invalide"
                            type="error"
                            onClose={({remove}) => remove()}
                        /> ] ) ;
                    }
                }}
                load={loaderAddPicture}
            />
            {errors.map( error => error )}
        </>
    )
}

export default ShowAlbum;