import React,{useState} from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import {Redirect} from 'react-router-dom';

function Icons({
    tooltip,
    className,
    target,
    onClick,
    classHandle,
    loader,
    textAlt,
    text,
    alt
}) {

    const [focus , setFocus] = useState( false ) ; 
    const [redirect , setRedirect] = useState( false ) ; 

    return (
        <>
            {tooltip}
            <span
                data-for={tooltip.props.tooltip}
                id={tooltip.props.tooltip}
                data-tip={tooltip.props.text}
            >

            {redirect}

            {
                target ? (
                    <Link
                        style={{
                            transition: '.11s linear all'
                        }}
                        onFocus={() => {
                            setFocus(true);
                        }}
                        onBlur={() => {
                            setFocus(false);
                        }}
                        to={target} 
                        onPointerDown={onClick instanceof Function ? onClick : () => {
                            setRedirect( <Redirect to={target} /> );

                        }}
                        className={`${classHandle} ${focus ? 'access-focus' : ''}`}
                    >
                        {
                            loader || (
                                (
                                    focus ?
                                        textAlt || text || alt || 'here'
                                    :
                                    <i className={className}></i>
                                )
                            )
                        }
                    </Link>
                ) : (
                    <button
                        type="button"
                        className={classHandle}
                        onClick={onClick instanceof Function ? onClick : () => {}}
                    >
                        {
                            loader || (
                                (
                                    focus ?
                                        textAlt || text || alt || 'here'
                                    :
                                    <i className={className}></i>
                                )
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