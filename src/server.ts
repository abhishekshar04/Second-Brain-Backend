import { app } from "./app";
import connectDB  from "./db/db";


app.get('/', (req, res) => {
    res.send('Hello World');
})

connectDB()
.then(() =>{
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`The server is running at PORT ${port}`);
    })
})
.catch((err) => {
    console.log(`The Database connection failed in app.ts, ${err}`);
})