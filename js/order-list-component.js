import { createApp } from "vue"
import axios from "axios"

const BASE_URL = "http://127.0.0.1:8080/mock"

createApp({
	template: `
	<div>
		<h3 class="mb-3">Filled</h3>
		<div class="mb-3" v-for="order in filled">
			<div class="card mb-2">
				<div class="card-body">
					<h5 class="card-title">{{ order.symbol }}</h5>
					<p class="card-text">
						<span class="text-muted">{{ order.direction }} {{ order.quantity }}</span>
					</p>
				</div>
			</div>
		</div>
		<h3 class="mb-3">Pending</h3>
		<div v-for="order in pending">
			<div class="card mb-2">
				<div class="card-body">
					<h5 class="card-title">{{ order.symbol }}</h5>
					<p class="card-text">
						<span class="text-muted">{{ order.direction }} {{ order.quantity }}</span>
						<div style="cursor: pointer;" v-on:click="cancelOrder(order)">Cancel</div>
					</p>
				</div>
			</div>
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

			axios.get(BASE_URL + "/orders.json", options).then((result)=> {
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
		getToken: ()=> localStorage.getItem("apiToken")
	},
	mounted() {
		this.getOrders()
	}
}).mount("#order-list")
