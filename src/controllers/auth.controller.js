const {authService, userService, tokenService} = require("../services"); 

const register = async (req, res) => {
    try {
        await userService.register(req);
        res.status(201).send({"message": "User registered successfully"});
    } catch (error) { 
        res.status(500).send({"message": error.message});
    }    
};

const login = async (req, res) => {
    const {username, password} = req.body;

    if(username =="" || password =="")
        res.status(500).send({"message": "Invalid Request"});
    else{
        try {
            const user = await authService.login(username, password);
            const token = await tokenService.generateAuthTokens(user);
            res.status(200).send(token);
        } catch (error) { 
            res.status(500).send({"message": error.message});
        }    
    }
};

module.exports = {register, login};