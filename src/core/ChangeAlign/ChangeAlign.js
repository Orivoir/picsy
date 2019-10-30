import React from 'react';
import {iconsChangeAlign as icons} from './../icons';
import Icons from './../Icons/Icons';
import './ChangeAlign.css';

function ChangeAlign( {setter,status} ) {

    return (
        <section className="ChangeAlign">
            {icons.map( icon => (
                <Icons
                    alt={icon.alt}
                    key={icon.id}
                    tooltip={icon.tooltip}
                    className={icon.className}
                    onClick={() => (
                        icon.onClick( setter )
                    ) }
                    classHandle={`${status && icon.id ? 'active': !status && !icon.id ? 'active' : ''} `}
                />
            ) )}
        </section>
    ) ;
}
 
export default ChangeAlign;