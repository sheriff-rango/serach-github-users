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
  UserDetailRepoContainer,
  UserDetailRepoItem,
  UserDetailRepoName,
  UserDetailRepoStats,
  UserDetailRepoStatsItem,
} from './styled'

const UserDetail: React.FC = () => {
  const [userDetail, setUserDetail] = useState<any>({})

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData: any = await getUserDetail(id)
      if (fetchedData) {
        console.log(fetchedData)
        setUserDetail(fetchedData)
      } else {
        navigate('/users')
      }
    }
    fetchData()
  }, [id])
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
      <UserDetailRepoContainer>
        {userDetail.repos?.map((repoItem, repoIndex) => {
          return (
            <UserDetailRepoItem key={repoIndex}>
              <UserDetailRepoName>{repoItem.name}</UserDetailRepoName>
              <UserDetailRepoStats>
                <UserDetailRepoStatsItem>{`${repoItem.forks} Forks`}</UserDetailRepoStatsItem>
                <UserDetailRepoStatsItem>{`${repoItem.stargazers_count} Stars`}</UserDetailRepoStatsItem>
              </UserDetailRepoStats>
            </UserDetailRepoItem>
          )
        })}
      </UserDetailRepoContainer>
    </UserDetailWrapper>
  )
}

export default UserDetail
