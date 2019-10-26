import React from 'react';
import './Title.css';

function Title({
    title,
    subtitle,
    className
}) {

    return (
        <>
            <h1 className={className}>{title}</h1>
            {(
                subtitle && (
                    <blockquote>
                        {subtitle}
                    </blockquote>
                )
            )}
        </>
    ) ;

}

export default Title;