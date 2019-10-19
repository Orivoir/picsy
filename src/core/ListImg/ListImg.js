import React from 'react';
import ItemImg from './../ItemImg/ItemImg';

function ListImg( {
    items,
    load
} ) {

    return (
        <ul>
            {
                load || (
                    items.map( item => (
                        <ItemImg
                            key={item.id}
                            item={item} 
                        />
                    ) )
                )
            }
        </ul>
    )
}

export default ListImg;