const DashboardServices = require("../services/dashboard.service");
module.exports = {
  async getDashboardData(req, res) {
    try {
      const dashboardData = await DashboardServices.getDashboardData();
      return res.status(202).send(dashboardData);
    } catch (e) {
      res.status(400).send(e);
    }
  },
};
