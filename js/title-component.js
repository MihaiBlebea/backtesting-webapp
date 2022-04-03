import { createApp } from "vue"
import axios from "axios"

const BASE_URL = "http://192.168.1.17:8080/api/v1"

createApp({
	template: `<button type="button" v-on:click="createAccount" class="btn btn-primary">Create Account</button>`,
	data() {
		return {
			message: "Hello Vue!"
		}
	},
	methods: {
		createAccount: ()=> {
			axios.post(BASE_URL + "/account").then((result)=> {
				console.log(result.data)
			}).catch((e)=> {
				console.error(e)
			})
		}
	},
}).mount("#app")
