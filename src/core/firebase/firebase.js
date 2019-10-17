import firebaseCfg from './firebase.config';
import * as firebase from 'firebase';


firebase.initializeApp( firebaseCfg );
const
  collections = {
    users: firebase.firestore().collection('users')
    ,albums: firebase.firestore().collection('albums')
    ,pictures: firebase.firestore().collection('pictures')
    ,getUser( userID ) {

        return new Promise( ( resolve , reject ) => (
            this.users.doc( userID ).get()
            .then( user => (
                resolve( user.get('pseudo') ? user: null )
            ) )
            .catch( err => reject( err ) )
        ) ) ;
    }
    ,getAlbumsOf( userID ) {

      return new Promise( ( resolve , reject ) => (
          this.albums.get()
            .then( QuerySnapshot => (
              resolve( QuerySnapshot.docs.filter( doc => (
                doc.get('user_id').trim() === userID.trim()
              ) ) )
            ) )
            .catch( err => reject( err ) )
      )  ) ;

    }
    ,removeAlbum: function(albumID) {

      return new Promise( (resolve,reject) => {

        if( !albumID ) reject({
          status: 401
          ,id: albumID
        });
        
        const refAlbum = this.albums.doc( albumID ) ;

        if( !refAlbum || !(refAlbum.get instanceof Function) )
          reject( {
            refAlbum: refAlbum
            ,id: albumID
            ,status: 404
          } );

        refAlbum.get().then( () => {
            refAlbum.delete()
              .then( () => resolve() )
              .catch( err => reject( err ) )
            ;
          } ).catch( err => reject( err ) )
      } )
    }
  }
;

export default collections;