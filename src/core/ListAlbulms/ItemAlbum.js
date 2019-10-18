import React,{useState} from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import ControlAlbums from './ControlAlbums';
import Loader from './../Loader/Loader';
import Notif from './../Notif/Notif';
import {Redirect} from 'react-router-dom';

const
    btnLinkRef = React.createRef()
    ,firstRef = React.createRef()
;

function ItemAlbum({
    item,
    onRemove,
    onRname,
    errorRname
}) {

    const [control,setControl] = useState( false );
    const [loadRemove,setLoadRemove] = useState( false );
    const [loadRname,setLoadRname] = useState( false );
    const [visible,setVisible] = useState( true );
    const [name,setName] = useState( item.get('name') );
    const [errorName,setErrorName] = useState( false );
    const [redirect,setRedirect] = useState( false );

    return (
        <>
            {redirect}
            <li
            className={`${visible ? '':'hide'}`}
            >
                <button
                    ref={btnLinkRef}
                    onKeyDown={e => {
                        if( /menu/i.test(e.key) )
                            setControl( true );
                    } }
                    onClick={() => setRedirect( <Redirect to={`album/${item.id}`} /> )}
                    onContextMenu={e => e.preventDefault()}
                >
                <Link
                    onPointerUp={e => {
                        if(e.nativeEvent.which === 3 )
                            setControl(true);
                    }}
                    to={`album/${item.id}`}
                >
                    {name}
                </Link>
                </button>

                <section>

                    <aside 
                        className={`${control ? '':'hide'}`}
                    >
                        
                        <ControlAlbums 
                            focus={control}
                            firstRef={firstRef}
                            onRemove={() => {
                                setLoadRemove( <Loader width={16} type="btn" />)
                                onRemove().then( () => {
                                    setVisible( false );
                                    setLoadRemove( false );
                                } );
                            }}
                            onRname={rname => {

                                if( rname === name ) {

                                    setErrorName( <Notif 
                                        text="l'album posséde déjà ce nom"
                                        onClose={({remove}) => remove()}

                                    /> ) ;

                                } else {
                                    setLoadRname( <Loader width={16} type="btn" /> );
                                    onRname( rname ).then( () => {
                                        setName( rname );
                                        setLoadRname( false );
                                        setControl( false );
                                    } ) ;
                                }
                            }}
                            onClose={() => {
                                setControl(false);
                                btnLinkRef.current.focus();
                            }}
                            loadRemove={loadRemove}
                            loadRname={loadRname}
                            errorRname={errorName}
                            album={item}
                        />
                        
                    </aside>
                </section>
            </li>
        </>
    ) ;
}

export default ItemAlbum;