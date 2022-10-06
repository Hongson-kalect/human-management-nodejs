import { Sequelize } from "sequelize";
import db from "../models/index";
const Op = Sequelize.Op;

const getAll = async (options) => {
  const orderList = ["id-ASC", "id-DESC", "userId-ASC", "userId-DESC"];
  try {
    options.sort &&
      (orderList.includes(options.sort) || (options.sort = "id-ASC"));

    const sortType = options.sort.split("-");

    const data = await db.SalaryAtt.findAll({
      where: {
        [Op.or]: [
          {
            id: { [Op.like]: `%${options.s || ""}%` },
          },
          {
            userId: { [Op.like]: `%${options.s || ""}%` },
          },
        ],
      },
      order: [sortType],
      offset: +options.offset || 0,
      limit: +options.limit || null,
    });
    return data;
  } catch (error) {
    console.log("failed to get all from services ", error);
    return "failed to get all from services ";
  }
};

const add = async (params) => {
  try {
    if (addValidate(params)) {
      const salaryInit = {
        userId: params.id || "",
        basicSalary: params.basicSalary || "",
        positionSalary: params.positionSalary || "",
        laboriousBonus: params.laboriousBonus || 0,
        languageBonus: params.languageBonus || 0,
        vehicleBonus: params.vehicleBonus || 0,
        innBonus: params.innBonus || 0,
        insurance: params.insurance || 0,
        other: params.other || 0,
        description: params.descrition || "",
      };
      const data = await db.SalaryAtt.create(salaryInit);
      return data;
    } else {
      return "Lack of data";
    }
  } catch (error) {
    console.log("failed to add from services ", error);
    return "failed to add from services ";
  }
};

const edit = async (params) => {
  try {
    if (addValidate(params)) {
      const salaryInit = {
        basicSalary: params.basicSalary,
        positionSalary: params.positionSalary,
        laboriousBonus: params.laboriousBonus,
        languageBonus: params.languageBonus,
        vehicleBonus: params.vehicleBonus,
        innBonus: params.innBonus,
        insurance: params.insurance,
        other: params.other,
        description: params.descrition,
        updateAt: Date.now(),
      };
      await db.SalaryAtt.update(salaryInit, { where: { userId: params.id } });

      return await get(params.id);
    } else {
      return "Lack of data";
    }
  } catch (error) {
    console.log("failed to edit from services ", error);
    return "failed to edit from services ";
  }
};

const del = async (params) => {
  try {
    await db.SalaryAtt.destroy({
      where: { userId: params.id },
    });
    return `Delete user ${params.id} successfully`;
  } catch (error) {
    console.log("failed to delete from services ", error);
    return "failed to delete from services";
  }
};

const get = async (params) => {
  try {
    return await db.SalaryAtt.findOne({
      where: { userId: params.id },
    });
  } catch (error) {
    console.log("failed to delete from services ", error);
    return "failed to get from services";
  }
};

const addValidate = (data) => {
  if (data.id && data.basicSalary && data.positionSalary) {
    return true;
  }
  return false;
};
export { getAll, add, edit, get, del };
