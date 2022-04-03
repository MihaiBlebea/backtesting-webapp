const BASE_URL = "http://192.168.1.17:8080/api/v1"

const placeOrder = () => {
	axios.post(BASE_URL + "/order", {

	}).then((result)=> {
		console.log(result.data)
	}).catch((e)=> {
		console.error(e)
	})
}