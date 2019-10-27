import React, {useState} from 'react';
import './Notif.css';
import ReactToolTip from 'react-tooltip' ;

function assoceIconType( type ) {

    const assoc = {
        'warn': 'fas fa-exclamation-triangle'
        ,'warning': 'fas fa-exclamation-triangle'
        ,'error':'fas fa-bomb'
        ,'infos': 'fas fa-info-circle'
        ,'info': 'fas fa-info-circle'
        ,'success': 'fas fa-check-circle'
        ,'bug': 'fas fa-bug'
        , 'mask': 'fas fa-mask' // it's unknow notif
        , 'back': 'fas fa-hand-point-left'
    } ;

    return assoc[ type ] || assoc['mask'] ;
}

function Notif( {
    type
    ,className
    ,onClose
    ,text
    ,tooltip
    ,place
    ,effect
} ) {

    const [refNotif] = useState( React.createRef() );
    const [hide,setHide] = useState( false );

    return (
        <>
            {
                (
                    tooltip ? 
                    (
                        <ReactToolTip
                            id={tooltip}
                            type={(
                                type === 'infos' ? 
                                'info' : type === 'bug' ?
                                'error' : type === 'warn' ? 
                                'warning' : type
                            )}
                            getContent={() => (
                                <span style={{
                                    fontSize: "16px"
                                    ,display: 'flex'
                                    ,alignItems: 'center'
                                    ,justifyContent: 'space-around'
                                }}>
                                    <i className={assoceIconType(type)}></i>
                                    &nbsp;{text}
                                </span>
                            )}
                            effect={effect || 'solid'}
                            place={place || 'top'}
                        />
                    ) : (
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
                    )
                )
            }
        </>
    );
}

export default Notif;