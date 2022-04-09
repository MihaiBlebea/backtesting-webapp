import { createApp } from "vue"

createApp({
	template: `
	<footer class="footer bg-primary footer-fixed">
		<div class="container">
			<div class="row justify-content-center mb-2">
				<div class="col-12 col-md-6 row">
					<div class="col d-flex justify-content-evenly">
						<a href="/index.html">Discovery</a>
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
			
		}
	},
	methods: {
		
	}
}).mount("#footer")
