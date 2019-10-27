import React,{useState,useEffect} from 'react';
import Confirm from './../Confirm/Confirm';
import './ControlItem.css';
import Icons from './../Icons/Icons';
import Notif from './../Notif/Notif';

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
    closer,
    tipRemove
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
            onMouseEnter={() => onOpen instanceof Function ? onOpen(): null}
            onMouseLeave={() => {
                if( !manualOpen && onClose instanceof Function) {
                    onClose();
                }
            }}
        >
            <li
                className={`${open && !confirm ? "":"hide"}`}
            >

                <Icons
                    tooltip={(
                        <Notif
                            type="info"
                            place="top"
                            tooltip={`rname-${Date.now()}`}
                            text={(
                                <>
                                    renomé l'
                                    {itemType !== 'album' ? 'image': 'album'}
                                </>
                            )}
                        />
                    )}
                    className="fas fa-pen"
                    onClick={() => {
                        setInputRname(true);
                        setTimeout(() => 
                            rnameRef.current.focus(), 120
                        );
                    }}
                    classHandle={`${inputRname ? 'hide':''}`}
                />
                
                <form
                        className={`${inputRname ? '':'close'}`}
                        onSubmit={e => {
                            e.preventDefault();
                            onRname( rname );
                            setRname( '' );
                        }}
                    >

                        <input
                            ref={rnameRef}
                            className={`input-rname rname ${!inputRname ? 'hide':'open'} ${loadRname ? 'load-input': ''}`}
                            type="text"
                            name="rname"
                            value={rname}
                            onChange={e => setRname( e.target.value )}
                            autoComplete="off"
                            placeholder={pic.get('name')}
                            disabled={!!loadRname}
                        />
 
                        <Icons
                            tooltip={(
                                <Notif
                                    type="info"
                                    place="top"
                                    tooltip="back"
                                    text="fermé"
                                />
                            )}
                            loader={loadRname}
                            className="fas fa-times"
                            onClick={() => setInputRname(false)}
                            classHandle={`rname-btn ${inputRname ? '':'hide'} ${loadRname ? 'load-btn disabled': ''}`}
                        />

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
                            <Icons
                                tooltip={(
                                    <Notif
                                        type="info"
                                        place="top"
                                        tooltip="remove"
                                        text={(
                                            <>
                                                {
                                                    tipRemove || (
                                                        <>
                                                            supprimé l'
                                                            {itemType !== 'album' ? 'image': 'album'}
                                                        </>
                                                    )
                                                }
                                            </>
                                        )}
                                    />
                                )}
                                className="fas fa-trash"
                                onClick={() => (
                                    setConfirm(
                                        <Confirm
                                            onConfirm={onRemove}
                                            onFinally={() => setConfirm( false )}
                                            text={`êtes vous sur de vouloir supprimez l'${itemType} ${pic.get('name')}`}
                                            textConfirm="oui"
                                            textCancel="non"
                                            className="confirm-remove confirm-remove-picture"
                                            icons
                                            autoFocus
                                    />)
                                )}
                            />
                        </>       
                    )
                }
            </li>

            <li
                className={`${open && !inputRname && closer && !confirm ? "":"hide"}`}
            >
                
                
                <Icons
                    tooltip={(
                        <Notif
                            type="info"
                            place="top"
                            tooltip="close"
                            text="férmer le menu"
                        />
                    )}
                    className="fas fa-times"
                    onClick={() => onClose instanceof Function ? onClose(): null}
                />
            </li>
        </ul>
    ) ;
}

export default ControlItem;