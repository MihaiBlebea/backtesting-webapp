import { createApp } from "vue"
import axios from "axios"
import { BASE_URL } from "utils"


createApp({
	template: `
	<div>
		<h3 class="mb-3">Filled</h3>
		<div class="mb-3" v-for="(order, index) in filled">
			
			<h5 class="card-title">{{ order.symbol }}</h5>
			<p class="d-flex justify-content-between">
				<span class="text-muted">{{ order.direction }} x{{ order.quantity }}</span>
				<div class="pointer text-success" v-on:click="sellOrder(order)">Sell</div>
			</p>

			<hr v-if="index < filled.length - 1"/>
		</div>
		<h3 class="mb-3 mt-5">Pending</h3>
		<div v-for="(order, index) in pending">
			
			<h5 class="card-title">{{ order.symbol }}</h5>
			<p class="d-flex justify-content-between">
				<span class="text-muted">{{ order.direction }} x{{ order.quantity }}</span>
				<div class="pointer text-danger" v-on:click="cancelOrder(order)">Cancel</div>
			</p>
				
			<hr v-if="index < filled.length - 1"/>
		</div>
	</div>
	`,
	data() {
		return {
			orders: []
		}
	},
	computed: {
		filled() {
			return this.orders.filter((order)=> order.status === "filled")
		},
		pending() {
			return this.orders.filter((order)=> order.status === "pending")
		}
	},
	methods: {
		getOrders() {
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

			axios.get(BASE_URL + "/orders", options).then((result)=> {
				if (result.status !== 200) {
					throw Error("status code is not 200")
				}

				if (result.data.success !== true) {
					throw Error(result.data.error)
				}
				console.log(result.data)

				this.orders = result.data.orders
			}).catch((e)=> {
				console.error(e)
			})
		},
		cancelOrder(order) {
			console.log(order)
		},
		sellOrder(order) {
			window.location.href = "/order_form.html?symbol=" + order.symbol + "&direction=sell"
		},
		getToken: ()=> localStorage.getItem("apiToken")
	},
	mounted() {
		this.getOrders()
	}
}).mount("#order-list")
