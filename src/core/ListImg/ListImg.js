import React from 'react';
import ItemImg from './../ItemImg/ItemImg';
import './ListImg.css';

function ListImg( {
    items,
    load,
    db
} ) {

    return (
        <ul
            className="ListImg"
        >
            {
                load || (
                    items.map( (item,key) => (
                        <ItemImg
                            key={item.id}
                            item={item}
                            db={db}
                            // even={!!(key%2)}
                        />
                    ) )
                )
            }
        </ul>
    )
}

export default ListImg;