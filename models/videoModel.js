const mongoose=require("mongoose");


 

const videoSchema=mongoose.Schema({
    videoLink:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    contentRating:{
        type:String,
        required:true,
    },
    releaseDate:{
        type:String,
        required:true,
    },
    previewImage:{
        type:String,
        required:true,
    },    
    viewCount:{type:Number,default:0},
    votes:{upVotes: {type:Number,required:true,default:0},
        downVotes: {type:Number,default:0},},            
    
},{
    timestamps:false,
},



);

module.exports=mongoose.model("Video",videoSchema);