const router=require('express').Router();

const AssignmentSubmission  = require('../../models/mongodb/assignmentSubmissions');

router.get('/',async (req,res) => {
    const submitted = await AssignmentSubmission.find() ;
    res.send(submitted);
});

router.get('/:id',async (req,res) => {
    const assignment = await AssignmentSubmission.findOne({ where: { id: req.params.id } });
    if(!assignment) return res.status(400).send('Invalid Assignment submission');

    res.send(assignment);
});

router.post('/',async (req,res) => {

});

module.exports=router;