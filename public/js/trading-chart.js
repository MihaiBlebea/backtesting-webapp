import { getQueryParams } from 'utils'

let symbol = getQueryParams().filter((param)=> param["key"] === "symbol" )[0]["val"]

new TradingView.MediumWidget({
	"symbols": [
		[
			symbol
		]
	],
	"chartOnly": false,
	"width": "100%",
	"locale": "en",
	"colorTheme": "dark",
	"gridLineColor": "rgba(42 ,46, 57, 0)",
	"fontColor": "#787B86",
	"isTransparent": false,
	"autosize": true,
	"showVolume": false,
	"scalePosition": "no",
	"scaleMode": "Normal",
	"fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
	"noTimeScale": false,
	"valuesTracking": "1",
	"chartType": "line",
	"container_id": "tradingview_42f97"
})