import styled from 'styled-components'

export const UserListWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export const UserListHeader = styled.div`
  width: 100%;
  height: 110px;
`

export const UserListHeaderTitle = styled.h1`
  text-align: center;
`

export const UserListSearchInput = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 10px;
`

export const UserListLength = styled.div``

export const UserListContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  height: calc(100% - 110px - 21px - 20px);
  overflow: auto;
  user-select: none;
`

export const UserListItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 200px;
  grid-gap: 20px;
  align-items: center;
  cursor: pointer;
  margin: 10px 0;
`

export const UserImage = styled.img`
  height: 100px;
`

export const UserName = styled.span`
  text-align: left;
  width: max-content;
  height: max-content;
  font-size: 20px;
  font-weight: bold;
`
