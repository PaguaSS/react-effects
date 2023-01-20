import React, { useId, useRef, useImperativeHandle } from 'react'

const Input = React.forwardRef((props, ref) => {
    const inputId = useId();
    const inputRef = useRef();
    
    const active = () => {
        inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
        //Returns an object with the available attributes to call them from outside
        return {
            focus: active,
        };
    });

    return (
        <div
            className={props.className}
        >
            <label htmlFor={props.id ?? inputId}>{props.label}</label>
            <input
                ref={inputRef}
                type={props.type ?? "text"}
                id={props.id ?? inputId}
                value={props.value ?? ""}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    )
});

export default Input;