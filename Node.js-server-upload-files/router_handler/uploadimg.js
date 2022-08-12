

fs = require("fs")

exports.uploadimg = (req,res) => {
    let oldName = req.files[0].filename;

    let originalname = req.files[0].originalname;

    let newName = req.files[0].originalname;

    fs.renameSync('./public/upload/'+oldName,'./public/upload/'+newName);

    res.send({
        err:0,
        url:"http://127.0.0.1:3000/"+newName,
        name:newName
    });
}

exports.delimg = (req,res) => {
    const name = req.body.url;
    console.log(req.body);

    fs.unlink('./public/upload/'+name,(err)=>{
        if(err){
            throw err;
        }
        console.log("Deleted Successfully!");
    })
}
