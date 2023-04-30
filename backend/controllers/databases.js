const Database = require("../models/Database");
const Organization = require("../models/Organization");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { ObjectID, MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const joi = require("joi");
const handleAsync = require("./errorHandler");

module.exports.new = handleAsync(async (req, res, next) => {
  const connString = req.body.connString;
  const organizationId = req.body.organizationId;
  const mongodbUriRegex =
    /^mongodb(?:\+srv)?:\/\/(?:\S+:\S+@)?(?:[\w.-]+|\[[a-fA-F0-9:]+\])(?::\d+)?(?:\/[\w.-]+)*(?:\?(?:\S+=[\w.%+-]+)(?:&\S+=[\w.%+-]+)*)?(?:#[\w.-]+)?$/;
  if (mongodbUriRegex.test(connString) === false) {
    throw new Error("Invalid connection string");
  }
  const organization = await Organization.findById({
    _id: ObjectID(organizationId),
  });
  if (!organization) {
    throw new Error("Organization does not exist");
  }
  //fetch all collection in a DB
  //save data in the db
  const client = await MongoClient.connect(connString, {
    useUnifiedTopology: true,
  });
  const db = client.db(dbName);
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map((c) => c.name);

  await Database.create({
    connString,
    organizationId,
  });

  res.send({ success: true, collections: collectionNames });
});
