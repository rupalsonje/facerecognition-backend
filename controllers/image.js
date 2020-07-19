const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '28a520ef1f954bdab375145172244c49'
   });

const handleapi=(req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>res.status(400).json('unable to work with api'))
}
const handleimage = (req,res,db)=>{
    const {id} = req.body
    db('users').where('id','=',id).increment('entries',1).returning('entries')
    .then(entries=>res.json(entries[0]))
    .catch(err=>res.status(400).json('unable to see entries'))
}

module.exports={
    handleapi:handleapi,
    handleimage:handleimage
}