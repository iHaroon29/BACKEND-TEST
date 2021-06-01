const CourseSection=require("../../models/mongodb/courseSections");
const CourseSectionValidator=require("../../utils/CourseSection.validators");
module.exports={
    addNewCourseSection(courseSectionDetails){
        return CourseSectionValidator.addNewCourseSection(courseSectionDetails)
            .then((validData)=>{
                return new CourseSection(validData).save(savedCourseSection=>{
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
                    return savedCourseSection;
                })
            })
    },
};