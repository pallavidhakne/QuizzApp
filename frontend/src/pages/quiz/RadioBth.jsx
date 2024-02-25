import React from 'react'

function RadioBth({options,value,setValue}) {
  return (
    <div>
        {
            options.map((option)=>(
                <RadioButton
                key={option}
                value={option}
                checked={option===value}
                onChange={()=>setValue(option)}>
                    {option}
                </RadioButton>
            ))
        }
    </div>
  )
}

export default RadioBth