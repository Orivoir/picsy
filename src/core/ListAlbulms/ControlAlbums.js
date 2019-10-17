import React, {useState} from 'react';
import Confirm from './../Confirm/Confirm';

function ControlAlbums({
    onRemove
    ,onClose
    ,onRname
    ,loadRname
    ,loadRemove
    ,errorRname
    ,album
}) {

    const [input,setInput] = useState(false);
    const [rname,setRname] = useState("");
    const [confirm,setConfirm] = useState(false);

    return (
        <section>
            <ul>
                <li>
                    <button 
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
                        {
                            loadRname || (
                                <input 
                                    type="text"
                                    name="rname"
                                    onChange={e => setRname( e.target.value )}
                                    autoComplete="off"
                                    placeholder={album.name}
                                />
                            )
                        }

                        <button
                            type="button"
                            onClick={() => setInput(false)}
                        >
                            <i className="fas fa-times"></i>
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
                                        text={`êtes vous sur de vouloir supprimez l'album ${album.name}`}
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