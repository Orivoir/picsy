import React from 'react';
import './ImgFilter.css';

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
