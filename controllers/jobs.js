const { Job} = require('../models/Job');
const {StatusCodes} = require("http-status-codes")
const { BadRequestError, UnauthenticatedError, NotFoundError} = require("../errors/index")
require("express-async-errors");
let getAllJobs = async (req, res, next) => {
    let getAllJobs = await Job.find({ createdBy: req.user._id}).sort("createdBy")
    res.status(StatusCodes.OK).json({ totalJobs: getAllJobs.length, getAllJobs});
}

let getJob = async (req, res, next) => {
    let getJob = await Job.findOne({ createdBy : req.user._id, _id: req.params.id});
    if(!getJob){
        // throw new NotFoundError("Job Id not Found");
        throw new Error("Job Id not Found");
    }
    res.status(StatusCodes.OK).json(getJob);
}

let createJob = async (req, res, next) => {
        req.body.createdBy = req.user._id;
        console.log(req.body)
        let job = await Job.create(req.body);
        res.status(StatusCodes.CREATED).json(job);
}

let updateJob = async (req, res, next) => {
    let updateJob = await Job.findOneAndUpdate({ createdBy: req.user._id, _id: req.params.id}, req.body, {
        new : true,
        runValidators: true
    })
    if(!updateJob){
        throw new NotFoundError(" Job id not Found for the user")
    }
    res.status(StatusCodes.OK).json(updateJob);
}

let deleteJob = async (req, res, next) => {
    let deleteJob = await Job.deleteOne({ createdBy: req.user._id, _id: req.params.id});
    if(deleteJob.deletedCount === 0){
        throw new NotFoundError("Job Id not found for the user")
    }
    res.status(StatusCodes.OK).json(deleteJob);
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}