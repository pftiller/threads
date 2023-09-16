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
const createRecord = async (item) => {
  return {
    full_name: item.full_name,
    username: item.username,
    id: item.pk,
    is_private: item.is_private,
    is_verified: item.is_verified,
    follower_count: item.follower_count,
  };
};
const getData = async (username) => {
  const threadsAPI = new ThreadsAPI({
    verbose: true,
    deviceID: deviceID,
    ...credentials,
  });
  let userID = await threadsAPI.getUserIDfromUsername(username);
  if (userID) {
    let user = await threadsAPI.getUserProfile(userID);
    return user;
  }
};
let dataArray = [];
profiles.forEach(async (profile) => {
  let data = await getData(profile);
  let record = await createRecord(data);
  dataArray.push(record);
});

(async function () {
  let result = await dataArray;
  console.log(result);
})();
