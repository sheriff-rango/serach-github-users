const axios = require('axios')

function fetch({
  method,
  url,
  headers = { 'content-type': 'application/json' },
  data,
}: {
  method?: string
  url: string
  headers?: any
  data?: any
}) {
  return axios({
    method: (method || 'get').toLowerCase(),
    url: url,
    headers: headers || {
      authorization: 'token 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',
      Accept: 'application/vnd.github.v3+json',
    },
    data,
  })
}

export async function getUserList({ q, page }: { q: string; page?: number }) {
  let fetchedData = []
  try {
    const baseUrl = `https://api.github.com/search/users?q=${q}&&per_page=30&&page=${page || 1}`
    const result = await fetch({ url: baseUrl })
    const currentFetchedResult = result.data
    fetchedData = fetchedData.concat(currentFetchedResult.items)
    let total = currentFetchedResult.total_count
    const totalPageCount = Math.ceil(total / 30)
    console.log('total', total)
    // while (total > 100) {
    //   page++
    //   const nextPageUrl = `${baseUrl}&&page=${page}`
    //   const nextPageResult = await fetch({
    //     url: nextPageUrl,
    //   })
    //   const currentPageResult = nextPageResult.data
    //   fetchedData = fetchedData.concat(currentPageResult.items)
    //   total -= 100
    // }
    return { result: fetchedData, totalPageCount }
  } catch (err) {
    console.error('axios error', err)
    return fetchedData
  }
}

export async function getUserDetail(id: string) {
  try {
    const baseUrl = `https://api.github.com/users/${id}`
    const result = await fetch({ url: baseUrl })
    console.log(result)
  } catch (err) {
    console.error('axios error', err)
    return null
  }
}
