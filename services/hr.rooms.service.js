const HrRooms=require("../models/hr.rooms.model");
module.exports={
    getAllRoomInWhichAddedAsMember(hr_room_member_ids){
        return HrRooms.find({hr_room_members:data.hr_id});
    }
};