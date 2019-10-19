import React,{useState} from 'react';
import ImgFilter from './../ImgFilter/ImgFilter';
import {HashLink as Link} from 'react-router-hash-link';
import ControlImg from './../ControlImg/ControlImg';

function ItemImg({item}) {

    const [control,setControl] = useState( false );

    return (
        <li>
            <Link 
                to={`/filter/${item.id}`}
                onContextMenu={e => e.preventDefault()}
                onPointerDown={e => {
                    if( e.nativeEvent.which === 3 ) {
                        setControl( true );
                    }
                }}
                onKeyDown={e => {
                    if( /menu/i.test(e.key) ) {

                        setControl( true );
                    }
                }}
            >
                <ImgFilter
                    pics={item}
                    figcaption={item.get('name')}
                />
            </Link>

            <ControlImg
                onRemove={() => {}}
                onRname={() => {}}
                onClose={() => setControl(false)}
                pic={item}
                open={control}
            />
        </li>
    ) ;
}

export default ItemImg;