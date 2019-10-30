import React from 'react';
import Slide from './Slide/Slide';
import './Slider.css';
import {Progress} from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css'

export default class Slider extends React.Component {
    
    static SLIDER_TIMEOUT = 500 ;

    state = {
        active: 0
        ,slide: null
        ,percent: 0
        ,over: false
    } ;

    constructor(props) {

        super( props );

        this.state.size = props.imgs.length;

        if( !props.imgs.length ) {
            console.error('Slider props imgs error because is not an iterable : ' , props.imgs );
        }

        this.startTimeout = typeof props.timeout === 'number' && props.timeout > Slider.SLIDER_TIMEOUT ? props.timeout : 3e3;

        this.currentTimeout =this.startTimeout  

        this.next = this.next.bind( this ) ;
        this.percentUpdate = this.percentUpdate.bind( this ) ;
        this.inTransition = false;
    }

    /**
     * @bind [constructor]
     */
    percentUpdate() {

        this.currentTimeout -= 50 ;

        const partial = this.startTimeout - this.currentTimeout

        const newPercent =  (partial / this.startTimeout)*100;

        if( newPercent > 100 ) {
            this.next();
        }
        else {
            this.setState( {
                percent: Math.floor(newPercent)
            } ) ;
        }
    }

    /**
     * @bind [constructor]
     */
    next() {

        this.inTransition = true;
        const 
            {active,size,over} = this.state
            ,nextId = active + 1 < size ? active + 1 : 0
        ;

        this.setState( {
            slide: 'next'
        } , () => {
            clearInterval( this.percentID ) ;
            setTimeout(() => {
                this.setState( {
                    slide: null
                    ,active: nextId
                    ,percent: 0
                } , () => {

                    setTimeout(() => {
                        if( !over )
                            this.percentID = setInterval( this.percentUpdate , 50 ) ;
                        this.inTransition = false;

                        if( this.endTransit instanceof Function ) {
                            this.endTransit();
                            this.endTransit = null;
                        }
                    }, Slider.SLIDER_TIMEOUT);
                    this.currentTimeout = this.startTimeout ;
                } )
            }, Slider.SLIDER_TIMEOUT);
        } ) ;

    }

    prev() {
        
        this.inTransition = true;
        const 
            {active,size,over} = this.state
            ,nextId = active - 1 >= 0 ? active - 1 : size-1
        ;

        this.setState( {
            slide: 'prev'
        } , () => {
            clearInterval( this.percentID ) ;
            setTimeout(() => {
                this.setState( {
                    slide: null
                    ,active: nextId
                    ,percent: 0
                } , () => {

                    setTimeout(() => {
                        if( !over )
                            this.percentID = setInterval( this.percentUpdate , 50 ) ;
                        this.inTransition = false;

                        if( this.endTransit instanceof Function ) {
                            this.endTransit();
                            this.endTransit = null;
                        }
                    }, Slider.SLIDER_TIMEOUT);
                    this.currentTimeout = this.startTimeout ;
                } )
            }, Slider.SLIDER_TIMEOUT);
        } ) ;
    }

    componentDidMount() {
        this.percentID = setInterval( this.percentUpdate , 50 ) ; 
    }

    componentWillUnmount() {
        clearInterval( this.percentID );
    }

    render() {

        const
            {imgs} = this.props
            ,{active,slide,percent,over} = this.state
        ;

        return (
            <div 
                className="Slider"
                onMouseEnter={() => {
                    clearInterval( this.percentID );
                    this.setState({
                        over: true
                    } ) ;
                }}
                onMouseLeave={() => {
                    clearInterval( this.percentID );
                    if( !this.inTransition )
                        this.percentID = setInterval( this.percentUpdate , 50 );
                    else {
                        this.endTransit = () => {
                            this.percentID = setInterval( this.percentUpdate , 50 );
                        }
                    }
                    this.setState( {
                        over: false
                    } );
                }}
            >
                <div className="points-item">
                    {
                        imgs.map( (img,key) => (
                            <span 
                                className={`points ${key === active ? 'active':''}`}
                                key={key}
                                onClick={() => {
                                    if( key === active ) {
                                        return;
                                    } else {
                                        this.currentTimeout = this.startTimeout;
                                        this.setState( { active: key , percent: 0 } );
                                    }
                                }}
                            >
                            </span>
                        ) )
                    }
                </div>
                <Progress
                    percent={percent} 
                    status={percent < 100 ? "active":'success'}
                    theme={{
                        active: {
                            symbol:  percent ,
                            color: '#e166b5'
                        }
                    }}
                />
                
                  <section className="content-slider">
                
                    <button
                        type="button"
                        className={`${over ? '':'o-hide'}`}
                        onClick={() => {
                            clearInterval( this.percentID );
                            this.prev();
                        }}
                    >
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    
                    {
                        imgs.map( (img,key) => (
                            <Slide
                                key={key}
                                img={img}
                                active={active}
                                id={key}
                                slide={slide}
                            />
                        ) )
                    }
                    
                    <button
                        type="button"
                        className={`${over ? '':'o-hide'}`}
                        onClick={() => {
                            clearInterval( this.percentID );
                            this.next();
                        }}
                    >
                        <i className="fas fa-arrow-right"></i>
                    </button>
                
                </section>

            </div>
        ) ;
    }
};
