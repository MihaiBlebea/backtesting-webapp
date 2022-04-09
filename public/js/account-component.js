import { createApp } from "vue"
import axios from "axios"
import { BASE_URL } from "utils"

createApp({
	template: `
	<div class="mb-4">
		<p class="d-flex justify-content-between" v-if="isReady">
			<div>Balance:</div>
			<div>\${{ account.balance }}</div>
		</p>
		<p class="d-flex justify-content-between" v-if="isReady">
			<div>Pending balance:</div>
			<div>\${{ account.pending_balance }}</div>
		</p>
	</div>
	`,
	data() {
		return {
			account: null,
		}
	},
	computed: {
		isReady() {
			return this.account !== null
		}
	},
	methods: {
		getAccount() {
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

			axios.get(BASE_URL + "/account", options).then((result)=> {
				console.log(result.data)
				if (result.status !== 200) {
					throw Error("status code is not 200")
				}

				if (result.data.success !== true) {
					throw Error(result.data.error)
				}

				this.account = result.data.account
			}).catch((e)=> {
				console.error(e)
			})
		},
		getToken: ()=> localStorage.getItem("apiToken")
	},
	mounted() {
		this.getAccount()
	}
}).mount("#account")
