const CourseSection=require("../models/course.sections.model");
const CourseSectionValidator=require("../utils/CourseSection.validators");
module.exports={
    addNewCourseSection(courseId,courseSectionDetails){
        courseSectionDetails.course_id=courseId;
        return CourseSectionValidator.addNewCourseSection(courseSectionDetails)
            .then((validData)=>{
                return new CourseSection(validData).save().then(savedCourseSection=>{
                    return savedCourseSection;
                })
            })
    },

    deleteCourseSection(courseSectionId,courseSectionDetails){
        return CourseSectionValidator.deleteCourseSection(courseSectionDetails)
            .then((validData)=>{
                return CourseSection.findByIdAndDelete(courseSectionId,validData).then(savedCourseSection=>{
                    return savedCourseSection;
                })
            })
    },

    updateCourseSection(courseSectionId,courseSectionDetails){
        return CourseSectionValidator.updateCourseSection(courseSectionDetails)
            .then((validData)=>{
                return CourseSection.findByIdAndUpdate(courseSectionId,validData).then(savedCourseSection=>{
                    if(!savedCourseSection)
                        throw new Error("No course Section found with specified course id ");
                    return savedCourseSection;
                })
            })
    },

    getAllCourseSectionByCourseId(classroomId){
        return CourseSection.find({"classroom_id":classroomId})
            .then(courses=>{
                return courses;
            })
    },

    getCourseSectionDetails(courseSectionId){
        return CourseSection.findById(courseSectionId)
            .then(courseDetails=>{
                return courseDetails;
            })
    },
    getAllCourseSections(){
        return CourseSection.find()
            .then(courses=>{
                return courses;
            })
    }
};