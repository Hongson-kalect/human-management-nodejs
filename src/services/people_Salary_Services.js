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
      attributes: { exclude: ["password"] },

      group: ["id"],
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
        description: params.peopleDescription || "",
      };

      const data_people = await db.People.create(peopleInit);

      const salaryInit = {
        userId: data_people.id || "",
        basicSalary: params.basicSalary || "",
        positionSalary: params.positionSalary || "",
        laboriousBonus: params.laboriousBonus || 0,
        languageBonus: params.languageBonus || 0,
        vehicleBonus: params.vehicleBonus || 0,
        innBonus: params.innBonus || 0,
        insurance: params.insurance || 0,
        other: params.other || 0,
        description: params.salaryDescription || "",
      };
      const data_salary = await db.SalaryAtt.create(salaryInit);

      const data = Object.assign(
        data_salary.dataValues,
        data_people.dataValues
      );

      return data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("failed to add from services ", error);
    return "failed to add from services ";
  }
};

const edit = async (params) => {
  try {
    if (editValidate(params)) {
      const peopleInit = {
        firstName: params.firstName,
        lastName: params.lastName,
        gender: params.gender,
        age: params.age,
        address: params.address,
        phoneNumber: params.phoneNumber,
        workRoom: params.workRoom,
        mainRole: params.mainRole,
        subRole: params.subRole,
        salaryType: params.salaryType,
        avatar: params.avatar,
        description: params.peopleDescription,
        updateAt: Date.now(),
      };

      await db.People.update(peopleInit, { where: { id: params.id } });

      const salaryInit = {
        basicSalary: params.basicSalary,
        positionSalary: params.positionSalary,
        laboriousBonus: params.laboriousBonus,
        languageBonus: params.languageBonus,
        vehicleBonus: params.vehicleBonus,
        innBonus: params.innBonus,
        insurance: params.insurance,
        other: params.other,
        description: params.salaryDescription,
        updateAt: Date.now(),
      };
      const isExistSalary = await db.SalaryAtt.findOne({
        where: { userId: params.id },
      });
      if (isExistSalary)
        await db.SalaryAtt.update(salaryInit, { where: { userId: params.id } });
      else {
        await db.SalaryAtt.create(
          Object.assign(salaryInit, { userId: params.id })
        );
      }

      // const data = Object.assign(
      //   data_salary.dataValues,
      //   data_people.dataValues
      // );

      return params.id;
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
    const data = await db.People.update(
      {
        deleted: "true",
        //deleteAt: Date.now(),
      },
      {
        where: {
          id: params.id,
        },
      }
    );
    // await db.People.destroy({
    //   where: { id: params.id },
    // });
    // await db.SalaryAtt.destroy({
    //   where: { userId: params.id },
    // });
    console.log(data);
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
      attributes: { exclude: ["password"] },
    });
  } catch (error) {
    console.log("failed to delete from services ", error);
    return "failed to get from services";
  }
};

const checkEmail = async (email) => {
  const data = await db.People.findOne({ where: { email: email } });
  return data;
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
    data.subRole &&
    data.salaryType &&
    data.basicSalary &&
    data.positionSalary &&
    data.laboriousBonus
  ) {
    return true;
  }
  return false;
};

const editValidate = (data) => {
  if (
    data.firstName &&
    data.lastName &&
    data.gender &&
    data.age &&
    data.phoneNumber &&
    data.mainRole &&
    data.subRole &&
    data.salaryType &&
    data.basicSalary &&
    data.positionSalary &&
    data.laboriousBonus
  ) {
    return true;
  }
  return false;
};
export { getAll, add, edit, get, del, checkEmail };
