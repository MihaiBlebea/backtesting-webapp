import { createApp } from "vue"
import axios from "axios"

const BASE_URL = "http://192.168.1.17:8080/api/v1"

createApp({
	template: `
	<div>
		<div v-if="showForm">
			<div class="mb-3">
				<label class="form-label">Symbol</label>
				<input name="symbol" type="text" class="form-control" v-model="symbol">
			</div>
			<div class="mb-3">
				<label class="form-label">Order type</label>
				<select class="form-select" v-model="direction">
					<option value="buy">Buy</option>
					<option value="sell">Sell</option>
				</select>
			</div>
			<div class="mb-3" v-if="isSellOrder">
				<label class="form-label">Quantity</label>
				<input name="quantity" type="number" class="form-control" v-model="qty">
			</div>
			<div class="mb-3" v-if="isBuyOrder">
				<label class="form-label">Buy price</label>
				<input name="buyPrice" type="number" step="0.01" class="form-control" v-model="buyPrice">
			</div>
			<div class="form-check mb-3">
				<input class="form-check-input" type="checkbox" v-model="hasStopLoss">
				<label class="form-check-label">Stop loss</label>
			</div>
			<div class="form-check mb-3">
				<input class="form-check-input" type="checkbox" v-model="hasTakeProfit">
				<label class="form-check-label">Take profit</label>
			</div>
			<div class="mb-3" v-if="hasStopLoss">
				<label class="form-label">Stop limit price</label>
				<input name="stopLoss" type="number" step="0.01" class="form-control">
			</div>
			<div class="mb-3" v-if="hasTakeProfit">
				<label class="form-label">Take profit price</label>
				<input name="takeProfit" type="number" step="0.01" class="form-control">
			</div>
			<button type="submit" class="btn btn-primary" v-on:click="submit">Place order</button>
		</div>
		<div v-if="showSuccess">
			<div class="alert alert-success mb-3" role="alert">
				Order placed
			</div>
			<button type="button" class="btn btn-primary" v-on:click="toggleSuccess">
				Place another order
			</button>
		</div>
	</div>
	`,
	data() {
		return {
			symbol: "",
			qty: "",
			buyPrice: "",
			direction: "",
			hasStopLoss: false,
			hasTakeProfit: false,
			showForm: true,
			showSuccess: false
		}
	},
	computed: {
		isSellOrder() {
			return this.direction === "sell"
		},
		isBuyOrder() {
			return this.direction === "buy"
		}
	},
	methods: {
		submit() {
			if (this.symbol === "") {
				console.error("symbol can not be empty")
				return
			}
			if (this.direction !== "buy" && this.direction !== "sell") {
				console.error("direction must be either buy or sell")
				return
			}

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

			let payload = {
				symbol: this.symbol,
				amount: (this.direction === "sell") ? 0 : this.buyPrice,
				quantity: (this.direction === "buy") ? 0 : this.qty,
				type: "limit",
				direction: this.direction
			}
		
			axios.post(BASE_URL + "/order", payload, options).then((result)=> {
				console.log(result.data)
				if (result.status !== 200) {
					throw Error("status code is not 200")
				}

				if (result.data.success !== true) {
					throw Error(result.data.error)
				}

				this.clearForm()
				this.toggleSuccess()
			}).catch((e)=> {
				console.error(e)
			})
		},
		clearForm() {
			this.symbol = ""
			this.qty = ""
			this.buyPrice = ""
			this.direction = ""
			this.hasStopLoss = false
			this.hasTakeProfit = false
		},
		toggleSuccess() {
			this.showSuccess = !this.showSuccess
			this.showForm = !this.showForm
		},
		getToken: ()=> localStorage.getItem("apiToken")
	},
}).mount("#place-order-form")
