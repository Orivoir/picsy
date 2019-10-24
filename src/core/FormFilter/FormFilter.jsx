import React from 'react';
import './FormFilter.css'

export default class FormFilter extends React.Component {

    render() {

        const {
            blurValue
            ,onChange
            ,load
            ,contrastValue
            ,grayscaleValue
            ,hueRotate
        } = this.props

        return (
            <>
                {
                    load || (
                        <form
                            className="FormFilter"
                        >
                            <div>
                                <label>flootage <i>{blurValue || 0}%</i></label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    defaultValue={blurValue || 0}
                                    onChange={e => {
                                        e.preventDefault();
                                        onChange( {
                                            key: 'blur'
                                            ,unity: 'px'
                                            ,val: parseInt(e.target.value/2)
                                        } );
                                    }}
                                />
                            </div>
                            <div>
                                <label>contraste <i>{(contrastValue || contrastValue === 0) ? contrastValue : 100}%</i></label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    defaultValue={(contrastValue || contrastValue === 0) ? contrastValue : 100}
                                    onChange={e => {
                                        e.preventDefault();
                                        onChange( {
                                            key: 'contrast'
                                            ,unity: '%'
                                            ,val: parseInt(e.target.value/2)
                                        } );
                                    }}
                                />
                            </div>
                            <div>
                                <label>grisage <i>{grayscaleValue || 0}%</i></label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    defaultValue={grayscaleValue || 0}
                                    onChange={e => {
                                        e.preventDefault();
                                        onChange( {
                                            key: 'grayscale'
                                            ,unity: '%'
                                            ,val: parseInt(e.target.value)
                                        } );
                                    }}
                                />
                            </div>
                            <div>
                                <label>rotation teinte <i>{hueRotate || 0}°</i></label>
                                <input
                                    type="range"
                                    min="-8000"
                                    max="8000"
                                    defaultValue={hueRotate || 0}
                                    onChange={e => {
                                        e.preventDefault();
                                        onChange( {
                                            key: 'hueRotate'
                                            ,unity: 'deg'
                                            ,val: parseInt(e.target.value)
                                        } );
                                    }}
                                />
                            </div>
                        </form>
                    )
                }
            </>
        ) ;
    }
};
