const express = require("express");
const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("robot", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fuelType: {
    type: Sequelize.ENUM("gas", "diesel", "electric"),
    defaultValue: "electric",
  },
  fuelLevel: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
      max: 100,
    },
    defaultValue: 100,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://image.freepik.com/free-vector/robot-icon-bot-sign-design-chatbot-symbol-concept-voice-support-service-bot-online-support-bot-vector-stock-illustration_100456-34.jpg",
  },
});
