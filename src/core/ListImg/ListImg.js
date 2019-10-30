import React ,  {useState} from 'react';
import ItemImg from './../ItemImg/ItemImg';
import './ListImg.css';
import ChangeAlign from './../ChangeAlign/ChangeAlign';
import Slider from './../Slider/Slider';

function getPropsItem( item , db ) {

    return {
        key:item.id
        ,item:item
        ,db:db
    }
}

function ListImg( {
    items,
    load,
    db
} ) {

    const [align,setAlign] = useState( false ) ;

    return (
        <section>
            <ul
                className="ListImg"
            >
                {
                    load || (
                        <>
                            {
                                !align ? 
                                items.map( item => (
                                    <ItemImg {...getPropsItem( item , db )} />
                                ) ) : (
                                    <Slider
                                        timeout={5e3}
                                        imgs={(
                                            items.map( item => (
                                                <ItemImg {...getPropsItem( item , db )} />
                                            ))
                                        )}
                                    />
                                )
                            }
                        </>
                    )
                }
            </ul>

            <ChangeAlign setter={setAlign} status={align} />
            
        </section>
    ) ;
}

export default ListImg;