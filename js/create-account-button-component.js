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
				this.saveToken(result.data.account.api_token)
			}).catch((e)=> {
				console.error(e)
			})
		},
		saveToken: (apiToken)=> {
			localStorage.setItem("apiToken", apiToken)
		},
		getToken: ()=> localStorage.getItem("apiToken")
	},
}).mount("#create-account-button")
