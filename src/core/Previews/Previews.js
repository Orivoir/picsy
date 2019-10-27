import React from 'react';
import './Previews.css';
import PreviewItem from './PreviewItem';

function Previews({items,error,onRemove,onRname}) {

    return (
        <ul
            className={`${error ? 'error':''} Previews`}
        >
            {
                items.map( (item,key) => (
                    <PreviewItem
                        onRname={(currentName,rname) => onRname(currentName, rname)}
                        key={key}
                        item={item}
                        onRemove={onRemove}
                    />
                ) )
            }
        </ul>
    );
}

export default Previews;