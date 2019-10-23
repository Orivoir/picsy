import React,{useState,useEffect} from 'react';
import Confirm from './../Confirm/Confirm';
import './ControlItem.css';
import ReactToolTip from 'react-tooltip';

function ControlItem({
    manualOpen,
    open,
    onClose,
    onRemove,
    onRname,
    loadRname,
    pic,
    errorsRname,
    onOpen,
    itemType,
    closer
}) {

    const [confirm,setConfirm] = useState(false);
    const [inputRname,setInputRname] = useState(false);
    const [rname,setRname] = useState("");
    const [firstControl] = useState( React.createRef() );
    const [rnameRef] = useState( React.createRef() );

    useEffect( () => {

        if( open && !confirm )
            setTimeout(() => {
                if( firstControl.current )
                firstControl.current.focus()
            } , 250);

    } ) ;

    return (
        <ul
            className={`ControlItem`}
            onMouseEnter={() => onOpen()}
            onMouseLeave={() => {
                if( !manualOpen ) {
                    onClose()
                }
            }}
        >
            <li
                className={`${open && !confirm ? "":"hide"}`}
            >
                
                <ReactToolTip 
                    id="rname"
                    type="info"
                    getContent={()=> (
                        <p style={{
                            fontSize: "16px"
                        }}>
                            <i className="fas fa-info-circle"></i>
                            &nbsp;renomé l'{itemType !== 'album' ? 'image': 'album'}
                        </p>
                    )} 
                    effect="solid"
                    place="top"
                />
                <button
                    data-for="rname"
                    data-tip="renomé"
                    onContextMenu={e => e.preventDefault()}
                    ref={firstControl}
                    className={`${inputRname ? 'hide':''}`}
                    onClick={() => {
                        setInputRname(true);
                        setTimeout(() => 
                            rnameRef.current.focus(), 120
                        );
                    }}
                >
                    <i className="fas fa-pen"></i>
                </button>

                
                <form
                        className={`${inputRname ? '':'close'}`}
                        onSubmit={e => {
                            e.preventDefault();
                            onRname( rname );
                        }}
                    >

                        <input
                            ref={rnameRef}
                            className={`input-rname rname ${!inputRname ? 'hide':'open'}`}
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
                            className={`rname-btn ${inputRname ? '':'hide'}`}
                        >
                            {
                                loadRname ||
                                <i className="fas fa-times"></i>
                            }
                        </button>

                        {
                            errorsRname.map( error => (
                                error
                            )  )
                        }

                </form>
            </li>

            <li
                className={`${open && !inputRname ? "":"hide"}`}
            >
                {

                    confirm || (
                        <>
                            <ReactToolTip 
                                id="remove"
                                type="info"
                                getContent={()=> (
                                    <p style={{
                                        fontSize: "16px"
                                    }}>
                                        <i className="fas fa-info-circle"></i>
                                        &nbsp;supprimé l'{itemType !== 'album' ? 'image': 'album'}
                                    </p>
                                )} 
                                effect="solid"
                                place="top"
                            />
                            <button
                                data-tip="supprimé"
                                data-for="remove"
                                onClick={() =>
                                    setConfirm(
                                        <Confirm
                                            onConfirm={() => {
                                                onRemove();
                                            }}
                                            onFinally={() => setConfirm( false )}
                                            text={`êtes vous sur de vouloir supprimez l'${itemType} ${pic.get('name')}`}
                                            textConfirm="oui"
                                            textCancel="non"
                                            className="confirm-remove confirm-remove-picture"
                                            // title="Suppréssion"
                                            icons
                                            autoFocus
                                    />
                                )}
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        </>       
                    )
                }
            </li>

            <li
                className={`${open && !inputRname && closer && !confirm ? "":"hide"}`}
            >
                
                <ReactToolTip 
                    id="close"
                    type="info"
                    getContent={()=> (
                        <p style={{
                            fontSize: "16px"
                        }}>
                            <i className="fas fa-info-circle"></i>
                            &nbsp;fermé le menu
                        </p>
                    )} 
                    effect="solid"
                    place="top"
                />
                <button
                    data-for="close"
                    data-tip="fermé le menu"
                    onClick={() => onClose instanceof Function ? onClose(): null}
                >
                    <i className="fas fa-times"></i>
                </button>
            </li>
        </ul>
    ) ;
}

export default ControlItem;