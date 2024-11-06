import cors from 'cors';
import express from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';

/* import jwt from 'jsonwebtoken'; */

const app = express();
app.use(express.json());


const crud = {
  users: [],
  async read() {
    try {
      const dataUsers = fs.readFileSync('dbUsers.json', {encoding: 'utf-8'})
       crud.users = JSON.parse(dataUsers)
       return crud.users
    } catch (error) {
      console.error('Erro ao ler arquivo', error)
      return []
    }
  },
  async create({id, username, password, email}) {
    const dados = {id, username, password, email}
    crud.users.push(dados)
    fs.writeFileSync('./dbUsers.json', JSON.stringify(crud.users), {encoding: 'utf-8'})
  },

  async login(username, password){
    await crud.read();
    const existingUser = crud.users.find(user => user.username === username)
    

    if(!existingUser){
      throw new Error('Usuário não encontrado');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password)

    if (!validPassword){
      throw new Error("Senha incorreta");
    }

    return {message: "Login Efetuado com sucesso", existingUser}
  },

  async register(username, password, email){
    await crud.read();

    const existingUser =  crud.users.find(user => user.email === email)

    if(existingUser){
      throw new Error("Email já cadastrado");
    } else {
      await crud.create({id: Date.now(), username: username, password: password, email: email})
      return {message: "Cadastro efetuado com sucesso: ", username, password}
    }

  }
}

/* crud.register("Eva", "senha1234", "eva@email.com") */




app.use(cors());

// Carrega o conteúdo do db.json
let dbProducts = JSON.parse(fs.readFileSync('./dbProducts.json', 'utf-8'));

/* Exibindo produtos */
app.get('/products', (req, res) => {
  res.json(dbProducts.products)
})

app.post('/login', async(req, res) => {
  /* console.log(req.body) */
  const {username, password} = req.body

  if(!username || !password) {
    return res.status(400).json({message: "Usuário e senha necessários!"})
  }

  try {
    const loginResponse = await crud.login(username, password);
    console.log(loginResponse)
    res.status(200).json(loginResponse.existingUser);
  } catch (error) {
    res.status(401).json({error: error.message});
  }
})


app.post('/register', async(req, res)=>{
  const {username, email, password} = req.body

  if(!username || !email || !password){
    return res.status(400).json({message: "Erro ao receber parâmetros necessários"})
  }
  try {
    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await crud.register(username, hashPassword, email)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({error: "Erro no servidor"})
  }
})

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});