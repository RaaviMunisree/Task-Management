const express=require('express');
const { addTask,getTasks,getTask,patchTask,deleteTask,putTask, headTask,optionsTask}=require('../controllers/taskController');

const router=express.Router();

router.post('/addTask',addTask);
router.get('/getTask/:name',getTask);
router.get('/getTasks',getTasks);
router.patch('/patchTask/:id',patchTask);
router.delete('/deleteTask/:id',deleteTask);
router.put('/putTask/:id',putTask);
router.head('/headTask',headTask);
router.options('/optionsTask',optionsTask);
module.exports=router;