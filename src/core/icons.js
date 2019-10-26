import React from 'react';
import Notif from './Notif/Notif';

const icons = {
    User: [{
        id: 0,
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
    }]
} ;

const iconsUser = icons.User ;

export { iconsUser } ;