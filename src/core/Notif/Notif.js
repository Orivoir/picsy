import React from 'react';

const refNotif = React.createRef();

function assoceIconType( type ) {

    const assoc = {
        'warn': 'fas fa-exclamation-triangle'
        ,'warning': 'fas fa-exclamation-triangle'
        ,'error':'fas fa-bomb'
        ,'infos': 'fas fa-info-circle'
        ,'success': 'fas fa-check-circle'
        ,'bug': 'fas fa-bug'
        , 'mask': 'fas fa-mask'
    } ;

    return assoc[ type ] || assoc['mask'] ;
}

function Notif( {
    type
    ,className
    ,onClose
    ,text
} ) {

    return (
        <section
            ref={refNotif}
            className={`Notif ${className} ${type}`}
        >
            
            <p>
                <i className={assoceIconType(type)}></i>

                <span>
                    {text}
                </span>
            </p>

            {
                onClose instanceof Function && (
                    <aside>
                        <button
                            onClick={() => onClose( {
                                ref: refNotif
                                ,notif: refNotif.current
                                ,remove() {
                                    refNotif.current.parentNode.removeChild( 
                                        refNotif.current
                                    );
                                }
                            })}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </aside>
                )
            }
            

        </section>
    );
}

export default Notif;