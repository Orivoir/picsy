import React,{useState,useEffect} from 'react';
import InputFile from './../InputFile/InputFile';
import Notif from './../Notif/Notif';
import './FormAdd.css';
import ReactTooltip from 'react-tooltip';

function FormAdd({type,onSubmit,load,className,voidForm}){

    const [picture,setPicture] = useState("https://image0.flaticon.com/icons/png/128/189/189334.png");
    const [errors,setErrors] = useState([]);
    const [name,setName] = useState("");
    const [refName] = useState( React.createRef() );

    useEffect( () => {

        if( voidForm ) {
            refName.current.value = "";
        }

    } ) ;

    return (
        <>
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

            <div className="field-wrap-pseudo">
                <input
                    ref={refName}
                    type="text"
                    placeholder={`nom de l'${!/album/i.test(type) ? 'image':'album' }`}
                    autoComplete="off"
                    onChange={({target}) => setName( target.value ) }
                />
                <label 
                    htmlFor="name"
                    className={`${!!name.length ? 'active':'o-hide'}`}
                >
                    nom d'{!/album/i.test(type) ? 'image':'album' }
                </label>
            </div>

            {
                !/album/i.test(type) ?
                <InputFile
                    className="hide"
                    name="picture"
                    label={
                        <>
                        <ReactTooltip
                                id="add-picture"
                                type="info"
                                getContent={()=> (
                                    <p style={{
                                        fontSize: "16px"
                                        ,margin: 0
                                    }}>
                                        <i className="fas fa-info-circle"></i>
                                        &nbsp;ajouté une image
                                    </p>
                                )}    
                                effect="solid"
                                place="top"
                            />
                            <figure
                                data-tip="ajouté une image"
                                data-for="add-picture"
                            >
                                <button
                                    type="button"
                                    onClick={e =>  e.target.parentNode.click()}
                                >
                                    <img
                                        src={picture}
                                        alt="ajouté"
                                        width={64}
                                    />
                                </button>
                            </figure>
                        </>
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
                                    key={Date.now()} 
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
                type='submit'
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
        {errors.map( error => error )}
      </>
    );
}

export default FormAdd;