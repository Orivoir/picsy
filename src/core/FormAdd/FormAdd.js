import React,{useState,useEffect} from 'react';
import InputFile from './../InputFile/InputFile';
import Notif from './../Notif/Notif';
import './FormAdd.css';

function FormAdd({type,onSubmit,load,className,voidForm}){

    const [picture,setPicture] = useState("");
    const [errors,setErrors] = useState([]);
    const [name,setName] = useState("");
    const [refName] = useState( React.createRef() );

    useEffect( () => {

        if( voidForm ) {
            refName.current.value = "";
        }

    } ) ;

    return (
        <form
            className={`FormAdd ${className}`}
            onSubmit={e => {
                e.preventDefault();

                const data = {
                    name: name
                    ,picture: picture
                    ,e: e
                } ;

                if( /album/i.test(type) )
                    delete data.picture;

                onSubmit( data );
            }}
        >

            <label htmlFor="name">nom</label>
            <input
                ref={refName}
                type="text"
                placeholder={`nom de l'${!/album/i.test(type) ? 'image':'album' }`}
                autoComplete="off"
                onChange={({target}) => setName( target.value ) }
            />

            {
                !/album/i.test(type) ?
                <InputFile
                    className="hide"
                    name="picture"
                    label={
                        <figure>
                            <img
                                src={picture}
                                alt="ajouté"
                                width={64}
                            />
                        </figure>
                    }
                    autoRead
                    onChange={(file,blob,e) => {
                        if(
                            file.size <= 1e6 &&
                            /image/i.test(file.type)
                        ) {
                            setPicture( blob );
                        } else {

                            const mssg = file.size > 1e6 ? 
                                "fichier trop volumineux":
                                "ce fichier n'est pas une image valide"
                            ;
                            
                            setErrors( [...errors , 
                                <Notif 
                                    type="error"
                                    text={mssg}
                                    onClose={({remove}) => remove()}
                                />
                            ] ) ;
                        }
                    }}
                />
                : null
            }

            <button
                disabled={!!load}
            >
                {
                    load || (
                        <span>
                            ajouté l'{!/album/i.test(type) ? 'image' : 'album'}
                        </span>
                    )
                }
                
            </button>

        </form>
    );
}

export default FormAdd;