import React from 'react';
import './Loader.css';
import LoaderTime from './loader-timer.svg';
import LoaderEarth from './loader-earth.svg';
import LoaderBtn from './loader-button.svg';
import LoaderAzure from './loader-azure.svg';

function assoceType( type ) {

    const assoc = {
        'timer': LoaderTime
        ,'btn': LoaderBtn
        ,'button': LoaderBtn
        ,'earth': LoaderEarth
        ,'azure': LoaderAzure
        ,'az': LoaderAzure
    } ;

    return assoc[ type ] || LoaderTime ;
}

function Loader({
    className
    ,width
    ,full
    ,type
    ,bg
}){

    return (
        <figure
            className={`Loader ${className} ${full ? 'full' :''}`}
            style={{
                backgroundColor: bg || 'transparent'
            }}
        >
            <img
                alt={`loader ${type}`}
                src={assoceType( type )}
                width={width}
            />
        </figure>
    ) ;

}

export default Loader;