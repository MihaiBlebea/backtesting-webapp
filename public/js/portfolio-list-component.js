import { createApp } from "vue"
import axios from "axios"
import { BASE_URL } from "utils"

createApp({
	template: `
	<div v-for="(pos, index) in positions">
		<h5 class="card-title">{{ pos.symbol }}</h5>
		<p class="d-flex justify-content-between">
			<span>{{ pos.quantity }} shares</span>
			<div class="pointer text-success" v-on:click="sellOrder(pos)">Sell</div>
		</p>
		<hr v-if="index < positions.length - 1"/>
	</div>
	`,
	data() {
		return {
			positions: []
		}
	},
	methods: {
		getPortfolio() {
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

			axios.get(BASE_URL + "/positions", options).then((result)=> {
				console.log(result.data)
				if (result.status !== 200) {
					throw Error("status code is not 200")
				}

				if (result.data.success !== true) {
					throw Error(result.data.error)
				}

				this.positions = result.data.positions
			}).catch((e)=> {
				console.error(e)
			})
		},
		sellOrder(pos) {
			window.location.href = "/order_form.html?symbol=" + pos.symbol + "&direction=sell"
		},
		getToken: ()=> localStorage.getItem("apiToken")
	},
	mounted() {
		this.getPortfolio()
	}
}).mount("#portfolio-list")
