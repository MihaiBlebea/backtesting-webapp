import { createApp } from 'vue'
	
createApp({
	data() {
		return {
			message: 'Hello Vue!'
		}
	},
	template: `<div>The message is {{ message }}</div>`
}).mount('#app')