import Logged from './../pages/Logged/Logged';
import Dash from './../pages/Dash/Dash';
import AlbumRoute from './../pages/AlbumRoute/AlbumRoute';
import PictureRoute from './../pages/PictureRoute/PictureRoute';
import AccountList from './../pages/AccountList/AccountList';
import AddAccount from './../pages/AddAccount/AddAccount';

const routes = [
    {
        id:0,
        exact:true,
        render: Logged,
        props: {},
        path: "/",
        name: "Home"
    },
    {
        id:1,
        exact:false,
        render: Dash,
        props: {},
        path: "/dash",
        name: "dashboard"
    },
    {
        id:2,
        exact:false,
        render: AlbumRoute,
        props: {
            action: "add"
        },
        path: "/add-album",
        name: "album add"
    },
    {
        id:3,
        exact:false,
        render: AlbumRoute,
        props: {
            action: "show"
        },
        path: "/album/:id",
        name: "show album"
    },
    {
        id:5,
        exact:false,
        render: PictureRoute,
        props: {},
        path: "/filter/:id",
        name: "filter album"
    },
    {
        id:6,
        exact:false,
        render: AddAccount,
        props: {},
        path: "/add-account",
        name: "filter album"
    }
    ,{
        id:6,
        exact:false,
        render: AccountList,
        props: {},
        path: "/account-list",
        name: "liste compte"
    }
] ;

export default routes;
