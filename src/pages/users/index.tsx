import React, { useState, useEffect, useCallback, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { UserListContext } from 'contexts/UserListContext'

import {
  UserListWrapper,
  UserListHeader,
  UserListHeaderTitle,
  UserListSearchInput,
  UserListContainer,
  UserListLength,
  UserListItem,
  UserImage,
  UserName,
} from './styled'

const UserLIst: React.FC = () => {
  const navigate = useNavigate()
  const { userList, searchWord, setSearchWord, isFetching, fetchNewPage } = useContext(UserListContext)

  const userListContainerRef = useRef()

  const handleOnScrollUserListContainer = () => {
    if (userListContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = userListContainerRef.current
      if (scrollTop + clientHeight === scrollHeight) {
        fetchNewPage()
      }
    }
  }

  return (
    <UserListWrapper>
      <UserListHeader>
        <UserListHeaderTitle>GitHub Searcher</UserListHeaderTitle>
        <UserListSearchInput
          value={searchWord}
          onChange={(e) => !isFetching && setSearchWord(e.target.value)}
          placeholder="Search for Users"
        />
      </UserListHeader>
      <UserListLength>total: {userList.length}</UserListLength>
      <UserListContainer ref={userListContainerRef} onScroll={handleOnScrollUserListContainer}>
        {userList.map((userItem, userIndex) => {
          return (
            <UserListItem key={userIndex} onClick={() => navigate(`/user/${userItem.login}`)}>
              <UserImage src={userItem.avatar_url} alt={userItem.login} />
              <UserName>{userItem.login}</UserName>
            </UserListItem>
          )
        })}
      </UserListContainer>
    </UserListWrapper>
  )
}

export default UserLIst
