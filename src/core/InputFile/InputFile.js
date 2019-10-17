import React from 'react';

function InputFile({
    className
    ,label
    ,name
    ,id
    ,onChange
    ,autoRead
    ,notif
}){
    return (
        <>
            {label && (
                <label htmlFor={id || name}>
                    {label}
                </label>
            ) }
            <input
                className={className}
                type="file"
                name={name}
                id={id || name}
                onChange={e => {

                    if( !(onChange instanceof Function) ) return;

                    const file = e.target.files[0] ;
                    
                    if( autoRead ) {

                        let blob = null;

                        const reader = new FileReader();
                        const evt = e;

                        reader.addEventListener('load' , e => {

                            blob = e.target.result;
                            onChange( file , blob , evt ) ;
                        } ) ;

                        reader.readAsDataURL( file );
                    } else {

                        onChange( file , e ) ;
                    }
                }}
            />
            {notif}
        </>
    );
}

export default InputFile;