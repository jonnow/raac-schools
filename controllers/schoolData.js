const fs = require('fs')
const data = require('./../public/data/raac_data.json')

const GetSchoolCoords = async () => {
    try {
        return data
        
    } catch (error) {
        console.error(`Error in getting schools coords ${error}`)
    }
    
}

module.exports = {GetSchoolCoords}