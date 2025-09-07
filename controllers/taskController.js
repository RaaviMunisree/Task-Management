const express=require('express');

let tasks=[];
exports.addTask=async (req,res)=>{
    try{
       
        const {name,time}=req.body;
        if(!name||!time){
            res.status(400).json({message:"Invalid credentials"});
            return;
        }
        tasks.push({id:tasks.length+1,"name":name,"time":time,"status":"pending"});
        res.status(201).json({message:"Task added Successfully"});

    }catch(error){
        console.error("Error:",error);
        res.status(500).json({message:error});
    }
}

exports.getTasks=async (req,res)=>{
    try{
       if(tasks.length==0){
        res.status(200).json({message:"No Tasks found"});
       }
       else{
        res.status(200).json({message:tasks});
       }
    }catch(error){
        console.error(error);
        res.json({message:"Error"});
    }
}
exports.getTask=async (req,res)=>{
    try{
        const {name}=req.params;
        if(!name){
            res.json({message:"Name is Empty"});
        }else{
            const filtered=tasks.filter(
                (t)=>t.name.toLowerCase()===name.toLowerCase()
            );
            res.json(filtered);
        }

    }catch(error){
        console.log(error);
        res.json({message:"Error"});
    }
}

exports.patchTask=async (req,res)=>{
    try{
        const {id}=req.params;
        const t=tasks.find(
            (x)=>x.id===parseInt(id)
        );
        if(t.status==="pending"){
            t.status="completed";
        }else{
            t.status="pending";
        }
        res.json({id:t.id,status:t.status});
    }catch(error){
        console.error(error);
        res.json({message:"Error"});
    }
}
exports.putTask=async (req,res)=>{
    try{
        const {id}=req.params;
        const {name,time,status}=req.body;
        if (!name || !time || !status) {
        return res.status(400).json({ message: "All fields (name, time, status) are required" });
        }
        const t=tasks.find((x)=>x.id===parseInt(id));
        t.name=name;
        t.time=time;
        t.status=status;
        res.status(200).json({ message: "Task replaced successfully", t });

    }catch(error){
        console.error({message:"Error"});
    }
}
exports.deleteTask=async (req,res)=>{
    try{
        const {id}=req.params;
        const task=tasks.findIndex((t)=>parseInt(id)===t.id);
        if(task==-1)
        {
           res.json({message:"Id not found"});
           return;
        }
        tasks.splice(task,1);
        res.json({message:tasks});
    }catch(error){
        console.error(error);
        res.json({message:"error"});
    }

}
exports.headTask=async (req,res)=>{
    try{
       res.set("X-total-tasks ",tasks.length);
       res.status(204).end();
    }catch(error){
       res.status(500).end();
    }
}

exports.optionsTask=async (req,res)=>{
    try{
        res.set("PUT","DELETE","POST","GET","PATCH");
        res.status(204).end();
    }catch(error){
        res.status(500).end();
    }
}