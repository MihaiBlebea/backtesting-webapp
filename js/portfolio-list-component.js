import { createApp } from "vue"
import axios from "axios"

const BASE_URL = "http://127.0.0.1:8080/mock"

createApp({
	template: `
	<div v-for="pos in positions">
		<div class="card mb-2">
			<div class="card-body">
				<h5 class="card-title">{{ pos.symbol }}</h5>
				<p class="card-text">{{ pos.quantity }} shares</p>
			</div>
		</div>
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

			axios.get(BASE_URL + "/portfolio.json", options).then((result)=> {
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
		getToken: ()=> localStorage.getItem("apiToken")
	},
	mounted() {
		this.getPortfolio()
	}
}).mount("#portfolio-list")
