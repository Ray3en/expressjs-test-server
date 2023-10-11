const exprees = require('express')
const PORT = 3050
const app = exprees()
const db = require('./db/users')

// Настройка cors
// npm i cors
const cors = require('cors');
app.use(cors());

// body парсер
// нужен для того чтобы обрабатывать json с post запроса (иначе req.body будет возвращать пустой объект или undefined)
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

// 
app.get('/users', async (req, res) => {
    const data = await db.getAllUsers()
    res.json(data)
})

app.get('/users/:id', async (req, res) => {
    const user = await db.getUserById(req.params.id)
    res.json(user[0])
})

app.post('/user/create', async (req, res) => {
    // Проверка на входящие атрибуты пост-запроса
    let right_columns = Object.keys(await db.getColumn()).sort().filter(elem => elem !== 'id')
    let req_columns = Object.keys(req.body).sort()

    if (JSON.stringify(right_columns) === JSON.stringify(req_columns)){
        const user = await db.createNewUser(req.body)
        res.json({status: user})
    } else {
        let missing_column = right_columns.filter(elem => !req_columns.includes(elem))
        res.json({status: `Не все поля заполнены: ${missing_column.join(', ')}`})
    }
})

app.delete('/users/:id', async (req, res) => {
    let status = await db.deleteUser(req.params.id)
    if (status){
        res.json({status: `Пользователь с ID ${req.params.id} был удален`})
    } else {
        res.json({status: 'Указанный ID не существует'})
    }
})

app.patch('/users/:id', async (req, res) => {
    try {
        let user =  await db.updateUser(req.params.id, req.body)
        res.json({response: user})
    } catch {
        res.json({status: 'Данные пустые'})
    }
})

app.get('/home', (req, res) => {
    res.json({test: 'hello!'})
})

app.listen(PORT, () => {
    console.log(`Server start http://localhost:${PORT}`)
})