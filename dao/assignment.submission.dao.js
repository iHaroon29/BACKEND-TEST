const AssignmentSubmission = require("../models/assignment.submissions.model");
const Assignment = require("../models/assignments.model");
const Classroom = require("../models/classrooms.model");
const DaoError = require("../errors/dao.errors").getDAOErrorMessage;
module.exports = {
	createNewAssignmentSubmission(assignmentSubmissionDetails) {
		return new AssignmentSubmission(assignmentSubmissionDetails)
			.save()
			.then((savedDetails) => {
				return savedDetails;
			})
			.catch((e) => {
				throw DaoError(
					"unable to create a new assignment submission",
					503,
					e
				);
			});
	},

	async getAllSubmittedAssignmentsOfClass(classroomId) {
		try {
			const classroom = await Classroom.findById(classroomId);
			if (!classroom) {
				throw new Error("no classroom found");
			}
			const allAssignments = [];
			for (let i in classroom.enrolled_courses) {
				allAssignments.push(
					await this.getSubmittedAssignmentOfACourse(i)
				);
			}
			return allAssignments;
		} catch (e) {
			throw DaoError("unable to get all ");
		}
	},

	async getSubmittedAssignmentOfACourse(courseId) {
		try {
			const allAssignmentsInCourse = JSON.parse(
				JSON.stringify(await Assignment.find({ course_id: courseId }))
			);
			for (let i in allAssignmentsInCourse) {
				allAssignmentsInCourse[i] = await AssignmentSubmission.find({
					assignment_id: allAssignmentsInCourse[i]._id,
				});
				allAssignmentsInCourse[i] = JSON.parse(
					JSON.stringify(allAssignmentsInCourse[i])
				);
			}
			return allAssignmentsInCourse;
		} catch (e) {
			throw DaoError("unable to get all assignment submission of course");
		}
	},
	deleteAssignmentSubmission(assignmentSubmissionId) {
		return AssignmentSubmission.findByIdAndDelete(assignmentSubmissionId)
			.then((deletedAssignmentSubmission) => {
				return deletedAssignmentSubmission;
			})
			.catch((e) => {
				throw DaoError(
					"unable to delete assignment submission",
					503,
					e
				);
			});
	},
};
