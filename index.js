const express = require("express");
const router = express.Router();
require("dotenv").config();
const { ThreadsAPI } = require("threads-api");
const profiles = [
  "mprnews",
  "apmreports",
  // "apmresearchlab",
  // "thecurrent",
  // "marketplaceapm",
  // "laistofficial",
  // "splendidtable",
  // "slowdownshow",
  // "dontasktig",
  // "carbonsoundfm",
];
const credentials = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
};
const deviceID = process.env.DEVICE_ID;
async function getData(username) {
  return new Promise((resolve, reject) => {
    let dataToAdd = [];
    function createRecord(item) {
      return {
        full_name: item.full_name,
        username: item.username,
        id: item.id,
        is_private: item.is_private,
        is_verified: item.is_verified,
        follower_count: item.follower_count,
      };
    }
    resolve(dataToAdd);
  });
  const threadsAPI = new ThreadsAPI({
    verbose: true,
    deviceID: deviceID,
    ...credentials,
  });
  let userID = threadsAPI.getUserIDfromUsername(username);
  if (!userID) {
    reject("User not found");
  } else {
    const user = await threadsAPI.getUserProfile(userID);
    var obj = createRecord(user);
    dataToAdd.push(obj);
  }
}
let dataArray = [];
profiles.forEach(async (profile) => {
  let record = getData(profile);
  console.log("Data fetched successfully");
  dataArray.push(record);
});
module.exports = router.use("/", async (req, res) => {
  Promise.all(dataArray).then((data) => {
    console.log("here is req: ", data);
  });
});
