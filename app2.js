const express = require( 'express' )
const app = express()
const port = 8000

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use( express.static( 'build' ) );

app.listen(port, () => {
	console.log(`App listening on ${port}`)
})
