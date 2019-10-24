import React from 'react';
import InputFile from './../InputFile/InputFile';
import SignIn from './../SignIn/SignIn';
import './FormUser.css';

export default class FormUser extends React.Component {

    render() {

        const {
            onSubmit
            ,onChangeAvatar
            ,onChangePseudo
            ,valuePseudo
            ,fileName
            ,avatar
            ,loaderSubmit
            ,errors
        } = this.props;

        return (
            <form
                className="FormUser"
                onSubmit={onSubmit}
            >
                <section>
                    <div className="field-wrap-pseudo">
                        <input
                            placeholder="pseudo"
                            type="text" 
                            name="pseudo"
                            autoComplete="off" 
                            onChange={onChangePseudo}
                            value={valuePseudo}
                        />
                        <label 
                            htmlFor="pseudo" 
                            className={`o-hide ${valuePseudo.trim().length ? 'active':''}`}
                        >
                            pseudo
                        </label>
                    </div>
                
                    <div>
                        <InputFile
                            className="hide"
                            label={
                                <>
                                    <span className="hide micro-system">
                                        {
                                            fileName ?
                                                fileName.length > 7 ?
                                                fileName.slice( 0 , 7 ) + ' ...' :
                                                fileName :
                                                'avatar'
                                        }
                                    </span>
                                    <figure>
                                        <button 
                                            type="button"
                                            onClick={e => {
                                                e.target.parentNode.click();
                                            }}
                                        >
                                            <img
                                                src={avatar}
                                                alt="avatar"
                                                width={64}
                                            />
                                        </button>
                                        <figcaption>
                                            changer
                                        </figcaption>
                                    </figure>
                                </>
                            }
                            name="avatar"
                            autoRead
                            onChange={onChangeAvatar}
                        />
                    </div>

                    <button type="submit">
                        {loaderSubmit || 'suivant'}
                    </button>
                </section>
            
                <SignIn />

                {errors.map( error => (
                        error
                ) )}

            </form>
        ) ;

    }

} ;