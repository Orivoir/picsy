import React,{useEffect} from 'react';
import './Confirm.css'

const 
    confirmRef = React.createRef()
    ,btnsRef = {
        confirm: React.createRef()
        ,cacel: React.createRef()
    }
    , dataBack = {
        ref: confirmRef,
        confirm: confirmRef.current
    }
;

function Confirm({
    onConfirm,
    onCancel,
    onFinally,
    textConfirm,
    textCancel,
    textGlobal,
    text,
    className,
    autoFocus,
    autoFocusCancel,
    autoFocusConfirm,
    icons,
    title
}) {

    useEffect( () => {
        if(autoFocusCancel) {
            btnsRef.cancel.current.focus() ;
        } else if( autoFocusConfirm || autoFocus ) {   
            btnsRef.confirm.current.focus() ;
        }
    } )

    return (
        <section
            className={`Confirm ${className}`}
            ref={confirmRef}
        >
            {( title && <h2>{title}</h2> )}

            <p>
                {textGlobal || text}
            </p>

            <aside>
                <button
                    type="button"
                    className="confirm"
                    onClick={() => {
                        const
                            conf = onConfirm instanceof Function ? onConfirm: () => {},
                            fin = onFinally instanceof Function ? onFinally: () => {}
                        ;

                        conf( dataBack );
                        fin( dataBack );
                    }}
                    ref={btnsRef.confirm}
                >
                    {icons && (
                        <i className="fas fa-check"></i>
                    )}
                    <span>
                        {textConfirm}
                    </span>
                </button>
                
                <button
                    className="cancel"
                    ref={btnsRef.cancel}
                    type="button"
                    onClick={() => {

                        const
                            cancel = onCancel instanceof Function ? onCancel: () => {},
                            fin = onFinally instanceof Function ? onFinally: () => {}
                        ;
                        cancel( dataBack );
                        fin( dataBack );
                    }}
                >
                    {icons && (
                        <i className="fas fa-times"></i>
                    )}
                    <span>
                        {textCancel}
                    </span>
                </button>
            </aside>

        </section>

    )
}

export default Confirm;
