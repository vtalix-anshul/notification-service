require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.NOTIFICATION_PORT || 3003;

app.listen(PORT, ()=>{
    console.log("notification service server running at port ", PORT);
});