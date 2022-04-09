const fs = require("fs")

const loadData = (path) => JSON.parse(fs.readFileSync(path))

const routes = {
	account: loadData("./mock/account.json"),
	order: loadData("./mock/order.json"),
	orders: loadData("./mock/orders.json"),
	portfolio: loadData("./mock/portfolio.json"),
	symbol: loadData("./mock/symbol.json"),
	symbols: loadData("./mock/symbols.json")
}


const jsonServer = require("json-server")
const server = jsonServer.create()
const router = jsonServer.router(routes)
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)
server.use(middlewares)

server.use((req, res, next) => {
	console.log(req.url)
	if (req.method !== "POST") {
		next()
	}

	if (req.url === "/account") {
		res.status(200).json(loadData("./mock/account.json")) 
	}

	if (req.url === "/order") {
		res.status(200).json(loadData("./mock/order.json")) 
	}
})

server.use(router)

server.listen(8081, ()=> { console.log("JSON Server is running") })