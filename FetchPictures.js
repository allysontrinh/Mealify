async function fetchPictures(apiURL) {
    try {
        const response = await fetch(apiURL)
        const data = await response.json()
        return data
    }
    catch (error) {
        console.error("Error fetching data", error)
        return null
    }
}

// this will have the apiURL
const apiURL = ""
fetchPictures(apiURL)
.then(picData => {
    console.log("pictures data:", picData)
})
.catch(error => {
    console.error("Error loading data", error)
})

export default fetchPictures