import React, {useState,useEffect} from 'react';
import Confirm from './../Confirm/Confirm';

function ControlAlbums({
    onRemove
    ,onClose
    ,onRname
    ,loadRname
    ,loadRemove
    ,errorRname
    ,album
    ,focus
    ,firstRef
}) {

    const [input,setInput] = useState(false);
    const [rname,setRname] = useState("");
    const [confirm,setConfirm] = useState(false);

    useEffect( () => {
        setTimeout(() => focus ? firstRef.current.focus() : null, 75)
    } ) ;

    return (
        <section>
            <ul>
                <li>
                    <button
                        onContextMenu={e => e.preventDefault()}
                        ref={firstRef}
                        type="button"
                        className={`${!input ? '':'hide'}`}
                        onClick={() => setInput(true)}
                    >
                        <i className="fas fa-pen"></i>
                    </button>

                    <form
                        className={`${input ? '':'hide'}`}
                        onSubmit={e => {
                            e.preventDefault();
                            onRname( rname );
                        }}
                    >

                        <input 
                            type="text"
                            name="rname"
                            onChange={e => setRname( e.target.value )}
                            autoComplete="off"
                            placeholder={album.get('name')}
                            disabled={!!loadRname}
                        />

                        <button
                            type="button"
                            onClick={() => setInput(false)}
                        >
                            {
                                loadRname ||
                                <i className="fas fa-times"></i>
                            }
                        </button>

                    </form>

                </li>
                    
                <li>
                    {
                        confirm || (
                            <button
                                type="button"
                                onClick={() =>
                                    setConfirm( <Confirm
                                        onConfirm={() => {
                                            onRemove();
                                        }}
                                        onFinally={() => setConfirm( false )}
                                        text={`êtes vous sur de vouloir supprimez l'album ${album.get('name')}`}
                                        textConfirm="oui"
                                        textCancel="non"
                                        className="confirm-remove confirm-remove-album"
                                        title="Suppréssion"
                                        icons
                                        autoFocus
                                    />)
                                }
                                >
                                    {
                                        loadRemove || (
                                            <i className="fas fa-trash"></i>
                                        )                      
                                    }

                            </button>
                        )
                    }
                </li>
                
                <li>
                    <button
                        onClick={() => onClose()}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </li>
            </ul>
        </section>
    ); 
}

export default ControlAlbums;