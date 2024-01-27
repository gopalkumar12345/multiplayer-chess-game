//last updated===>> 26/01/2024
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const { Schema } = mongoose;
const http = require("http");
const server = http.createServer(app);
// const { Server } = require("socket.io");


const io = require('socket.io')(server,{
    cors: { origin : "*"}
});


// mongodb configuration
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chess_game");
  console.log("database connected");
}

const cellSchema = new mongoose.Schema({
  cell_no: Number,
  piece: String,
  color: String,
});


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (white) => {
 
  const joining_Id=white.id
  white.on("new room", (username) => {
    white.join(`${white.id}`);
    console.log(`${white.id}  🍥🍥🍥🍥🍥`)
   
    const db_status = mongoose.model(`${joining_Id}`, cellSchema,`${joining_Id}`);
   
    for (i = 9; i <= 16; i++) {
      pawn_white();

      async function pawn_white() {
         await db_status.create({
          cell_no: i,
          piece: "pawn",
          color:"white",
        });
      }
    }
    for (i = 49; i <= 56; i++) {
      pawn_black();
      async function pawn_black() {
        await db_status.create({
          cell_no: i,
          piece: "pawn",
          color:"black",
        });
      }
    }
    remaining_white()
    async function remaining_white(){
     
      await db_status.create({
        cell_no:1,
        piece:"rook",
        color:"white"
      })
      await db_status.create({
        cell_no:2,
        piece:"knight",
        color:"white"
      })
      await db_status.create({
        cell_no:3,
        piece:"bishop",
        color:"white"
      })
      await db_status.create({
        cell_no:4,
        piece:"queen",
        color:"white"
      })
      await db_status.create({
        cell_no:5,
        piece:"king",
        color:"white"
      })
      await db_status.create({
        cell_no:6,
        piece:"bishop",
        color:"white"
      })
      await db_status.create({
        cell_no:7,
        piece:"knight",
        color:"white"
      })
      await db_status.create({
        cell_no:8,
        piece:"rook",
        color:"white"
      })

    }
    remaining_black()
    async function remaining_black(){
    
      await db_status.create({
        cell_no:57,
        piece:"rook",
        color:"black"
      })
      await db_status.create({
        cell_no:58,
        piece:"knight",
        color:"black"
      })
      await db_status.create({
        cell_no:59,
        piece:"bishop",
        color:"black"
      })
      await db_status.create({
        cell_no:60,
        piece:"queen",
        color:"black"
      })
      await db_status.create({
        cell_no:61,
        piece:"king",
        color:"black"
      })
      await db_status.create({
        cell_no:62,
        piece:"bishop",
        color:"black"
      })
      await db_status.create({
        cell_no:63,
        piece:"knight",
        color:"black"
      })
      await db_status.create({
        cell_no:64,
        piece:"rook",
        color:"black"
      })

    }
   
  });
  white.on("join room",(joining_Id)=>{
    white.join(`${joining_Id}`);
    io.to(`${joining_Id}`).emit("messaGE","🍥🍥🍥🍥🍥");
  })
  
  


  //moving event of white
  white.on("moveWhite",(message)=>{
    const ans=isValidMoveWhite(message)
    if(ans){
      io.to(`${joining_Id}`).emit("valid move")
    }
    else{
      io.to(`${joining_Id}`).emit("invalid")
    }

  })
  white.on("moveBlack",(message)=>{
    if(message.color!=="black"){
      io.to(`${joining_Id}`).emit("invalid move","color different")
    }
    else if(isValidMove(message)===false){
      io.to(`${joining_Id}`).emit("invalid move","move galat hai")
    }
    else{
      io.to(`${joining_Id}`).emit("valid move","moj kar")
    }

  })
})

   //MOVE VALIDATION FUNCTION   #######################################


   async function isValidMoveWhite(message){
    const db_status3= mongoose.model(`${message.room_id}`, cellSchema,`${message.room_id}`)
     if(message.piece==="pawn"){
     if(message.final===message.initial+8){
          const obj=await db_status3.findOne({cell_no:message.final})
          if(obj!=null){
            return false;
          }
          else{
            await db_status3.updateOne({cell_no:message.initial},{cell_no:message.final})
            return true;
          }
      }
      else if(msg.final===msg.initial+9||msg.final===msg.initial+7){
          if(db_status.findOne({cell_no:msg.final})!==null){
            let deleted_data=await db_status.deleteOne({cell_no:final})
            console.log(deleted_data)
            let killer_data=await db_status.updateOne({cell_no:message.initial},{cell_no:message.final})
            console.log(killer_data)
            return true;
          }
          else{
            return false
          }
        }
        else{
          return false
        }
  
    // }
  
}
}
//  
//*******   ASLI MOVE VALIDATION   *******

  // if(initial.data.piece==='knight'){
  //   if(msg.initial===msg.final+10||msg.initial===msg.final-10||msg.initial===msg.final+6||msg.initial===msg.final-6||msg.initial===msg.final+15||msg.initial===msg.final-15||msg.initial===msg.final+17||msg.initial===msg.final-17){
  //     if(msg.final.data===null){
  //       //proceed
  //     }
  //     else{
  //       if(msg.final.color===opposite){
  //         //proceed
  //         //isKilling=true
  //       }
  //       else{
  //         //failure
  //       }
  //     }
  //   }
  //   else{
  //     //failure
  //   }
  // }
  // if(initial.data.piece==="bishop"){
  //   if(msg.initial<msg.final){
  //     if((msg.final-msg.initial)%9==0){
  //       for(i=msg.initial+9;i<msg.final;i+=9){
  //         let data=await cell_status.findOne({cell_no:i})
  //         if(data!==null){
  //           //failure
  //           break
  //         }

  //       }
  //       let data=await cell_status.findOne({cell_no:msg.final}){
  //         if(data!==null){
  //           isKiliing=true
  //           //success
  //         }
  //         else{
  //           //success
  //         }
  //       }

  //     }
  //     else if((msg.final-msg.initial)%7==0){
  //       for(i=msg.initial+7;i<msg.final;i+=7){
  //         let data=await cell_status.findOne({cell_no:i})
  //         if(data!==null){
  //           //failure
  //           break
  //         }

  //       }
  //       let data=await cell_status.findOne({cell_no:msg.final}){
  //         if(data!==null){
  //           isKiliing=true
  //           //success
  //         }
  //         else{
  //           //success
  //         }
  //       }

  //     }
  //     else{
  //       //failure
  //     }
  //   }
  //   else if(msg.final<msg.initial){
  //     if((msg.initial-msg.final)%9==0){
  //       for(i=msg.initial-9;i>msg.final;i-=9){
  //         let data=await cell_status.findOne({cell_no:i})
  //         if(data!==null){
  //           //failure
  //           break
  //         }

  //       }
  //       let data=await cell_status.findOne({cell_no:msg.final}){
  //         if(data!==null){
  //           isKiliing=true
  //           //success
  //         }
  //         else{
  //           //success
  //         }
  //       }

  //     }
  //     else if((msg.initial-msg.final)%7==0){
  //       for(i=msg.initial-7;i>msg.final;i-=7){
  //         let data=await cell_status.findOne({cell_no:i})
  //         if(data!==null){
  //           //failure
  //           break
  //         }

  //       }
  //       let data=await cell_status.findOne({cell_no:msg.final}){
  //         if(data!==null){
  //           isKiliing=true
  //           //success
  //         }
  //         else{
  //           //success
  //         }
  //       }

  //     }
  //     else{
  //       //failure
  //     }

  //   }
  //   else{
  //     //failure
  //   }

  // }
  // else if(msg.piece==="rook"){
  //   if(Math.abs(msg.final-msg.piece)<8){
  //      if(msg.final>msg.initial){
  //        for(i=msg.initial+1;i<msg.final;i++){
  //         let data=cell_status.findOne({cell_no:i})
  //         if(data!==null){
  //           break
  //           //failure
  //         }
  //        }
  //        let data=cell_status.findOne({cell_no:msg.final})
  //        if(data!==null){
  //         isKilling=true;
  //         //success
  //        }
  //        else{
  //           //suceess
  //        }

  //      }
  //      else if(msg.initial>msg.final){
  //       for(i=msg.initial+1;i>msg.final;i--){
  //         let data=cell_status.findOne({cell_no:i})
  //         if(data!==null){
  //           break
  //           //failure
  //         }
  //        }
  //        let data=cell_status.findOne({cell_no:msg.final})
  //        if(data!==null){
  //         isKilling=true;
  //         //success
  //        }
  //        else{
  //           //suceess
  //        }

  //      }
  //      else{
  //       //failure
  //      }

  //   }
  //   if(Math.abs(msg.final-msg.initial)>8){
  //     if(msg.final>msg.initial){
  //       for(i=initial;i<final;i+=8){
  //           let data=cell_status.findOne({cell_no:i})
  //           if(data!==null){
  //             break
  //             //failure
  //           }
  //       }
  //       let data=cell_status.findOne({cell_no:msg.final})
  //       if(data!==null){
  //         isKiliing=true
  //         //success
  //       }
  //       else{
  //         //success without killing
  //       }
  //     }
  //     if(msg.initial>msg.final){
  //       for(i=initial;i>final;i-=8){
  //           let data=cell_status.findOne({cell_no:i})
  //           if(data!==null){
  //             break
  //             //failure
  //           }
  //       }
  //       let data=cell_status.findOne({cell_no:msg.final})
  //       if(data!==null){
  //         isKiliing=true
  //         //success
  //       }
  //       else{
  //         //success without killing
  //       }
  //     }

  //   }

  // }
  // else if(msg.piece==="queen"){

  // }



app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(3000, () => {
  console.log("listening on *:3000");
});
