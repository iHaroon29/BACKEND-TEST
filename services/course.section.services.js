const CourseSection = require("../models/course.sections.model");
const CourseSectionValidator = require("../validators/CourseSection.validators");
module.exports = {
  addNewCourseSection(courseId, courseSectionDetails) {
    courseSectionDetails.course_id = courseId;
    return CourseSectionValidator.addNewCourseSection(
      courseSectionDetails
    ).then((validData) => {
      return new CourseSection(validData).save().then((savedCourseSection) => {
        return savedCourseSection;
      });
    });
  },

  deleteCourseSection(courseSectionId, courseSectionDetails) {
    return CourseSectionValidator.deleteCourseSection(
      courseSectionDetails
    ).then((validData) => {
      return CourseSection.findByIdAndDelete(courseSectionId, validData).then(
        (savedCourseSection) => {
          return savedCourseSection;
        }
      );
    });
  },

  updateCourseSection(courseSectionId, courseSectionDetails) {
    return new Promise((resolve, reject) => {
      CourseSectionValidator.updateCourseSection(courseSectionDetails).then(
        (validData) => {
          return CourseSection.findByIdAndUpdate(courseSectionId, validData)
            .then((savedCourseSection) => {
              if (!savedCourseSection)
                throw new Error(
                  "No course Section found with specified course id "
                );
              return savedCourseSection;
            })
            .catch((e) => {
              reject({
                message: "unable to get course",
                statusCode: 503,
                trace: e,
              });
            });
        }
      );
    });
  },

  getAllCourseSectionByCourseId(courseId) {
    return new Promise((resolve, reject) => {
      CourseSection.find({ course_id: courseId })
        .then((coursesSection) => {
          return resolve(coursesSection);
        })
        .catch((e) => {
          reject({
            message: "unable to find course sections",
            statusCode: 503,
            trace: e,
          });
        });
    });
  },

  getCourseSectionDetails(courseSectionId) {
    return CourseSection.findById(courseSectionId).then((courseDetails) => {
      return courseDetails;
    });
  },
  getAllCourseSections() {
    return CourseSection.find().then((courses) => {
      return courses;
    });
  },
};
