export const BASE_URL = "http://127.0.0.1:8081"

// export const BASE_URL = "http://192.168.1.17:8080/api/v1"

export const getQueryParams = ()=> {
	let query = window.location.search.replace("?", "")
	if (query === "") {
		return []
	}
	return query.split("&").map((val) => {
		return {
			"key": val.split("=")[0],
			"val": val.split("=")[1]
		}
	})
}