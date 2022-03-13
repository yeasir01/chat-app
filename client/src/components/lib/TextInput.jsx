import React from 'react';

function TextInput({id, className, error, label, ...rest}) {

  const modifier = error ? `${className} ${className}--error`: className;

  return (
    <div className={modifier}>
        <label htmlFor={id} className={className && `${className}__label`}>{label}</label>
        <input id={id} className={className && `${className}__input`} {...rest} />
        {error && <small className={className && `${className}__error`}>{error}</small>}
    </div>
  )
}

TextInput.defaultProps = {
  className: "text-field",
  type: "text",
  noValidate: true
}

export default TextInput;