import React  from 'react';
import './ListAlbums.css';
import ItemAlbum from './ItemAlbum';
import Notif from './../Notif/Notif';

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
                            onRemove={() => {
                                return new Promise( (resolve,reject) => {
                                    db.removeAlbum( item.id )
                                    .then(resolve())
                                    .catch( err => reject( err ) )
                                } )
                            }}
                            onRname={rname => {
                                return new Promise( ( resolve , reject ) => {
                                    db.rnameAlbum( 
                                        item.id
                                        ,rname
                                    ).then( response => resolve(response) )
                                    .catch( err => reject( err ) )

                                } ) ;
                            }}
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