import { createApp } from "vue"
import axios from "axios"
import { BASE_URL } from "utils"

createApp({
	template: `
	<div>
		<div v-if="symbol !== null">
			<h4 class="mb-3 d-flex justify-content-between">
				<div>{{ symbol.symbol }}</div>
				<div class="text-muted">{{ symbol.title }}</div>
			</h4>
			<hr/>
			<div class="mb-3">
				<p v-for="d in descriptions">{{ d }}</p>
			</div>

			<div class="mb-4 d-flex justify-content-center">
				<a :href="'/order_form.html?direction=buy&symbol=' + symbol.symbol" type="button" class="btn btn-primary">Buy order</a>
			</div>

			<div class="d-flex justify-content-between">
				<p>Beta:</p>
				<p>{{ symbol.beta }}</p>
			</div>
			<div class="d-flex justify-content-between">
				<p>Book value:</p>
				<p>{{ symbol.bookValue }}</p>
			</div>
			<div class="d-flex justify-content-between">
				<p>Quarterly growth:</p>
				<p>{{ symbol.earningsQuarterlyGrowth }}</p>
			</div>
			<div class="d-flex justify-content-between">
				<p>Profit margin:</p>
				<p>{{ symbol.profitMargins }}</p>
			</div>
			<div class="d-flex justify-content-between">
				<p>Total # shares:</p>
				<p>{{ symbol.sharesOutstanding }}</p>
			</div>
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

			axios.get(BASE_URL + "/symbol?symbol=" + symbol, options).then((result)=> {
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
