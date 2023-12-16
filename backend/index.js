const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoute");
const { bookRouter } = require("./routes/bookRoute");
const { bookReviewRouter } = require("./routes/bookReviewRoute");
const { readingListRouter } = require("./routes/readingListRoute");
const { chatRouter } = require("./routes/chatbotRoute");
const { cartRouter } = require("./routes/cartRoute");
const { purchaseRouter } = require("./routes/purchaseRoute");
const { communityDiscRouter } = require("./routes/communityDiscRoute");
const { discussionPostRouter } = require("./routes/discussionPostRoute");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/review", bookReviewRouter);
app.use("/readinglists", readingListRouter);
app.use("/chatbot", chatRouter);
app.use("/cart", cartRouter);
app.use("/purchase", purchaseRouter);
app.use("/community", communityDiscRouter);
app.use("/posts", discussionPostRouter);

app.get("/", (req, res)=>{
    res.status(200).send("Welcome to BookHavenX Backend")
})

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connect to the DB");
        console.log(`server is running at port ${process.env.port}`);
    }catch(err){
        console.log(err);
        console.log("Something Went Wrong!!!");
    }
})