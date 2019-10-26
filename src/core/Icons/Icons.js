import React from 'react';
import {HashLink as Link} from 'react-router-hash-link';

function Icons({
    tooltip,
    className,
    target,
    onClick,
    classHandle,
    loader
}) {

    return (
        <>
            {tooltip}
            <span
                data-for={tooltip.props.tooltip}
                id={tooltip.props.tooltip}
                data-tip={tooltip.props.text}
            >

            {
                target ? (
                    <Link 
                        to={target} 
                        onClick={onClick instanceof Function ? onClick : () => {}}
                        className={classHandle}
                    >
                        <i className={className}></i>
                    </Link>
                ) : (
                    <button
                        type="button"
                        className={classHandle}
                        onClick={onClick instanceof Function ? onClick : () => {}}
                    >
                        {
                            loader || (
                                <i className={className}></i>
                            )
                        }
                    </button>
                )
            }

            </span>
        </>
    ) ;
}

export default Icons ;