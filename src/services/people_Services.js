import { Sequelize, where } from "sequelize";
import db from "../models/index";
const Op = Sequelize.Op;

const getAll = async (options) => {
  try {
    const mainRoleList = ["MROLE0", "MROLE1", "MROLE2", "MROLE3"];
    const subRoleList = [
      "SROLE0",
      "SROLE1",
      "SROLE2",
      "SROLE3",
      "SROLE4",
      "SROLE5",
      "SROLE6",
      "SROLE7",
      "SROLE8",
      "SROLE9",
    ];
    const orderList = [
      "id-ASC",
      "id-DESC",
      "firstName-ASC",
      "firstName-DESC",
      "lastName-ASC",
      "lastName-DESC",
      "mainRole-ASC",
      "mainRole-DESC",
      "age-ASC",
      "age-DESC",
      "salaryType-ASC",
      "salaryType-DESC",
      "gender-ASC",
      "gender-DESC",
      "dayIn-ASC",
      "dayIn-DESC",
      "dayOut-ASC",
      "dayOut-DESC",
      "name-ASC",
      "name-DESC",
    ];
    options.mainrole &&
      (mainRoleList.includes(options.mainrole) || (options.mainrole = ""));
    options.subrole &&
      (subRoleList.includes(options.subrole) || (options.subrole = ""));
    options.sort &&
      (orderList.includes(options.sort) || (options.sort = "id-ASC"));

    const sortType = options.sort.split("-");
    console.log(options);
    const data = await db.People.findAll({
      where: {
        [Op.and]: [
          {
            workRoom: {
              [Op.like]: `%${options.room || ""}%`,
            },
          },
          {
            deleted: {
              [Op.in]: [null, "false"],
            },
          },
          {
            dayIn: {
              [Op.gte]: options.dayInStart || "2000-11-11",
            },
          },
          {
            dayIn: {
              [Op.lte]: `${options.dayInEnd + " 23:59:59"}` || "2200-11-11",
            },
          },
          {
            dayOut: {
              [Op.gte]: options.dayOutStart || "2000-11-11",
            },
          },
          {
            dayOut: {
              [Op.lte]: `${options.dayOutEnd + " 23:59:59"}` || "2200-11-11",
            },
          },
          {
            [Op.or]: [
              {
                email: {
                  [Op.like]: `%${options.s || ""}%`,
                },
              },
              {
                firstName: {
                  [Op.like]: `%${options.s || ""}%`,
                },
              },
              {
                lastName: {
                  [Op.like]: `%${options.s || ""}%`,
                },
              },
              {
                address: {
                  [Op.like]: `%${options.s || ""}%`,
                },
              },
              {
                gender: {
                  [Op.like]: `%${options.s || ""}%`,
                },
              },
              {
                salaryType: {
                  [Op.like]: `%${options.s || ""}%`,
                },
              },
              {
                mainRole: {
                  [Op.like]: `%${options.s || ""}%`,
                },
              },
              {
                subRole: {
                  [Op.like]: `%${options.s || ""}%`,
                },
              },
            ],
          },
        ],
      },
      include: [
        {
          model: db.KeyWord,
          as: "mainrole-keyword",
          attributes: ["viValue", "enValue"],
        },
        {
          model: db.KeyWord,
          as: "subrole-keyword",
          attributes: ["viValue", "enValue"],
        },
      ],
      attributes: { exclude: ["password"] },
      order: [sortType],
      offset: +options.offset || 0,
      limit: +options.limit || null,
      group: ["id"],
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
      const peopleInit = {
        email: params.email || "",
        password: params.password || "",
        firstName: params.firstName || "",
        lastName: params.lastName || "",
        gender: params.gender || "",
        age: params.age || "",
        address: params.address || "",
        phoneNumber: params.phoneNumber || "",
        workRoom: params.workRoom || "",
        mainRole: params.mainRole || "",
        subRole: params.subRole || "",
        salaryType: params.salaryType || "",
        avatar: params.avatar || "",
        description: params.description || "",
      };
      const data = await db.People.create(peopleInit);

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
      const peopleInit = {
        gender: params.gender,
        age: params.age,
        address: params.address,
        phoneNumber: params.phoneNumber,
        workRoom: params.workRoom,
        mainRole: params.mainRole,
        subRole: params.subRole,
        salaryType: params.salaryType,
        avatar: params.avatar,
        description: params.description,
        updateAt: Date.now(),
      };

      await db.People.update(peopleInit, { where: { id: params.id } });
      return await get({ id: params.id });
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
    await db.People.destroy({
      where: { id: params.id },
    });
    return `Delete user ${params.id} successfully`;
  } catch (error) {
    console.log("failed to delete from services ", error);
    return "failed to delete from services";
  }
};

const get = async (params) => {
  try {
    return await db.People.findOne({
      where: { id: params.id },
      include: [
        {
          model: db.KeyWord,
          as: "mainrole-keyword",
          attributes: ["viValue", "enValue"],
        },
        {
          model: db.KeyWord,
          as: "subrole-keyword",
          attributes: ["viValue", "enValue"],
        },
      ],
      attributes: { exclude: ["password"] },
    });
  } catch (error) {
    console.log("failed to delete from services ", error);
    return "failed to get from services";
  }
};

const checkEmail = async (email) => {
  console.log(email);
  const data = await db.People.findOne({
    where: { email: email },
    raw: true,
    include: [
      {
        model: db.KeyWord,
        as: "mainrole-keyword",
        attributes: ["viValue", "enValue"],
      },
      {
        model: db.KeyWord,
        as: "subrole-keyword",
        attributes: ["viValue", "enValue"],
      },
      {
        model: db.SalaryAtt,
        as: "people-salaryatt",
        attributes: [
          "basicSalary",
          "positionSalary",
          "laboriousBonus",
          "languageBonus",
          "vehicleBonus",
          "innBonus",
          "insurance",
          "other",
          "description",
        ],
      },
    ],
  });
  console.log(2);

  return data;
};

const login = async (params) => {
  const userInfo = await db.People.findOne({
    where: { email: params.email },
  });
  if (params.password === userInfo.dataValues.password) {
    delete userInfo.dataValues.password;
    return userInfo;
  }
  return false;
};

const changepass = async (params) => {
  return await db.People.update(
    { password: params.newPassword },
    {
      where: { email: params.email },
    }
  );
};

const addValidate = (data) => {
  if (
    data.email &&
    data.password &&
    data.firstName &&
    data.lastName &&
    data.gender &&
    data.age &&
    data.phoneNumber &&
    data.mainRole &&
    data.subRole
  ) {
    return true;
  }
  return false;
};
const getExpired = async (params) => {
  try {
    let compareDate = new Date().toISOString().slice(0, 10);
    const dateArray = compareDate.split("-");
    dateArray[0] = Number(dateArray[0]) + Math.floor(Number(dateArray[1]) / 12);
    dateArray[1] =
      (Number(dateArray[1]) + 1) % 12 === 0
        ? 12
        : (Number(dateArray[1]) + 1) % 12;
    compareDate = `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`;
    console.log(dateArray);
    console.log(compareDate);
    const data = await db.People.findAll({
      where: {
        dayOut: {
          [Op.lt]: compareDate,
        },
      },
      include: [
        {
          model: db.KeyWord,
          as: "mainrole-keyword",
          attributes: ["viValue", "enValue"],
        },
        {
          model: db.KeyWord,
          as: "subrole-keyword",
          attributes: ["viValue", "enValue"],
        },
      ],
      attributes: { exclude: ["password"] },
      group: ["id"],
    });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const extend = async (params) => {
  try {
    await db.People.update(
      { dayOut: params.dayOut },
      {
        where: {
          id: params.id,
        },
      }
    );
    return true;
  } catch (error) {
    return false;
  }
};
export {
  getAll,
  add,
  edit,
  get,
  del,
  checkEmail,
  login,
  changepass,
  getExpired,
  extend,
};
