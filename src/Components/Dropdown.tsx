import React from 'react'
import styled from 'styled-components'
import Label from './Label'
import Select from 'react-select'
import { defaultProps } from 'react-select/src/Select'

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .dropdown {
    font-size: 1.3rem;
    /* margin-bottom: 2.6rem; */
  }
`

interface Props{
    value:any,
    options:any,
    onChange:any,
    placeholder:string
    isMulti?:boolean
}

const Dropdown: React.FunctionComponent<Props> = (props) => {
  return (
    <DropdownWrapper>
      <Select
        value={props.value}
        options={props.options}
        onChange={props.onChange}
        className="dropdown"
        placeholder={props.placeholder}
        isMulti = {props.isMulti? true:false}
        components={{
          IndicatorSeparator: () => null
        }}
        styles={{
          control: (provided, { isFocused }) => {
            return {
              ...provided,
              
              width: '245px',
              color: 'mango',
              borderColor: '#d4ae69',

              // border: !isFocused
              //   ? '1px solid var(--color-mango)'
              //   : '1px solid var(--color-mango)'
            }
          }
        }}
        theme={theme => ({
          ...theme,
          borderRadius: 5,
          borderColor: '#d4ae69',
          colors: {
            ...theme.colors,
            text: '#cdcece',
            primary: '#d4ae69'
          }
        })}
      />
    </DropdownWrapper>
  )
}

export default Dropdown
