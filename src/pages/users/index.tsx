import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { getUserList } from 'utils/fetch'

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
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [fetchedPage, setFetchedPage] = useState<number>(1)
  const [totalPageCount, setTotalPageCount] = useState<number>(0)
  const [searchWord, setSearchWord] = useState<string>('')
  const [userList, setUserList] = useState<any[]>([])
  const navigate = useNavigate()

  const userListContainerRef = useRef()

  const fetchData = async (searchWord, page) => {
    setIsFetching(true)
    const fetchedData: any = await getUserList({ q: searchWord, page })
    const fetchedUserList = fetchedData.result || []
    const totalPageCount = fetchedData.totalPageCount || 0
    const newResult = userList.concat(fetchedUserList)
    setUserList(newResult)
    setTotalPageCount(totalPageCount)
    setIsFetching(false)
  }

  const delayedFetch = useCallback(_.debounce(fetchData, 500), [])

  useEffect(() => {
    if (searchWord) {
      setFetchedPage(1)
      delayedFetch(searchWord)
    } else {
      setUserList([])
    }
  }, [searchWord])

  const handleOnScrollUserListContainer = () => {
    if (userListContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = userListContainerRef.current
      if (scrollTop + clientHeight === scrollHeight) {
        const newPage = fetchedPage + 1
        if (newPage <= totalPageCount) {
          setFetchedPage(newPage)
          fetchData(searchWord, newPage)
        }
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
