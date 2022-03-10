import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: #999;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #ddd;
    }
  }
`
