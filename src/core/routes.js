import Logged from './../pages/Logged/Logged';
import Dash from './../pages/Dash/Dash';
import AlbumRoute from './../pages/AlbumRoute/AlbumRoute';
import PictureRoute from './../pages/PictureRoute/PictureRoute';
import ChangeUser from './../pages/ChangeUser/ChangeUser';

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
        path: "/album/:name",
        name: "show album"
    },
    {
        id:4,
        exact:false,
        render: PictureRoute,
        props: {
            action: "add"
        },
        path: "/add-picture",
        name: "add album"
    },
    {
        id:5,
        exact:false,
        render: PictureRoute,
        props: {
            action: "filter"
        },
        path: "/filter/:name",
        name: "filter album"
    },
    {
        id:6,
        exact:false,
        render: ChangeUser,
        props: {
            action: "filter"
        },
        path: "/change",
        name: "filter album"
    }
] ;

export default routes;
