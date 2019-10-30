import React from 'react';
import './Slide.css';

function Slide({
    id,img,active,slide
}) {

    return (
        <section
            className={`Slide ${active === id ? 'active':'hide'} ${slide} `}
        >
            {img}
        </section>
    );
}

export default Slide;