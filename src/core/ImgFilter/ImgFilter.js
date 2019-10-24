import React from 'react';
import './ImgFilter.css';

const buildFilter = filters => {

    if( !(filters instanceof Array) ) return '';

    let styles = '';

    filters.forEach( filter => {

        try {

            let f = null;

            if( typeof filter === 'string' ) {

                f = JSON.parse( filter ) ;
            } else {
                f = filter;
            }

            if( !(f.key && f.val) ) return;
            
            if( /%/.test(f.val) && /hue/.test(f.key) ) {
                f.val = f.val.replace('%' , 'deg' );
            }

            if( 

                f.key === 'hueRotate'
                ) {
                 f.key = 'hue-rotate';
                 
             }

            styles += `${f.key}(${f.val}) `;
            
        } catch( SyntaxError ) {/* Silence is <feature /> */}
        
    } ) ;
    return styles;
} ;

function ImgFilter( {
    pics,
    load,
    figcaption,
    width,
    classFig
} ) {

    return (
        <figure
            className="ImgFilter"
        >
            {load || (
                <>
                
                    {figcaption && (
                        <figcaption className={classFig}>
                            {figcaption}
                        </figcaption>
                    )}
                    <img
                        src={pics.get('blob')}
                        alt={pics.get('name')}
                        style={{
                            filter: buildFilter( pics.get('filters') )
                        }}
                        width={width || 300}
                    />
                </>
            )}
        </figure>
    )
}

export default ImgFilter;
