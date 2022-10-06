import { Sequelize } from "sequelize";
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
    ];
    options.mainrole &&
      (mainRoleList.includes(options.mainrole) || (options.mainrole = ""));
    options.subrole &&
      (subRoleList.includes(options.subrole) || (options.subrole = ""));
    options.sort &&
      (orderList.includes(options.sort) || (options.sort = "id-ASC"));

    const sortType = options.sort.split("-");

    const data = await db.People.findAll({
      where: {
        [Op.and]: [
          {
            gender: {
              [Op.like]: `%${options.gender || ""}%`,
            },
          },
          {
            address: {
              [Op.like]: `%${options.address || ""}%`,
            },
          },
          {
            salaryType: {
              [Op.like]: `%${options.salarytype || ""}%`,
            },
          },
          {
            mainRole: {
              [Op.like]: `%${options.mainrole || ""}%`,
            },
          },
          {
            subRole: {
              [Op.like]: `%${options.subrole || ""}%`,
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
export { getAll, add, edit, get, del, checkEmail, login };
