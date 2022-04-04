import { createApp } from "vue"

createApp({
	template: `
	<footer v-bind:style="styles" ref="footerEl">
		This is a footer
	</footer>
	`,
	data() {
		return {
			styles: {
				position: "relative",
				paddingTop: "2px",
				paddingBottom: "2px",
				paddingLeft: "15px",
				paddingRight: "15px",
				backgroundColor: "red"
			}
		}
	},
	methods: {
		activateStickyFooter() {
			this.adjustFooterCssTopToSticky()
			window.addEventListener("resize", this.adjustFooterCssTopToSticky)
		},
		adjustFooterCssTopToSticky() {
			console.log("called")
			let footer = this.$refs.footerEl
			const bounding_box = footer.getBoundingClientRect()
			const footer_height = bounding_box.height
			const window_height = window.innerHeight
			const above_footer_height = bounding_box.top - this.getCssTopAttribute(footer)
			if (above_footer_height + footer_height <= window_height) {
				const new_footer_top = window_height - (above_footer_height + footer_height)
				console.log(new_footer_top)
				footer.style.top = new_footer_top + "px"
			} else if (above_footer_height + footer_height > window_height) {
				footer.style.top = null
			}
		},
		getCssTopAttribute(htmlElement) {
			const top_string = htmlElement.style.top
			if (top_string === null || top_string.length === 0) {
				return 0
			}
			const extracted_top_pixels = top_string.substring(0, top_string.length - 2)
			return parseFloat(extracted_top_pixels)
		}
	},
	mounted() {
		this.activateStickyFooter()
	}
}).mount("#footer")
