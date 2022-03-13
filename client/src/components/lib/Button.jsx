import React from 'react'

export default function Button({text, isLoading, ...rest}) {

  const innerTextContent = isLoading ? "Loading..." : text;

  return (
    <>
        <button {...rest}>{innerTextContent}</button>
    </>
  )
}
