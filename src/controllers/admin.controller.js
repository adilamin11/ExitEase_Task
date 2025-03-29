const {adminService} = require("../services");

const getResignations = async (req, res) => { 
    try {
        const resignations = await adminService.getResignations();
        res.status(200).send(resignations);
    } catch (error) {
        res.status(500).send({"message": error.message});
    } 
};

const concludeResignation =  async (req, res) => { 
    try {
        await adminService.concludeResignation(req);
        res.status(200).send();
    } catch (error) {
        res.status(500).send({"message": error.message});
    }
};

const getExitresponses = async (req, res) => { 
    try {
        const exitResponses = await adminService.getExitresponses();
        res.status(200).send(exitResponses);
    } catch (error) {
        res.status(500).send({"message": error.message});
    } 
};

module.exports = { getResignations, concludeResignation, getExitresponses };