const http = require("http"),
    app = require("../app"),
    PORT = 3000,
    server = http.createServer(app)

server.listen(PORT, () => {
    console.log("Server running on Port :: ", PORT)
})