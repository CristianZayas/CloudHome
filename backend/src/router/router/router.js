const { Router } = require('express')
const multer = require('multer');
const path =  require('path');
const storeg =  require('../../multer/multer')
const {HomePath, CreateFolder,CreateSubFolder,DirTree,GetSendPath,UploadFiles , CreateFiles} = require('../../controllers/IndexControllers')
const router = Router();
const pathFather = path.join(__dirname, '../../upluaders/');
router.get('', HomePath);
router.post('/newfolder' , CreateFolder)
router.post('/subfolder' , CreateSubFolder)
router.post('/uploarfiles',storeg(`${pathFather}`).array('avatar') , UploadFiles)
router.get('/home' ,  DirTree);
router.get('/path/:id?', GetSendPath)
router.post('/createfile' , CreateFiles)
module.exports = {
 router
}