import { getMainRole, getSubRole } from "../services/keyword_Services";

const KeyWord_Controller = {
  getMainRole: async (req, res) => {
    try {
      const data = await getMainRole();
      if (data) {
        res.json({
          errorCode: 1,
          data: data,
        });
      } else
        res.json({
          errorCode: 0,
          data: {},
          message: "Main role null",
        });
    } catch (error) {
      res.json({
        errorCode: -1,
        data: {},
        message: "Error on getMainRole from controller",
      });
    }
  },

  getSubRole: async (req, res) => {
    try {
      const data = await getSubRole();
      if (data) {
        res.json({
          errorCode: 1,
          data: data,
        });
      } else
        res.json({
          errorCode: 0,
          data: {},
          message: "Sub role null",
        });
    } catch (error) {
      res.json({
        errorCode: -1,
        data: {},
        message: "Error on getSubRole from controller",
      });
    }
  },
};
export default KeyWord_Controller;
