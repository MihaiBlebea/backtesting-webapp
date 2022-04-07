import { createApp } from "vue"
import axios from "axios"

const BASE_URL = "http://127.0.0.1:8080/mock"

createApp({
	template: `
	<div>
		<div v-if="symbol !== null">
			<h4 class="mb-3">{{ symbol.symbol }}</h4>
			<hr/>
			<p v-for="d in descriptions">{{ d }}</p>
		</div>
	</div>
	`,
	data() {
		return {
			symbol: null,
		}
	},
	computed: {
		descriptions() {
			return this.symbol.longBusinessSummary.split(".").filter((d)=> {
				return d !== ""
			}).map((d)=> {
				return d + "."
			})
		}
	},
	methods: {
		getSymbol(symbol) {
			let apiToken = this.getToken()
			if (apiToken === undefined) {
				console.error("undefined api token")
				return
			}

			let options = {
				headers: {
					"Authorization": "Bearer " + this.getToken()
				}
			}

			axios.get(BASE_URL + "/symbol.json?symbol=" + symbol, options).then((result)=> {
				console.log(result.data)
				if (result.status !== 200) {
					throw Error("status code is not 200")
				}

				if (result.data.success !== true) {
					throw Error(result.data.error)
				}

				this.symbol = result.data.symbol
			}).catch((e)=> {
				console.error(e)
			})
		},
		getToken: ()=> localStorage.getItem("apiToken")
	},
	mounted() {
		let params = window.location.search.replace("?", "").split("&").map((val) => {
			return {
				"key": val.split("=")[0],
				"val": val.split("=")[1]
			}
		}).filter((val)=> {
			return val["key"] == "symbol"
		})

		if (params.length == 0) {
			window.location.href = "/index.html"
		}

		let symbol = params[0]["val"]
		this.getSymbol(symbol)
	}
}).mount("#symbol")
