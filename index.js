 const express = require("express");
 const app = express();
 const  Joi=require("joi");
 app.use(express.json())
 const courses = [{
         id: 1,
         name: "course1"
     },
     {
         id: 2,
         name: "course2"
     },
     {
         id: 3,
         name: "course3"
     }
 ];
 app.get('/', (req, res) => {
     res.send("hello user")
 });
 app.get("/api/course", (req, res) => {
     res.status(200).send(courses);
 });
 app.get("/api/course/:id", (req, res) => {
     let cour = courses.find(c => c.id === parseInt(req.params.id))
     if (!cour) res.status(404).send("no course found");
     else res.send(`${JSON.stringify(cour)} ${req.query.name}`);
 })
 app.post("/api/course/add",(req,res)=>{
     var  schima={
         name:Joi.string().alphanum().min(3).max(30).required()
     };
     var result=Joi.validate(req.body,schima);
     
     if(result.error)
     {
        res.send(result.error.details[0].message)
        return 
     }
     else{
        const  cor={
            id:courses.length+1,
            name:req.body.name
        }
        courses.push(cor);
        res.send(courses);
     }
     
 })

 var port = process.env.PORT || 3000
 app.listen(port, () => {
     console.log(`running  at ${port}`);

 })