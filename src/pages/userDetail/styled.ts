import styled from 'styled-components'

export const UserDetailWrapper = styled.div`
  width: 100%;
  height: 100%;
`

export const UserDetailHeader = styled.div``

export const UserDetailHeaderTitle = styled.h1`
  text-align: center;
`

export const UserDetailMainInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const UserMainImage = styled.img`
  width: 40%;
  margin-right: 20px;
`

export const UserMainInfo = styled.div``

export const UserMainInfoItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  margin: 10px 0;
`

export const UserMainInfoItemTitle = styled.div`
  width: 150px;
`

export const UserMainInfoItemContent = styled.div`
  font-weight: bold;
`

export const UserDetailRepoContainer = styled.div`
  height: calc(100% - 365px - 20px);
  margin-top: 20px;
  overflow: auto;
`

export const UserDetailRepoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  margin: 10px 0;
  padding: 0 10px;
`

export const UserDetailRepoName = styled.div``

export const UserDetailRepoStats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const UserDetailRepoStatsItem = styled.div`
  font-size: 18px;
`
