import React from 'react';

const buildFilter = filters => {

    if( !(filters instanceof Array) ) return '';

    let styles = '';

    filters.forEach( filter => {

        try {
            const f = JSON.parse( filter ) ;

            styles += `${f.property}(${f.val}) `;

        } catch( SyntaxError ) {/* Silence is <feature /> */}

    } ) ;

    return styles;
} ;

function ImgFilter( {pics,load,figcaption,width} ) {

    return (
        <figure>
            {load || (
                <>
                    <img
                        src={pics.get('blob')}
                        alt={pics.get('name')}
                        style={{
                            filter: buildFilter( pics.get('filters') )
                        }}
                        width={width || 300}
                    />

                    {figcaption && (
                        <figcaption>
                            {figcaption}
                        </figcaption>
                    )}
                </>
            )}
        </figure>
    )
}

export default ImgFilter;
