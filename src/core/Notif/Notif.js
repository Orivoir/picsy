import React, {useState} from 'react';
import './Notif.css';

function assoceIconType( type ) {

    const assoc = {
        'warn': 'fas fa-exclamation-triangle'
        ,'warning': 'fas fa-exclamation-triangle'
        ,'error':'fas fa-bomb'
        ,'infos': 'fas fa-info-circle'
        ,'success': 'fas fa-check-circle'
        ,'bug': 'fas fa-bug'
        , 'mask': 'fas fa-mask'
        , 'back': 'fas fa-hand-point-left'
    } ;

    return assoc[ type ] || assoc['mask'] ;
}

function Notif( {
    type
    ,className
    ,onClose
    ,text
} ) {

    const [refNotif] = useState( React.createRef() );
    const [hide,setHide] = useState( false );

    return (
        <section
            ref={refNotif}
            className={`Notif ${className} ${type} ${hide ? 'hide':''}`}
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

                                    if( 
                                        refNotif.current instanceof Node &&
                                        refNotif.current.parentNode instanceof Node
                                    ) {
                                    
                                        refNotif.current.parentNode.removeChild( refNotif.current );
                                        return true;
                                    }
                                    return false;
                                }
                                ,hide() {
                                    setHide( true );
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