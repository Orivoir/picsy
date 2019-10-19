import React,{useState} from 'react';
import Confirm from './../Confirm/Confirm';

function ControlImg({
    open,
    onClose,
    onRemove,
    onRname,
    loadRname,
    pic
}) {

    const [confirm,setConfirm] = useState(false);
    const [inputRname,setInputRname] = useState(false);
    const [rname,setRname] = useState("");

    return (
        <ul
            className={`${open ? "":"hide"}`}
        >
            <li>
                <button
                    onClick={() => setInputRname(true)}
                >
                    <i className="fas fa-pen"></i>
                </button>

                
                <form
                        className={`${inputRname ? '':'hide'}`}
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
                            placeholder={pic.get('name')}
                            disabled={!!loadRname}
                        />

                        <button
                            type="button"
                            onClick={() => setInputRname(false)}
                        >
                            {
                                loadRname ||
                                <i className="fas fa-times"></i>
                            }
                        </button>

                </form>
            </li>

            <li>
                <button
                    onClick={() =>
                        setConfirm( <Confirm
                            onConfirm={() => {
                                onRemove();
                            }}
                            onFinally={() => setConfirm( false )}
                            text={`êtes vous sur de vouloir supprimez l'album ${pic.get('name')}`}
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
                        confirm || (
                            <i className="fas fa-trash"></i>
                        )
                    }
                </button>
            </li>

            <li>
                <button
                    onClick={() => onClose instanceof Function ? onClose(): null}
                >
                    <i className="fas fa-times"></i>
                </button>
            </li>
        </ul>
    ) ;
}

export default ControlImg;