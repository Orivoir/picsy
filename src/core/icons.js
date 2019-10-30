import React from 'react';
import Notif from './Notif/Notif';

const icons = {
    User: [{
        id: 0,
        alt:"ajouté compte",
        tooltip:
            <Notif
                type="info"
                place="bottom"
                tooltip="user"
                text="ajouté un compte"
            />
        ,
        target:"/add-account",
        className:"fas fa-user-plus"
    } , {
        id: 1,
        alt: "changé compte",
        tooltip:
            <Notif
                type="info"
                place="bottom"
                tooltip="change"
                text="changé de compte"
            />
        ,
        target:"/account-list",
        className:"fas fa-person-booth"
    }] ,
    ChangeAlign: [
        {
            id: 0,
            alt:"gallerie alignement",
            tooltip:
                <Notif
                    type="info"
                    place="top"
                    tooltip="gallery"
                    text="gallerie alignement"
                />
            ,
            className:"fas fa-th",
            onClick: setter => (
                setter( false )
            )
        } ,
        {
            id: 1,
            alt:"diaporama alignement",
            tooltip:
                <Notif
                    type="info"
                    place="top"
                    tooltip="slider"
                    text="diaporama alignement"
                />
            ,
            className:"fas fa-sliders-h",
            onClick: setter => (
                setter( true )
            )
        } ,
    ]
} ;

const iconsUser = icons.User ;
const iconsChangeAlign = icons.ChangeAlign ;

export { iconsUser,iconsChangeAlign } ;