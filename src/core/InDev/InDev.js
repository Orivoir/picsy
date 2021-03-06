import React from 'react';
import Notif from './../../core/Notif/Notif';
import {HashLink as Link} from 'react-router-hash-link';

function InDev({
    featureText
    ,inDays
    ,constraint
}) {

    return (
        <>
            <h1
                style={{
                    textAlign: 'center'
                    ,fontWeight: 600 
                }}
            >
                La fonctionnalité {featureText || 'inconnue'} et actuellement en développement<br />
                vous pouvez contribuez à&nbsp;
                <a 
                    href="https://github.com/Orivoir/picsy"
                    style={{
                        color: 'rgb(75,75,75)'
                    }}
                >
                    <i className="fab fa-github"></i>
                    Picsy
                </a>
            </h1>

            <Notif
                type="bug" 
                text={(
                    <>
                        page en expérimentation&nbsp;
                        <i className="fas fa-vial"></i>
                    </>
                )}
            />
            <br />
            <Notif 
                type="infos"
                text={(
                    <>
                        cette fonctionnalité sera disponible dans {inDays || 3} jours {constraint ? "( en gros )" : ""}
                    </>
                )}
            />
            <br />
            <Notif 
                type="back"
                text={(
                    <Link to='/dash'>
                        tableau de board
                    </Link>
                )}
            />
        </>
    ) ;
}

export default InDev;