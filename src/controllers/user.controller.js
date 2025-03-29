const {userService} = require("../services");

const resign = async (req, res) => {
    try {
        const result = await userService.resign(req);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({"message": error.message});
    }    
};


const responses = async (req, res) => {
    try {
        await userService.responses(req);
        res.status(200).send();
    } catch (error) {
        res.status(500).send({"message": error.message});
    }    
};


module.exports = {resign, responses};