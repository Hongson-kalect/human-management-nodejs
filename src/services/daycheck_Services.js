import { Sequelize, where } from "sequelize";
import db from "../models/index";
const Op = Sequelize.Op;

const getDayCheck = async (params) => {
  const data = await db.People.findAll({
    attributes: [
      "email",
      "firstName",
      "lastName",
      "workRoom",
      "mainRole",
      "subRole",
    ],
    where: {
      [Op.and]: [
        {
          workRoom: {
            [Op.like]: `%${params.room || ""}%`,
          },
        },
        {
          [Op.or]: [
            {
              firstName: {
                [Op.like]: `%${params.s || ""}%`,
              },
            },
            {
              lastName: {
                [Op.like]: `%${params.s || ""}%`,
              },
            },
            {
              lastName: {
                [Op.like]: `%${params.s || ""}%`,
              },
            },
          ],
        },
      ],
    },
    order: [["lastName", "ASC"]],
    include: [
      {
        model: db.TimeKeeping,
        as: "people-timekeeping",
        where: {
          [Op.and]: [
            {
              day: {
                [Op.gte]: `${params.from || ""}`,
              },
            },
            {
              day: {
                [Op.lte]: `${params.to + " 23:59:59" || ""}`,
              },
            },
          ],
        },
      },
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
    where: {
      [Op.and]: [
        {
          workRoom: {
            [Op.like]: `%${params.room || ""}%`,
          },
        },
        {
          [Op.or]: [
            {
              firstName: {
                [Op.like]: `%${params.s || ""}%`,
              },
            },
            {
              lastName: {
                [Op.like]: `%${params.s || ""}%`,
              },
            },
            {
              lastName: {
                [Op.like]: `%${params.s || ""}%`,
              },
            },
          ],
        },
      ],
    },
  });
  return data;
};
const getDayCheckOne = async (params) => {
  const data = await db.People.findAll({
    attributes: [
      "email",
      "firstName",
      "lastName",
      "workRoom",
      "mainRole",
      "subRole",
    ],
    where: {
      id: params.id,
    },

    include: [
      {
        model: db.TimeKeeping,
        as: "people-timekeeping",
        include: [
          {
            model: db.KeyWord,
            as: "keyword-worktype",
            attributes: ["viValue", "enValue"],
          },
          {
            model: db.KeyWord,
            as: "keyword-daytype",
            attributes: ["viValue", "enValue"],
          },
        ],
      },
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
  });
  return data;
};

const daycheck = async (params) => {
  const date = new Date();
  const peopleList = params.peopleId;
  peopleList.forEach(async (id) => {
    try {
      const notValid = await db.TimeKeeping.findOne({
        where: {
          userId: id,
          day: {
            [Op.gt]: `${date.getFullYear()}-${
              date.getMonth() < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1
            }-${date.getDate()}`,
          },
        },
      });
      if (notValid) {
        await db.TimeKeeping.update(
          {
            workShift: params.workShift,
            workType: params.workType,
            dayType: params.dayType,
            day: Date.now(),
          },
          {
            where: {
              userId: id,
              day: {
                [Op.gt]: `${date.getFullYear()}-${
                  date.getMonth() < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1
                }-${date.getDate()}`,
              },
            },
          }
        );
      } else {
        await db.TimeKeeping.create({
          userId: id,
          workShift: params.workShift,
          workType: params.workType,
          dayType: params.dayType,
          day: Date.now(),
        });
      }
      // return true;
    } catch (error) {
      console.log("failed at dayCheck, ", error);
    }
  });
  return "day check services";
};
const daycheckOne = async (params) => {
  try {
    const date = new Date();
    const notValid = await db.TimeKeeping.findOne({
      where: {
        userId: params.id,
        day: {
          [Op.gt]: `${date.getFullYear()}-${
            date.getMonth() < 10
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1
          }-${date.getDate()}`,
        },
      },
    });
    if (notValid) {
      await db.TimeKeeping.update(
        {
          workShift: params.workShift,
          workType: params.workType,
          dayType: params.dayType,
          day: Date.now(),
        },
        {
          where: {
            userId: params.id,
            day: {
              [Op.gt]: `${date.getFullYear()}-${
                date.getMonth() < 10
                  ? "0" + (date.getMonth() + 1)
                  : date.getMonth() + 1
              }-${date.getDate()}`,
            },
          },
        }
      );
    } else {
      await db.TimeKeeping.create({
        userId: params.id,
        workShift: params.workShift,
        workType: params.workType,
        dayType: params.dayType,
        day: Date.now(),
      });
    }
    return true;
  } catch (error) {
    console.log("failed at dayCheck, ", error);
    return false;
  }
};
export { daycheck, daycheckOne, getDayCheck, getDayCheckOne };
