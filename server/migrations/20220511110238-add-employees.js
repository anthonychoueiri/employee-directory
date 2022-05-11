"use strict";

const axios = require("axios").default;

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = (options, seedLink) => {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async (db) => {
  try {
    const response = await axios.get(
      "https://randomuser.me/api/?results=100&inc=name,location,picture"
    );
    const { data } = await response;

    const jobTitles = ["Designer", "Strategist", "Engineer"];

    for (const element of data.results) {
      const employee = [
        element.name.first,
        element.name.last,
        element.picture.large,
        jobTitles[Math.floor(Math.random() * jobTitles.length)],
        element.location.country,
      ];
      db.insert(
        "employee",
        ["first_name", "last_name", "picture", "job_title", "country"],
        employee
      );
    }
  } catch (error) {
    console.log(error);
  }
};

exports.down = (db) => {
  console.log("migrating down");
};

exports._meta = {
  version: 1,
};
