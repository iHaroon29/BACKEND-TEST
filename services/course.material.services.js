const CourseMaterial = require("../models/course.materials.model");
const materialValidator = require("../validators/course.material.validators");

module.exports = {
  async createCourseMaterial(materialDetails) {
    return materialValidator
      .newCourseMaterial(materialDetails)
      .then(async (validData) => {
        return new CourseMaterial(validData).save();
      });
  },

  async deleteCourseMaterial(materialId) {
    let courseMaterial = await CourseMaterial.findOne({ _id: materialId });
    if (!courseMaterial) throw "Given Id not found";

    const deletedMaterial = await CourseMaterial.findByIdAndDelete(materialId);
    return deletedMaterial;
  },

  getAllCourseMaterial() {
    return CourseMaterial.find().then((courseMaterial) => {
      return courseMaterial;
    });
  },
};
