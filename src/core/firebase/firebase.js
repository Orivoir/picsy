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
    ,getImgsOf( albumID ) {

      return new Promise( (resolve,reject) => (
        this.albums.doc( albumID )
        .get()
        .then( () => (
          this.pictures.get()
          .then( QuerySnapshot => (
            resolve(QuerySnapshot.docs.filter( doc => (
              doc.get('album_id') === albumID
            ) ) )
          ) ).catch( err => reject( err ) )
        ) ).catch( err => reject(err) )
       ) ) ;
    }
    ,addAlbum( name , userID  ) {

      return new Promise( (resolve,reject) => {

        if(
          !(name || userID)
        )
          reject({
            status: 401
          });

        this.getAlbumsOf( userID ).then( docs => {

          if( docs.find( doc => doc.get('name') === name ) )
            return resolve( {
              success: false
              ,status: 401,
              details: 'already exists' 
            } ) ;

            this.albums.add( {
              user_id: userID
              ,name: name
              ,createAt: Date.now()
              ,size: 0
            } ).then( () => resolve({
              success:true
            }) )
            .catch( err => reject( err ) ) ;

        } ).catch( err => reject( err ) ) ;

      } ) ;
    }
    ,getPictureOf( albumID ) {

      return new Promise( ( resolve, reject ) => {

        if( !albumID )
          return reject();

          this.pictures.get()
          .then(  QuerySnapshot => (
            resolve(
              QuerySnapshot.docs
                .filter( doc => (
                  doc.get('album_id') === albumID )
                ) )
            )
          )
      } ) ;
    }
    ,addPicture(
      albumID,
      name,
      picture
    ) {

      return new Promise( (resolve,reject) => {

        if( !(albumID || name || picture ) )
          return reject();

        this.albums.doc( albumID )
        .get()
        .then( () => {

          this.getPictureOf( albumID ).then( 
            pictures => {
             
              if(pictures.find(
                pic => pic.get('name') === name 
              )) {
                resolve( {
                  success: false,
                  status: 401
                } ) ;
              } else {

                this.pictures.add( {
                  album_id: albumID
                  ,blob: picture
                  ,createAt: Date.now()
                  ,name: name
                  ,filters: []
                } ).then( () => resolve( {success: true} ) )
                .catch( err => reject( err ) )
              }
            }
          )

        } )
        .catch( err => reject( {
          status: 404
        } ) )
         
      } ) ;

    }
    ,rnameImg( pictureID , rname , pictureAlbumID) {

      return new Promise( (resolve , reject) => {

        
        if(
          !(pictureID || rname )
        )
        reject();

        const refPicture = this.pictures.doc( pictureID ) ;

          this.pictures.get()
          .then( QuerySnapshot  => {

            if( 
              !QuerySnapshot.docs.find( doc => (
                doc.get('name') === rname &&
                doc.get('album_id') === pictureAlbumID                 
              ) ) 
            ) {    
              refPicture.get()
                .then( pic => {
                  refPicture.set({
                    blob: pic.get('blob')
                    ,album_id: pic.get('album_id')
                    ,filters: pic.get('filters') || []
                    ,name: rname
                  }).then( () => resolve( {success:true} ) )
                  .catch( err => reject( err ) ) ;
                } ).catch( err => resolve( {
                  success:false
                  ,status: 404
                  ,err: err
                } ) ) ;
            } else {
              resolve( {
                success: false
                ,status: 401 // 401 Bad Request
                ,details: 'name already exists'
              } )
            }

          } )
          .catch( () => reject() ) ;

      } ) ;
    }
    ,rnameAlbum( albumID , rname  ) {

      return new Promise( ( resolve , reject ) => {

        if(
          !(albumID || rname )
        )
        reject();

        const refAlbum = this.albums.doc( albumID ) ;

        refAlbum.get().then( album => {

          if( album.get('name') === rname ) {
            resolve({
              success: true
            }) ;
          }

          refAlbum.set({
            name: rname
            ,createAt: album.get('createAt')
            ,size: album.get('size')
            ,user_id: album.get('user_id')
          }).then( () => (
            resolve( { success: true } )
          ) ) ;


        } ).catch( err => reject( err ) ) ;

      } ) ; 
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
    ,removePicture: function( pictureID ) {

      return new Promise( (resolve,reject) => {

        if( !pictureID ) return reject();

        const refImg = this.pictures.doc( pictureID ) ;

        if( !refImg || !( refImg.get instanceof Function ) ) return resolve({
          status: 404,
          success: false
        });

        refImg.get().then( () => {

          refImg.delete().then(() =>  resolve({
            success: true
          }))
          .catch( () => reject() ) ;
        }) ;

      });
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
              .then( () => {
                // remove all files here of this album here
                resolve({success: true})
              } )
              .catch( err => reject( err ) )
            ;
          } ).catch( err => reject( err ) )
      } )
    }
  }
;

export default collections;
