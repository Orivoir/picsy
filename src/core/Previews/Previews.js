import React from 'react';
import Icons from './../Icons/Icons';
import Notif from './../Notif/Notif';
import './Previews.css';

function Previews({items,error,onRemove}) {

    return (
        <ul
            className={`${error ? 'error':''} Previews`}
        >
            {
                items.map( (item,key) => (
                    <li
                        key={key}
                    >
                        <figure>
                            <img
                                src={item.blob}
                                alt="pré vue d'ajout"
                                width={128}
                            />
                            <figcaption>
                                {item.name}
                            </figcaption>

                            <Icons
                                tooltip={(
                                    <Notif
                                        type="info"
                                        tooltip={`close-preview-${key}`}
                                        place="left"
                                        text="supprimé de l'ajout"
                                    />
                                )}
                                onClick={() => onRemove( item )}
                                className="fas fa-times"
                            />

                        </figure>
                    </li>
                ) )
            }
        </ul>
    );
}

export default Previews;