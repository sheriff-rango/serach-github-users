import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { sendRequest } from 'utils/fetch'

const UserDetail: React.FC = () => {
  const { id } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      // const q = encodeURIComponent(`user:${id}`)
      // const fetchedData: any = await sendRequest({ q })
      // const fetchedUser = fetchedData.result || []
      // console.log('fetchedUser', fetchedUser)
    }
    fetchData()
  }, [id])
  return <>user detail {id}</>
}

export default UserDetail
