const CourseMaterialService = require("../services/course.material.services");
module.exports = {
  async createCourseMaterial(req, res) {
    try {
      req.body.course_section_id=req.params.courseId;
      const materialDetails = await CourseMaterialService.createCourseMaterial(
          req.body
      );
      return res.status(202).send(materialDetails);
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async getAllCourseMaterial(req, res) {
    try {
      const allCourseMaterials =
          await CourseMaterialService.getAllCourseMaterial();
      return res.status(202).send(allCourseMaterials);
    } catch (e) {
      return res.status(400).send(e);
    }
  },
  async deleteCourseMaterial(req, res) {
    try {
      const deletedMaterial = await CourseMaterialService.deleteCourseMaterial(
          req.params.courseMaterialId
      );
      return res.status(202).send(deletedMaterial);
    } catch (e) {
      return res.status(400).send(e);
    }
  },
  async updateCourseMaterial(req, res) {
    try {
      const deletedMaterial = await CourseMaterialService.updateCourseMaterial(
          req.params.courseMaterialId,
          req.body
      );
      return res.status(202).send(deletedMaterial);
    } catch (e) {
      return res.status(400).send(e);
    }
  },
  async getCourseMaterialByCourseId(req, res) {
    try {
      const courseMaterialDetails = await CourseMaterialService.getCourseMaterialByCourseMaterialId(
          req.params.courseMaterialId
      );
      return res.status(202).send(courseMaterialDetails);
    } catch (e) {
      return res.status(400).send(e);
    }
  },
};
