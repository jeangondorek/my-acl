import { Router } from "express";
import { authenticateUser } from "../middlewares/authmiddleware";
import { authadmin } from "../middlewares/authadmin";
import { listAll, createList, deleteList, updateList, registerUser, loginUser, listUser } from "../controllers/index.controllers";

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/list', authenticateUser, (req, res) => createList(req as any, res)); // Alteração aqui
router.get('/list', authenticateUser, (req, res) => listAll(req as any, res)); // Alteração aqui
router.delete('/list/:id', authenticateUser, (req, res) => deleteList(req as any, res)); // Alteração aqui
router.put('/list/:id', authenticateUser, (req, res) => updateList(req as any, res)); // Alteração aqui

router.get('/users', authenticateUser, authadmin, (req, res) => listUser(req as any, res));

export { router };
