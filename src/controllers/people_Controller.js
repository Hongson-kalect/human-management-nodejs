import {
  add,
  getAll,
  edit,
  get,
  del,
  checkEmail,
  changepass,
  getExpired,
  extend,
} from "../services/people_Services";

const People_Controller = {
  login: async (req, res) => {
    try {
      const params = req.body;
      const userInfo = await checkEmail(params.email);
      if (userInfo)
        if (userInfo.password === params.password) {
          delete userInfo.password;
          res.json({
            errorCode: 1,
            data: userInfo,
            message: "Login successfully",
          });
        } else {
          res.json({
            errorCode: 0,
            data: {},
            message: "Passwords incorrect",
          });
        }
      else {
        res.json({
          errorCode: 0,
          data: {},
          message: "Email incorrect",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        errorCode: -1,
        data: {},
        message: "Server error",
      });
    }
  },
  changepass: async (req, res) => {
    try {
      const params = req.body;
      const userInfo = await checkEmail(params.email);
      if (userInfo) {
        if (userInfo.password === params.currentPassword) {
          const data = await changepass(params);
          if (data) {
            res.json({
              errorCode: 1,
              data: { data },
              message: "Change password successfully",
            });
          } else {
            res.json({
              errorCode: 0,
              data: {},
              message: "Error",
            });
          }
        } else {
          res.json({
            errorCode: 0,
            data: {},
            message: "Password not correct",
          });
        }
      } else {
        res.json({
          errorCode: 0,
          data: {},
          message: "Email evalid",
        });
      }
    } catch (error) {
      res.json({
        errorCode: -1,
        data: {},
        message: "Server or Network Error",
      });
    }
  },
  add: async (req, res) => {
    try {
      const params = req.body;
      if (!(await checkEmail(params.email))) {
        const data = await add(params);
        res.json({
          errorCode: 1,
          data: data,
        });
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
      req.query.dayInStart && (options.dayInStart = req.query.dayInStart);
      req.query.dayInEnd && (options.dayInEnd = req.query.dayInEnd);
      req.query.dayOutStart && (options.dayOutStart = req.query.dayOutStart);
      req.query.dayOutEnd && (options.dayOutEnd = req.query.dayOutEnd);
      req.query.room && (options.room = req.query.room);
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

  getExpired: async (req, res) => {
    try {
      const data = await getExpired();
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
  extend: async (req, res) => {
    try {
      const params = req.body;
      const data = await extend(params);
      res.json({
        errorCode: 1,
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
};
export default People_Controller;
