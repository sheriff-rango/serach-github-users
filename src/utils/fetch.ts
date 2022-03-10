const axios = require('axios')

const COUNTS_PER_PAGE = 20

function fetch({ method, url, headers, data }: { method?: string; url: string; headers?: any; data?: any }) {
  return axios({
    method: (method || 'get').toLowerCase(),
    url: url,
    headers: headers || {
      authorization: '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',
      Accept: 'application/vnd.github.v3+json',
    },
    data,
  })
}

export async function getUserList({ q, page }: { q: string; page?: number }) {
  let result = [],
    fetchedResult: any = []
  try {
    const baseUrl = `https://api.github.com/search/users?q=${q}&&per_page=${COUNTS_PER_PAGE}&&page=${page || 1}`
    const result = await fetch({ url: baseUrl })
    fetchedResult = result.data
  } catch (err) {
    console.error('axios error', err)
    return result
  }
  try {
    fetchedResult.items?.map(async (userItem) => {
      // const currentRepos = await await fetch({ url: userItem.repos_url })
      const currentRepos = { data: [] }
      result.push({
        ...userItem,
        repoCount: currentRepos.data?.length || 0,
      })
    })
    let total = fetchedResult.total_count
    const totalPageCount = Math.ceil(total / COUNTS_PER_PAGE)
    return { result: result, totalPageCount }
  } catch (err) {
    console.error('axios error', err)
    return result
  }
}

export async function getUserDetail(id: string) {
  try {
    const baseUrl = `https://api.github.com/users/${id}`
    const result = await fetch({ url: baseUrl })
    const reposResult = await fetch({ url: `${baseUrl}/repos` })
    return { ...result.data, repos: reposResult.data }
  } catch (err) {
    console.error('axios error', err)
    return null
  }
}
