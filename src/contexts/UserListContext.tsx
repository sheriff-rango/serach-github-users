import React, { createContext, useState, useEffect, useCallback } from 'react'
import _ from 'lodash'
import { getUserList } from 'utils/fetch'

export const UserListContext = createContext(undefined)

export const UserListProvider: React.FC = ({ children }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [userList, setUserList] = useState<any[]>([])
  const [searchWord, setSearchWord] = useState<string>('')
  const [totalPageCount, setTotalPageCount] = useState<number>(0)
  const [fetchedPage, setFetchedPage] = useState<number>(1)

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

  const fetchNewPage = () => {
    const newPage = fetchedPage + 1
    if (newPage <= totalPageCount) {
      setFetchedPage(newPage)
      fetchData(searchWord, newPage)
    }
  }

  return (
    <UserListContext.Provider
      value={{
        userList,
        searchWord,
        setSearchWord,
        isFetching,
        fetchNewPage,
      }}
    >
      {children}
    </UserListContext.Provider>
  )
}
