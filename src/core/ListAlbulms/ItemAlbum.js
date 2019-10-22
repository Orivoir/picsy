import React,{useState} from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import ControlItem from './../ControlItem/ControlItem';
import Loader from './../Loader/Loader';
import Notif from './../Notif/Notif';
import {Redirect} from 'react-router-dom';
import './ItemAlbum.css';

const
    btnLinkRef = React.createRef()
;

function ItemAlbum({
    item,
    db
}) {


    const [control,setControl] = useState( false );
    const [loadRname,setLoadRname] = useState( false );
    const [visible,setVisible] = useState( true );
    const [name,setName] = useState( item.get('name') );
    const [manualControl,setManualControl] = useState( false );
    const [redirect,setRedirect] = useState( false );
    const [errors,setErrors] = useState( [] );
    const [refItem] = useState(React.createRef());

    return (
        <>
            {redirect}
            { visible && (
                <li
                onMouseEnter={() => setControl(true)}
                onMouseLeave={() => setControl(false)}
                className={`AlbumItem ${visible ? '':'hide'}`}
                ref={refItem}
            >
                <div className="number-item">
                    {item.get('size')} images
                </div>
                <button
                    className="album-btn"
                    ref={btnLinkRef}
                    onKeyDown={e => {
                        if( /menu/i.test(e.key) )
                            setControl( true );
                            setManualControl( true );
                    } }
                    onClick={() => setRedirect( <Redirect to={`album/${item.id}`} /> )}
                    onContextMenu={e => e.preventDefault()}
                >
                    <Link
                        onPointerUp={e => {
                            if(e.nativeEvent.which === 3 ) {

                                setControl(true);
                                setManualControl( true );
                            }
                        }}
                        to={`album/${item.id}`}
                    >
                        {name}
                    </Link>
                </button>

                <section>

                    <aside>      
                        <ControlItem
                            itemType="album"
                            onRemove={() => {
                                db.removeAlbum( item.id ).then( () => {
                                    setVisible( false );
                                    setControl( false );
                                } )
                            }}
                            manualOpen={manualControl}
                            onOpen={() => setControl( true )}
                            onRname={rname => {
                                setLoadRname( <Loader 
                                    width={12}
                                    type="azure"
                                /> ) ;

                                db.rnameAlbum( 
                                    item.id
                                    ,rname
                                ).then( () => {
                                
                                    // success
                                    setErrors(
                                        [...errors , <Notif
                                            onClose={({remove}) => remove()} 
                                            key={Date.now()}
                                            text="l'album à été renomé avec succés"
                                            type="success"
                                        />]
                                    ) ;
                                    setName( rname );
                                } );
                            }}
                            loadRname={loadRname}
                            onClose={() => {/* silence is <feature /> */}}
                            pic={item}
                            open={control}
                            errorsRname={errors}
                        />
                        
                    </aside>
                </section>
            </li>
            ) }
        </>
    ) ;
}

export default ItemAlbum;