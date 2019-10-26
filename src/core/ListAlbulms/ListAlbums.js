import React  from 'react';
import './ListAlbums.css';
import ItemAlbum from './ItemAlbum';
import Notif from '../Notif/Notif';
import './ListAlbums.css';

function ListAlbums({albums,load,db}) {

    return (
        <ul className="ListAlbums list">
            {
                load || (
                    albums.length ?
                    albums.map( item => (
                        <ItemAlbum
                            item={item}
                            key={item.id}
                            db={db}
                        />
                    )) : (
                        <Notif
                            type="infos"
                            text="vous n'avez aucun albums"
                        />
                    )
                    
                )
            }
        </ul>
    ) ;
}

export default ListAlbums;