import { createApp } from "vue"
import axios from "axios"
import { BASE_URL } from "utils"


createApp({
	template: `<button type="button" v-on:click="createAccount" class="btn btn-primary">Create Account</button>`,
	data() {
		return {
			message: "Hello Vue!"
		}
	},
	methods: {
		createAccount() {
			axios.post(BASE_URL + "/account").then((result)=> {
				if (result.status !== 200) {
					throw Error("status code is not 200")
				}

				if (result.data.success !== true) {
					throw Error(result.data.error)
				}

				this.saveToken(result.data.account.api_token)
				this.redirect()
			}).catch((e)=> {
				console.error(e)
			})
		},
		saveToken(apiToken) {
			localStorage.setItem("apiToken", apiToken)
		},
		redirect() {
			window.location.href = "/index.html"
		}
	},
}).mount("#create-account-button")
