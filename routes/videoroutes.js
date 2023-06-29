const express= require("express");
const router=express.Router();
const {getVideos,createVideos,getaVideo,updateVotes,updateViews}=require("../Controllers/videoController");
//const { validateToken } = require("../middleware/validatetoken");

//router.use(validateToken);
router.route('/').get(getVideos).post(createVideos);
router.route('/:id').get(getaVideo);
router.route('/:id/votes').patch(updateVotes);
router.route('/:id/VIEWS').patch(updateViews);

module.exports=router;