import React,{useState} from 'react';
import ImgFilter from './../ImgFilter/ImgFilter';
import {HashLink as Link} from 'react-router-hash-link';
import ControlItem from './../ControlItem/ControlItem';
import Loader from './../Loader/Loader';
import Notif from './../Notif/Notif';
import './ItemImg.css';

function ItemImg({item,db,even}) {

    const [control,setControl] = useState( false );
    const [visible,setVisible] = useState( true );
    const [loadRname,setLoadRname] = useState( false );
    const [errors,setErrors] = useState( [] );
    const [btnNav] = useState( React.createRef() );
    const [manualControl,setManualControl] = useState( false );

    return (
        <>
            { visible && (
                <li
                onMouseEnter={() => btnNav.current.classList.remove('hide')}
                onMouseLeave={() => btnNav.current.classList.add('hide')}
                className={`ItemImg ${visible ? '':'hide'} ${even ? 'even':''}`}
            >
                <Link
                    className="link-filter"
                    to={`/filter/${item.id}`}
                    onContextMenu={e => e.preventDefault()}
                    onPointerDown={e => {
                        if( e.nativeEvent.which === 3 ) {
                            setControl( !control );
                        }
                    }}
                    onKeyDown={e => {
                        if( /menu/i.test(e.key) ) {

                            setControl( !control );
                        }
                    }}
                >
                    <ImgFilter
                        pics={item}
                        figcaption={
                            <div
                                className="status-control"
                            >
                                <button
                                    ref={btnNav}
                                    className="hide"

                                    onClick={e => {
                                        e.preventDefault();
                                        
                                        setManualControl( !control );
                                        setControl(!control);
                                    }}
                                >
                                    <i class={!control ? "fas fa-ellipsis-v":"fas fa-times"}></i>
                                </button>
                            </div>
                        }
                        classFig="fig-picsy"
                    />
                </Link>

                <ControlItem
                    closer
                    itemType="image"
                    onRemove={() => {
                        db.removePicture( item.id ).then( () => {
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

                        db.rnameImg(
                            item.id,
                            rname,
                            item.get('album_id')
                        ).then( resp => {

                            setLoadRname( false );

                            if( resp.success ) {

                                // success
                                setErrors(
                                    [...errors , <Notif
                                        onClose={({remove}) => remove()} 
                                        key={Date.now()}
                                        text="image à été renomé avec succés"
                                        type="success"        
                                    />]
                                ) ;

                            } else {

                                if( resp.status === 401  ) {
                                    // Bad Request
                                    // this name already exists
                                    // in this album
                                    setErrors( [...errors ,<Notif
                                        key={Date.now()} 
                                        type="error"
                                        onClose={({remove}) => remove()}
                                        text={`l'image ${rname} exists déjà dans cet album`}
                                    />] ) ;

                                } else { // 404
                                    // here file not exists
                                    console.warn('file rname 404 with : ' , item.id , item.get('name') );
                                }

                            }

                        } ) ;
                    }}
                    loadRname={loadRname}
                    onClose={() => {
                        setControl(false)
                    }}
                    pic={item}
                    open={control}
                    errorsRname={errors}
                />
            </li>
            )
            }
        </>
    ) ;
}

export default ItemImg;