import React from 'react';

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
                        <form>
                            <div>
                                <label>flootage {blurValue || 0}%</label>
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
                                <label>contraste {(contrastValue || contrastValue === 0) ? contrastValue : 100}%</label>
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
                                <label>grisage {grayscaleValue || 0}%</label>
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
                                <label>??? {hueRotate || 0} degrés</label>
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
