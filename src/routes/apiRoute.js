import express from "express";
import multer from "multer";
import PSController from "../controllers/people_salary_Controller";
import PeopleController from "../controllers/people_Controller";
import SalaryController from "../controllers/salary_Controller";
import KeyWord_Controller from "../controllers/keyword_Controller";
import Daycheck_Controller from "../controllers/daycheck_Controller";
const router = express.Router();
const upload = multer();

router.post("/ps/add", PSController.add);
router.put("/ps/edit/:id", PSController.edit);
router.delete("/ps/del/:id", PSController.del);
router.get("/ps/:id", PSController.get);
router.get("/ps/", PSController.getAll);

router.post("/p/add", PeopleController.add);
router.post("/p/login", PeopleController.login);
router.put("/p/edit/:id", PeopleController.edit);
router.delete("/p/del/:id", PeopleController.del);
router.get("/p/expired", PeopleController.getExpired);
router.get("/p/:id", PeopleController.get);
router.get("/p/", PeopleController.getAll);

router.post("/s/add", SalaryController.add);
router.put("/s/edit/:id", SalaryController.edit);
router.delete("/s/del/:id", SalaryController.del);
router.get("/s/:id", SalaryController.get);
router.get("/s/", SalaryController.getAll);

router.post("/daycheck", upload.none(), Daycheck_Controller.daycheck);
router.post("/daycheck/:id", Daycheck_Controller.daycheckOne);

router.get("/daycheck", Daycheck_Controller.getDayCheck);
router.get("/daycheck/:id", Daycheck_Controller.getDayCheckOne);

router.post("/login", PeopleController.login);
router.put("/changepass", PeopleController.changepass);
router.put("/extend", PeopleController.extend);

router.get("/keyword", (req, res) => res.send("go this route"));
router.get("/keyword/mainrole", KeyWord_Controller.getMainRole);
router.get("/keyword/subrole", KeyWord_Controller.getSubRole);

let initRoute = (app) => {
  return app.use("/api/v1", router);
};
module.exports = initRoute;
