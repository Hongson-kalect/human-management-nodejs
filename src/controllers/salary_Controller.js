import { add, getAll, edit, get, del } from "../services/salary_Services";

const Salary_Controller = {
  add: async (req, res) => {
    try {
      const params = req.body;
      const data = await add(params);
      res.json({
        data: data,
      });
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
      res.json({
        data: data,
      });
    } catch (error) {
      console.log("Failed to edit from controller ", error);
      res.json({
        errorCode: -1,
        data: {},
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
      res.json({
        data: data,
      });
    } catch (error) {
      console.log("Failed to get from controller ", error);
      res.json({
        errorCode: -1,
        data: {},
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
      const data = await getAll(options);
      res.json({
        message: "qq",
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

export default Salary_Controller;
