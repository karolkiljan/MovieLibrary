const titleToData = async (title) => {
    const titleRequest = fetch (`https://www.omdbapi.com/?apikey=8972635a&t=${title}`)
    const titleResponse = await titleRequest
    return await titleResponse.json()
}


const fetchData = async (title) => {
    const searchRequest = fetch (`https://www.omdbapi.com/?apikey=8972635a&s=${title}`)
    const searchResponse = await searchRequest
    const values = await searchResponse.json()
    const objects = values.Search
    if (values.Response ==='True'){
        const titles = objects.map(value => (value.Title))
        titles.map( (async (title) => {
            const res = await titleToData(title)
            return res
        }))
        console.log(titles)
        return titles
    }
}

export default fetchData