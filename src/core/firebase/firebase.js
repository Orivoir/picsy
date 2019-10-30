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
    ,isLogged( userID ) {

      return new Promise( (resolve,reject) => {

        if( !userID ) return reject();

          this.getUser( userID )
            .then( user => {

              if( user ) {

                return resolve( {success: true ,user: user} ) ;
              } else {
                
                return resolve( {success: false} ) ;
              }
            } )
            .catch( err => reject(err) )
          ;
      } );

    }
    ,pictureSetFilters( pictureID , filters ) {

      return new Promise( (resolve , reject) => {

        this.pictures.doc( pictureID )
        .get()
        .then( picture => { // picture exists
          const refPicture = this.pictures.doc( pictureID ) ;
          
          const delDouble = picture.get('filters').filter( f => {

              return !filters.find( fDelta => fDelta.key === f.key )
          } ) ;

          // set picture
          refPicture.get()
          .then( () => (
            refPicture.set({
              name: picture.get('name')
              ,createAt: picture.get('createAt')
              ,album_id: picture.get('album_id')
              ,filters: [ ...delDouble , ...filters ]
              ,blob: picture.get('blob') 
            }).then( () => resolve({success:true}) )
            .catch( err => reject( err ) )
          ) ).catch( err => reject( err ) ) ;

        } )
        .catch( err => reject( err ) ) ;

      } ) ;
    }
    ,pictureSetFilter( pictureID , filter ) {

      return new Promise( (resolve , reject) => {

        this.pictures.doc( pictureID )
        .get()
        .then( picture => { // picture exists

          let currentFilter = picture.get('filters') ;
          
          let found = false;
          const newFilter = currentFilter.map( current => {

              try {
                if( typeof current === 'string' )
                  current = JSON.parse(current)

              } catch( SyntaxError ) {
                
                current = {};
              }
              if(current.key === filter.key) {
                current.val = filter.val;
                found = true;
              }

              return current ;

          }  ) ;

          if( !found ) {

            newFilter.push( JSON.stringify( {
              key: filter.key
              ,val: filter.val
            } ) ) ;
          }

          const refPicture = this.pictures.doc( pictureID ) ;
          
          // set picture
          refPicture.get()
          .then( () => (
            refPicture.set({
              name: picture.get('name')
              ,createAt: picture.get('createAt')
              ,album_id: picture.get('album_id')
              ,filters: newFilter.filter( track => {
                try {
                  if( typeof track === 'string' )
                    track = JSON.parse(track);
                }catch( SyntaxError ) {
                  return false;
                }
                return track.key && track.val;
              })
              ,blob: picture.get('blob') 
            }).then( () => resolve({success:true}) )
            .catch( err => reject( err ) )
          ) ).catch( err => reject( err ) ) ;

        } )
        .catch( err => reject( err ) ) ;

      } ) ;
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
            } ).then( data => resolve({
              success:true,
              album: data
            }) )
            .catch( err => reject( err ) ) ;

        } ).catch( err => reject( err ) ) ;

      } ) ;
    }
    ,albumUp( albumID ) {

      return new Promise( ( resolve, reject ) => {

        const refAlbum = this.albums.doc( albumID ) ;

        refAlbum.get().then( album => {

          if( !album.get('createAt') ) return reject( { partial: album } );

          refAlbum.set( {
            createAt: album.get('createAt')
            ,name: album.get('name')
            ,size: parseInt(album.get('size'))+1
            ,user_id: album.get('user_id') 
          } ).then( () => resolve({success:true}) )
          .catch( err => reject(err) ) ;
        } )
        .catch( err => reject( err) ) ;
      });
    }
    ,albumDown( albumID ) {

      return new Promise( ( resolve, reject ) => {

        const refAlbum = this.albums.doc( albumID ) ;

        refAlbum.get().then( album => {

          refAlbum.set( {
            createAt: album.get('createAt')
            ,name: album.get('name')
            ,size: parseInt(album.get('size'))-1
            ,user_id: album.get('user_id') 
          } ).then( () => resolve({success:true}) )
          .catch( err => reject(err) ) ;
        } )
        .catch( err => reject( err) ) ;
      });
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
                } ).then( () => {
                  this.albumUp( albumID ).then( () => {
                    resolve( {success: true,id: albumID , name: name , blob: picture } )
                  } ).catch( err => reject( err ) )
                } )
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
                    ,createAt: pic.get('createAt') || Date.now()
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

        refImg.get().then( pic => {

          refImg.delete().then(() => { 

            this.albumDown( pic.get('album_id') ).then( () => {
              resolve({
                success: true
              } )
            } ).catch( err => reject( err ) ) ;
          })
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

                this.getPictureOf( albumID ).then( pics => {

                  pics.map( pic => (
                      this.removePicture( pic.id )
                 ) ) ;

                  resolve({success: true});
                }  ).catch( err => reject( err ) )

              } )
              .catch( err => reject( err ) )
          } ).catch( err => reject( err ) )
      } )
    }
  }
;

export default collections;
