import bd from "../models";
import {
  daycheck,
  daycheckOne,
  getDayCheck,
  getDayCheckOne,
} from "../services/daycheck_Services";

const Daycheck_Controller = {
  getDayCheck: async (req, res) => {
    try {
      const params = req.query;
      const data = await getDayCheck(params);
      if (data) {
        res.json({
          errorCode: 1,
          data: data,
          message: "Get daycheck successfully",
        });
      } else
        res.json({
          errorCode: 0,
          data: {},
          message: "No data found",
        });
    } catch (error) {
      console.log(error);
      res.json({
        errorCode: -1,
        data: {},
        message: "Failed to get daycheck from server",
      });
    }
  },

  getDayCheckOne: async (req, res) => {
    try {
      const params = req.query;
      params.id = req.params.id;
      const data = await getDayCheckOne(params);
      if (data) {
        res.json({
          errorCode: 1,
          data: data,
          message: "Get daycheck successfully",
        });
      } else
        res.json({
          errorCode: 0,
          data: {},
          message: "No data found",
        });
    } catch (error) {
      console.log(error);
      res.json({
        errorCode: -1,
        data: {},
        message: "Failed to get daycheck from server",
      });
    }
  },
  daycheck: async (req, res) => {
    try {
      const data = await daycheck(req.body);
      if (data)
        return res.json({
          errorCode: 1,
          message: "Day check successfully",
        });
      else
        return res.json({
          errorCode: 0,
          message: "Some thing wrong in services",
        });
    } catch (error) {
      return res.json({
        errorCode: 1,
        message: "Some thing wrong in servers",
      });
    }
  },
  daycheckOne: async (req, res) => {
    try {
      const params = req.body;
      params.id = req.params.id;
      const data = await daycheckOne(params);
      if (data)
        res.json({
          errorCode: 1,
          message: "Day check successfully",
        });
      else
        res.json({
          errorCode: 0,
          message: "Failed from services",
        });
    } catch (error) {
      res.json({
        errorCode: -1,
        message: "Failed from server",
      });
    }
  },
};
export default Daycheck_Controller;
