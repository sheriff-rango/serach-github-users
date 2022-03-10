import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUserDetail } from 'utils/fetch'

import {
  UserDetailWrapper,
  UserDetailHeader,
  UserDetailHeaderTitle,
  UserDetailMainInfoContainer,
  UserMainImage,
  UserMainInfo,
  UserMainInfoItem,
  UserMainInfoItemTitle,
  UserMainInfoItemContent,
  UserRepoSearchPanel,
  StyledP,
  UserRepoSearchInput,
  UserDetailRepoContainer,
  NoReposSpan,
  UserDetailRepoItem,
  UserDetailRepoName,
  UserDetailRepoStats,
  UserDetailRepoStatsItem,
} from './styled'

const UserDetail: React.FC = () => {
  const [userDetail, setUserDetail] = useState<any>({})
  const [userRepos, setUserRepos] = useState<any>([])

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData: any = await getUserDetail(id)
      if (fetchedData) {
        setUserDetail(fetchedData)
        setUserRepos(fetchedData.repos || [])
      } else {
        navigate('/users')
      }
    }
    fetchData()
  }, [id])

  const handleChangeSearchWords = (e) => {
    const searchWord = (e.target.value || '').trim()
    if (searchWord) {
      let filtered = []
      userDetail.repos?.map((repoItem) => {
        if (repoItem.name.indexOf(searchWord) > -1) {
          filtered.push(repoItem)
        }
      })
      setUserRepos(filtered)
    } else {
      setUserRepos(userDetail.repos || [])
    }
  }

  return (
    <UserDetailWrapper>
      <UserDetailHeader>
        <UserDetailHeaderTitle>GitHub Searcher</UserDetailHeaderTitle>
        <UserDetailMainInfoContainer>
          <UserMainImage src={userDetail.avatar_url} alt={userDetail.loin} />
          <UserMainInfo>
            <UserMainInfoItem>
              <UserMainInfoItemTitle>UserName: </UserMainInfoItemTitle>
              <UserMainInfoItemContent>{userDetail.name}</UserMainInfoItemContent>
            </UserMainInfoItem>
            <UserMainInfoItem>
              <UserMainInfoItemTitle>Email: </UserMainInfoItemTitle>
              <UserMainInfoItemContent>{userDetail.email}</UserMainInfoItemContent>
            </UserMainInfoItem>
            <UserMainInfoItem>
              <UserMainInfoItemTitle>Location: </UserMainInfoItemTitle>
              <UserMainInfoItemContent>{userDetail.location}</UserMainInfoItemContent>
            </UserMainInfoItem>
            <UserMainInfoItem>
              <UserMainInfoItemTitle>Join Date: </UserMainInfoItemTitle>
              <UserMainInfoItemContent>{(userDetail.created_at || '').split('T')[0] || ''}</UserMainInfoItemContent>
            </UserMainInfoItem>
            <UserMainInfoItem>
              <UserMainInfoItemTitle>Followers: </UserMainInfoItemTitle>
              <UserMainInfoItemContent>{userDetail.followers}</UserMainInfoItemContent>
            </UserMainInfoItem>
            <UserMainInfoItem>
              <UserMainInfoItemTitle>Followings: </UserMainInfoItemTitle>
              <UserMainInfoItemContent>{userDetail.following}</UserMainInfoItemContent>
            </UserMainInfoItem>
          </UserMainInfo>
        </UserDetailMainInfoContainer>
      </UserDetailHeader>
      <UserRepoSearchPanel>
        <StyledP>This is their biography. It may be long and need to all fit</StyledP>
        <UserRepoSearchInput placeholder="Search for User's Repositories" onChange={handleChangeSearchWords} />
      </UserRepoSearchPanel>
      <UserDetailRepoContainer>
        {userRepos.length ? (
          userRepos.map((repoItem, repoIndex) => {
            return (
              <UserDetailRepoItem key={repoIndex} onClick={() => window.open(repoItem.html_url)}>
                <UserDetailRepoName>{repoItem.name}</UserDetailRepoName>
                <UserDetailRepoStats>
                  <UserDetailRepoStatsItem>{`${repoItem.forks} Forks`}</UserDetailRepoStatsItem>
                  <UserDetailRepoStatsItem>{`${repoItem.stargazers_count} Stars`}</UserDetailRepoStatsItem>
                </UserDetailRepoStats>
              </UserDetailRepoItem>
            )
          })
        ) : (
          <NoReposSpan></NoReposSpan>
        )}
      </UserDetailRepoContainer>
    </UserDetailWrapper>
  )
}

export default UserDetail
