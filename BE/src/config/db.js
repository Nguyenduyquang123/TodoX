import mongoose from 'mongoose' // sửa lại đúng chính tả


export const connectDB = async () =>{
    try{
        await mongoose.connect(
            process.env.MONGODB_URI
        );
        console.log("liên kết thành công");
        
    }catch(error){
        console.error("lỗi kết nối database:", error)
        process.exit(1);
    }
};