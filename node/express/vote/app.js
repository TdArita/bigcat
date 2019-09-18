const app = express()

app.use(express.urlencoded({
  extended: true
}))
app.use()






app.get('/create', (reg, res, next) => {

})

app.get('/vote/:id',(req, res, next) =>{

})

app.get('/register', (req, res, next) => {
  res.send(`
    <form action="/register">
  `)
})