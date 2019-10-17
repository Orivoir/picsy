import React  from 'react';
import './ListAlbums.css';
import ItemAlbum from './ItemAlbum';

function ListAlbums({albums,load,db}) {

    return (
        <ul className="ListAlbums list">
            {
                load || (
                    albums.map( item => (
                        <ItemAlbum
                            item={item}
                            key={item.id}
                            onRemove={() => {
                                return new Promise( (resolve,reject) => {
                                    db.removeAlbum( item.id ).then(
                                        resolve()
                                    ).catch( err => reject( err ) )
                                } )
                            }}
                        />
                    ))
                )
            }
        </ul>
    ) ;
}

export default ListAlbums;