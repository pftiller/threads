const express = require("express");
const router = express.Router();
require("dotenv").config();
const { ThreadsAPI } = require("threads-api");
const profiles = [
  "mprnews",
  "apmreports",
  "apmresearch",
  "thecurrent",
  "marketplaceapm",
  "laistofficial",
  "splendidtable",
  "slowdownshow",
  "dontasktig",
  "carbonsoundfm",
];
const credentials = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
};
const deviceID = process.env.DEVICE_ID;

const createRecord = (item) => {
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
  if (!userID) {
    console.log("User not found");
  } else {
    let user = await threadsAPI.getUserProfile(userID);
    let data = await createRecord(user);
    return data;
  }
};
(async function () {
  let dataArray = [];
  for(let i=0; i<profiles.length; i++) {
    let data = await getData(profiles[i]);
    dataArray.push(data);
  }
  console.log(dataArray);
})();
