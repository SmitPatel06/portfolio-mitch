import React from 'react';
import keycode from 'keycode';
import classnames from 'classnames';

/* Styles ---------------------------*/
import { ButtonStyled } from './ButtonStyled.js';

const Button = (props) => {
    const {
        className,

        height=44,
        width,
        fontSize=18,

        type='button',
        display='inline-block', // block || inline || inline-block

        children,

        onClick,

        active = false,
        tabIndex = 0,
        ariaLabel = '',
        disabled = false,
        ariaExpanded=null,
        ariaChecked=null,

        stopPropagation=false,

    } = props;

    const keyboardHandler = (e) => {
        // if button type='submit' we want the form to submit as default
        // If no onClick method provided, treat as default.
        if (stopPropagation) { e.stopPropagation(); }
        if (onClick) {
            switch(keycode(e)) {
                case 'enter':
                case 'space':
                    if (type !== 'submit')  { e.preventDefault(); }
                    onClick(e);
                    break;
                default:
                    return;
            }
        }
    };

    const theClassName = classnames({
        'Button': true,
        [className]: className,
        [display]: true,
        'active': active,
        'disabled': disabled,
        'ariaExpanded': ariaExpanded,
        'ariaChecked': ariaChecked,
    });
    
    return(
        <ButtonStyled
            className={ theClassName }
            
            height={ height }
            width={ width }
            fontSize={ fontSize }
            display={ display }

            type={ type }
            tabIndex={ tabIndex }

            active={ active }
            disabled={ disabled }

            aria-disabled={ disabled }
            aria-label={ ariaLabel }
            aria-expanded={ ariaExpanded }
            aria-checked={ ariaChecked }

            onClick={ onClick }
            onKeyDown={ keyboardHandler }
        >
            { children }
        </ButtonStyled>
    );
};

export default Button;