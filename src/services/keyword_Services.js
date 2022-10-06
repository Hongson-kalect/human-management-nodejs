import { Sequelize } from "sequelize";
import db from "../models/index";
const Op = Sequelize.Op;

const getMainRole = async () => {
  return db.KeyWord.findAll({
    where: {
      type: "mainRole",
    },
  });
};

const getSubRole = async () => {
  return db.KeyWord.findAll({
    where: {
      type: "subRole",
    },
  });
};

export { getMainRole, getSubRole };
