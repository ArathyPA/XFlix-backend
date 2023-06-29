const asyncHAndler=require("express-async-handler");
const Video=require("../models/videoModel");
//@desc Get All videos
//@route GET /v1/video
//@access public

const getVideos= asyncHAndler(async(req,res)=>{
    //const contacts=await Contact.find({user_id:req.user.id})
    let title = req.query.title;
    let genre= [];
    let contentRating=req.query.contentRating;
    let sortBy=req.query.sortBy;

  //  console.log("Here.......",req.query.genres.split(','));
  
    if(req.query.genres){
 
    genre.push(...req.query.genres.split(','));
    console.log("After.......",genre);
    }
   
    
    if(sortBy=="releaseDate"){
      console.log('here...sortby....',sortBy);
      let videos = await Video.find({});
       let sortedvideos=videos.sort(function complare(a,b){
       var dateA = new Date(a.releaseDate);
       var dateB = new Date(b.releaseDate);
       return dateB - dateA;
       }
       );
      console.log("sorted videos is",sortedvideos);
      res.status(200).send({videos:sortedvideos});
    }
    if(sortBy=="viewCount"){
      console.log('here...sortby....',sortBy);
      let videos = await Video.find({}).sort({viewCount:-1});
       
      console.log("sorted videos is",videos);
      res.status(200).send({videos:videos});
    }

if(title&&genre&&contentRating){
  
    let videos = await Video.find({ $and: [
      {genre: { $in:genre}},
      {title:{$regex:title,$options: "i"}},
      {contentRating: { $in:contentRating}}
    ]});      
  
   //console.log("videos is");
   res.status(200).send({videos});

}
//     //let limit = req.query.limit;
if(title){
    let videos = await Video.find({title:{$regex:title,$options: "i"}});
    //console.log("videos is");
    res.status(200).send({videos});
    }
else if(genre.length)
{
  let videos = await Video.find({genre: { $in:genre}});
    //console.log("videos is");
    res.status(200).send({videos});
}
else if(contentRating)
{
  console.log(contentRating.split('+')[0]);
  let videos = await Video.find({contentRating: { $in:contentRating}});
    //console.log("videos is");
    res.status(200).send({videos});
}

else{
    const videos=await Video.find();
    res.status(200).send({videos});
}

    
});

//@desc Create contacts
//@route POST /api/contacts
//@access private

const createVideos=asyncHAndler(async(req,res)=>{
    console.log(req.body);
    const {videoLink,title,genre,contentRating,releaseDate,previewImage}=req.body;
    if(!videoLink||!title||!genre||!contentRating||!releaseDate||!previewImage){
        res.status(400);
        throw new Error("All fields requird");
      }
      const video= await Video.create({
        videoLink,title,genre,contentRating,releaseDate,previewImage
      });
    res.status(201).json(video);
    res.status(200).send("posting videos");
});


//@desc get contact
//@route POST /api/contacts/:id
//@access private

const getaVideo=asyncHAndler(async(req,res)=>{
  const video=await Video.findById(req.params.id);
  if(!video){
  res.status(404);
  throw new Error("Not Foun Id");
  }
  res.status(200).json(video);
});

const updateVotes=asyncHAndler(async(req,res)=>{
 
  let vote=req.body.vote;
  let change=req.body.change;
  const video=await Video.findById(req.params.id);
  //console.log("here in updatevotes",video);
  if(!video){
  res.status(404);
  throw new Error("Not Foun Id");
  }
  
  
 //uvoutes=3;
 
  if(change=='increase'){
   
    if(vote=="upVote"){
     const updatedVideo=await Video.findByIdAndUpdate(req.params.id,{$set:{votes:{"upVotes":video.votes.upVotes+1,"downVotes":video.votes.downVotes}}});
    res.status(201).json(updatedVideo);
    }
    else{
      const updatedVideo=await Video.findByIdAndUpdate(req.params.id,{$set:{votes:{"upVotes":video.votes.upVotes,"downVotes":video.votes.downVotes+1}}});
      res.status(201).json(updatedVideo);
    }
  }

  if(change=='decrease'){
   
    if(vote=="upVote"){
     const updatedVideo=await Video.findByIdAndUpdate(req.params.id,{$set:{votes:{"upVotes":video.votes.upVotes-1,"downVotes":video.votes.downVotes}}});
    res.status(201).json(updatedVideo);
    }
    else{
      const updatedVideo=await Video.findByIdAndUpdate(req.params.id,{$set:{votes:{"upVotes":video.votes.upVotes,"downVotes":video.votes.downVotes-1}}});
      res.status(201).json(updatedVideo);
    }
  }
  
 
});

const updateViews=asyncHAndler(async(req,res)=>{
 
  let vote=req.body.vote;
  let change=req.body.change;
  const video=await Video.findById(req.params.id);
  //console.log("here in updatevotes",video);
  if(!video){
  res.status(404);
  throw new Error("Not Foun Id");
  }
  const updatedVideo=await Video.findByIdAndUpdate(req.params.id,{$set:{viewCount:video.viewCount+1}});
  res.status(201).json(updatedVideo);
});

module.exports={getVideos,createVideos,getaVideo,updateVotes,updateViews};