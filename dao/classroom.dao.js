const Classroom = require("../models/classrooms.model");
const DaoError = require("../errors/dao.errors").getDAOErrorMessage;
const Lectures = require("../models/lectures.model");

module.exports = {
	async getClassroomByStudentId(studentId) {
		const filter = {};
		filter["enrolled_students." + studentId] = {
			$exists: true,
		};
		try{
			const allClassrooms=await Classroom.find(filter);
			for(let i in allClassrooms){
				allClassrooms[i]=await this.getClassRoomDetailsByClassroomId(allClassrooms[i]._id);
			}
			return allClassrooms;
		} catch(err) {

		}
	},
	async getClassroomByTeacherId(teacherId) {
		try {
			let filter = {};
			filter["teachers." + teacherId] = {
				$exists: true,
			};
			allClassrooms=await Classroom.find(filter);
			for(let i in allClassrooms){
				allClassrooms[i]=await this.getClassRoomDetailsByClassroomId(allClassrooms[i]._id);
			}
			return allClassrooms;
		} catch (e) {}
	},

	getClassroomDetailsByClassromId(classroomId) {
		return new Promise((resolve, reject) => {
			Classroom.findById(classroomId)
				.then((classroomDetails) => {
					if (!classroomDetails) {
						reject(
							DaoError(err.message || "no classroom found", 400)
						);
					}
					resolve(classroomDetails);
				})
				.catch((error) => {
					reject(
						DaoError(err.message || "no classroom found", 503, err)
					);
				});
		});
	},
	async getClassRoomDetailsByClassroomId(classroomId){
		try{
			let classroomDetails=JSON.parse(JSON.stringify(await Classroom.findById(classroomId)));
			if(!classroomDetails){
				return [];
			}
			classroomDetails.lectures=await Lectures.find({classroom_id:classroomId});
			return classroomDetails;
		}catch (e) {
			throw DaoError(e.message||"unable to get classroom details",e.statusCode||503,e)
		}
	},
	async getAllClassroomDetails(){
		try{
			let allClassrooms=await Classroom.find();
			allClassrooms=JSON.parse(JSON.stringify(allClassrooms));
			for(let i in allClassrooms){
				allClassrooms[i]=await this.getClassRoomDetailsByClassroomId(allClassrooms[i]._id);
			}
			return  allClassrooms;
		}catch (e) {
			throw DaoError("unable to find all classrooms ",503,e)
		}
	},
	async createNewClassroom(classroomDetails){
		try {
			return await new Classroom(classroomDetails).save()
		}catch (e) {
			throw DaoError("unable to create classroom",503,e)
		}
	}
};
