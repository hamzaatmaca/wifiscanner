const express = require("express");
const app = express();
const path = require("path")
const cors = require("cors")
const PORT = 5000
var wifiResult;

//Wi-fi Scan
const wifi = require("./wi-fi/wifiScanLinux")

//Body Parser
app.use(express.json());

//Static Files
app.use(express.static('public/assets'));

//Prevent Cors
app.use(cors());

//GET Wifi


//View HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get("/allWifi", (req, res) => {

    try {

        wifi.Scan().then((data) => {
            wifiResult = data
        })

        setTimeout(() => {
            res.status(200).json({
                message: "Success",
                data: wifiResult
            })
        }, 1500)

    } catch (err) {

        res.status(500).json({
            message: "Failed",
            error: err
        })
    }
});

//Run Server
app.listen(PORT, () => {
    console.log("Wifi Scanner is running")
})