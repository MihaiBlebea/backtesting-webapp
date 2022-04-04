import { createApp } from "vue"

createApp({
	template: `
	<footer class="footer bg-primary" v-bind:style="styles">
		<div class="container">
			<div class="row justify-content-center mb-2">
				<div class="col-12 col-md-6 row">
					<div class="col d-flex justify-content-evenly">
						<a href="/portfolio.html">Portfolio</a>
						<a href="/orders.html">Orders</a>
					</div>
				</div>
			</div>
		</div>
    </footer>
	`,
	data() {
		return {
			styles: {
				position: "fixed",
				bottom: 0,
				width: "100%",
				height: "60px",
				lineHeight: "60px"
			}
		}
	},
	methods: {
		
	}
}).mount("#footer")
