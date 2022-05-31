import React from 'react'
import Button from '../components/button/Button'
import Input from '../components/input/Input'

const Style = () => {
  return (
    <div>
        <Input name='username' label='Username' />
        <Input name='file' type='file' />
        <Button />
    </div>
  )
}

export default Style