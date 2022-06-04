const fetchData = async (url: RequestInfo , method: string = 'GET', headers: HeadersInit | undefined = {}, body: BodyInit | null | undefined = null ) => {
    const response = await fetch(url, { method, headers, body })
    const data = await response.json()
    if(!response.ok) throw new Error(data.message)
    return data
}

export default fetchData