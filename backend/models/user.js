const { model, Schema } = require("mongoose")

const UserSchema = new Schema({
    usuario: {
        type: String,
        required: true
    },
    puntos:{
        type:Number,
        required:true
    }
},

)


module.exports = model("User", UserSchema)