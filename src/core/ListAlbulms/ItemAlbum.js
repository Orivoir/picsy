import React,{useState} from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import ControlAlbums from './ControlAlbums';
import Loader from './../Loader/Loader';

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

    return (
        <li
            className={`${visible ? '':'hide'}`}
        >
            <button
                onKeyDown={e => {
                    if( /menu/i.test(e.key) )
                        setControl( true );
                } }
                onContextMenu={e => e.preventDefault()}
            >
            <Link
                onPointerUp={e => {
                    if(e.nativeEvent.which === 3 )
                        setControl(true);
                }}
                to={`album/${item.get('name')}`}
            >
                {item.get('name')}
            </Link>
            </button>

            <section>

                <aside 
                    className={`${control ? '':'hide'}`}
                >
                    
                    <ControlAlbums 
                        onRemove={() => {
                            setLoadRemove( <Loader width={16} type="btn" />)
                            onRemove().then( () => {
                                setVisible( false );
                                setLoadRemove( false );
                            } );
                        }}
                        onRname={rname => {
                            onRname( rname ).then( () => {
                                setControl( false )
                            } )
                        }}
                        onClose={() => setControl(false)}
                        loadRemove={loadRemove}
                        loadRname={loadRname}
                        errorRname={errorRname}
                        album={item}
                    />
                    
                </aside>
            </section>

        </li>
    ) ;
}

export default ItemAlbum;