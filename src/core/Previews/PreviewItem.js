import React,{useState} from 'react';
import ControlItem from './../ControlItem/ControlItem';
import Loader from './../Loader/Loader';

function PreviewItem({item,onRemove,onRname}){

    const [loadRname,setLoadRname] = useState( false );

    return (
        <li>
            <figure>
                <img
                    src={item.blob}
                    alt="pré vue d'ajout"
                    width={128}
                />
                <figcaption>
                    {item.name}
                </figcaption>


                <ControlItem
                    onRemove={onRemove}
                    onRname={(rname,rnameRef) => {

                        setLoadRname( <Loader type="btn" width={24} /> ) ;
                        
                        setTimeout(() => {
                            setLoadRname( false ) ;
                        },  (Math.round( Math.random() * 95 ) + 150 ) );

                        onRname( item.name , rname );  
                    }}
                    open={true}
                    pic={
                        {
                            get: function( type ) {
                                return type === 'name' ? item.name : item.blob; 
                            }
                        }
                    }
                    loadRname={loadRname}
                    errorsRname={[]}
                    tipRemove="supprimé de l'ajout"
                    itemType="image"
                />

            </figure>
        </li>
    ) ;
}

export default PreviewItem;