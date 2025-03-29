const {User, Resignation} = require("../models");
const checkIfHoliday = require("./holiday.service");
const moment = require("moment");

const register = async (req) => {
  const user = await User.findOne({username: req.body.username});
  if(user || req.body.username === "admin")
    throw new Error('Username already Exists');
  else
    return await User.create({...req.body, role: "Employee"});    
}

const resign = async (req) => {
  console.log(req.user);
  const user = await User.findById(req.user._id);
  const {lwd, reason} = req.body; 
 
  const lastWorkingDay = moment(lwd, "YYYY-MM-DD");
  const dayOfWeek = lastWorkingDay.isoWeekday();
  if (dayOfWeek === 6 || dayOfWeek === 7) 
    throw new Error(`Last working day cannot be on a weekend`);
  
  const isHoliday = await checkIfHoliday(lastWorkingDay); 
  if (isHoliday) 
    throw new Error(`Last working day cannot be a holiday in India`);
  
  try {
      const resignCreate = await Resignation.create({employeeId: user._id, lwd, reason});
      return {
          "data": {
            "resignation": {
              "_id": resignCreate._id
            }
          }
        };      
  } catch (error) {
      throw new Error(`Resignation Submission Failed: ${error.message}`);
  }  
};

const responses = async (req) => {
  const resignation = await Resignation.findOne({employeeId: req.user._id});
  if(!resignation)
    throw new Error('Resignation not found');
  
  const {responses} = req.body;
  resignation.responses = responses;
  await resignation.save();
  return true;
};

module.exports = {register, resign, responses};