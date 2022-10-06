import {
  add,
  getAll,
  edit,
  get,
  del,
  checkEmail,
} from "../services/people_Salary_Services";

const People_Salary_Controller = {
  add: async (req, res) => {
    try {
      const params = req.body;
      if (!(await checkEmail(params.email))) {
        const data = await add(params);
        if (data)
          res.json({
            errorCode: 1,
            data: data,
          });
        else {
          res.json({
            errorCode: 0,
            data: data,
            message: "Lack of Infomation",
          });
        }
      } else {
        res.json({
          errorCode: 0,
          data: {},
          message: "Email already in use",
        });
      }
    } catch (error) {
      console.log("Failed to add from controller ", error);
      res.json({
        errorCode: -1,
        data: {},
      });
    }
  },

  edit: async (req, res) => {
    try {
      const params = req.body;
      params.id = req.params.id;
      const data = await edit(params);
      if (data)
        res.json({
          errorCode: 1,
          data: data,
        });
      else {
        res.json({
          errorCode: 0,
          data: data,
          message: "Maybe id not accurately",
        });
      }
    } catch (error) {
      console.log("Failed to edit from controller ", error);
      res.json({
        errorCode: -1,
        data: {},
        message: "Failed to edit from controller",
      });
    }
  },

  del: async (req, res) => {
    try {
      const params = {};
      params.id = req.params.id;
      const data = await del(params);
      res.json({
        data: data,
      });
    } catch (error) {
      console.log("Failed to delete from controller ", error);
      res.json({
        errorCode: -1,
        data: {},
      });
    }
  },

  get: async (req, res) => {
    try {
      const params = {};
      params.id = req.params.id;
      const data = await get(params);
      if (data)
        res.json({
          errorCode: 1,
          data: data,
        });
      else
        res.json({
          errorCode: 0,
          data: {},
          message: "id not found",
        });
    } catch (error) {
      console.log("Failed to get from controller ", error);
      res.json({
        errorCode: -1,
        data: {},
        message: "Failed to get from controller",
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const options = {
        sort: "id-ASC",
      };
      req.query.s && (options.s = req.query.s);
      req.query.sort && (options.sort = req.query.sort);
      req.query.mainrole && (options.mainrole = req.query.mainrole);
      req.query.subrole && (options.subrole = req.query.subrole);
      req.query.gender && (options.gender = req.query.gender);
      req.query.salarytype && (options.salarytype = req.query.salarytype);
      req.query.address && (options.address = req.query.address);
      req.query.offset && (options.offset = req.query.offset);
      req.query.limit && (options.limit = req.query.limit);
      req.query.room && (options.room = req.query.room);
      const data = await getAll(options);
      res.json({
        errorCode: 1,
        data: data,
      });
      return true;
    } catch (error) {
      console.log("Failed to get all from controller ", error);
      res.json({
        errorCode: -1,
        data: {},
      });
    }
  },
};

export default People_Salary_Controller;
