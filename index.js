
const fs = require('fs')
const axios = require('axios')
const dataToAdd = JSON.parse(fs.readFileSync("staging/data/quangninh/source.json"))
const stations = JSON.parse(fs.readFileSync("staging/data/quangninh/stations.json"))
console.log(dataToAdd.length, '===length')
// const dataToAdd = JSON.parse(fs.readFileSync("./source-demo.json"))
// const stations = JSON.parse(fs.readFileSync("./stations-demo.json"))

/**
 * 
 * CONFIG
 */
const endpoint = "https://ilotusland-api.quantracquangninh.gov.vn/station-fixed/report/"
// const endpoint = "https://demo-api.ilotusland.asia/station-fixed/report/"
const headers = {
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDU5YjFkMGU3MjYyOTAwMWI2ZDFkMGUiLCJmaXJzdE5hbWUiOiJBbmgiLCJsYXN0TmFtZSI6IlZ1IiwiaXNBZG1pbiI6dHJ1ZSwiaXNBY3RpdmUiOmZhbHNlLCJpc093bmVyIjp0cnVlLCJvcmdhbml6YXRpb24iOnsiX2lkIjoiNWM5ODc5YzM5MTM0YTcwMDEwNjQ5NjgxIiwibmFtZSI6IlPhu58gVE5NVCBRdeG6o25nIE5pbmgifSwiaWF0IjoxNjg5MjIwNzYzfQ.j4EPrmR3ezzAgiyu8cKUg7NM8ab-kXeUwMxEWjxhuvQ', // Replace with your authorization token
    'Content-Type': 'application/json', // Example content type
};



// const allmeaInData = Object.keys(sampleData)
// const getMeasFromStations = stations => {

//     let allMeaList = []
//     stations.forEach(item => {
//         allMeaList = [...allMeaList, ...item.measuringList]
//     })
//     // console.log(allMeaList.length, 'allMeaListallMeaListallMeaList')
//     const rawResults = allMeaList.map(mea => {
//         return mea.key

//     })

//     const result = rawResults.filter((item, index, self) => self.indexOf(item) === index);
//     return result

// }

// const allMeaInStations = getMeasFromStations(stations)
// console.log(allMeaInStations, 'allMeaInStationsallMeaInStations')
// fs.writeFileSync("result.json", JSON.stringify({ allmeaInData, allMeaInStations }))




const addOneStation = payload => {
    axios
        .post(endpoint, payload, { headers })
        .then(response => {
            console.log(`Tạo dữ liệu thành công ${payload.name} successful:`);
        })
        .catch(error => {
            console.error(`Request ${payload.name} failed:`, error.message);
        });
    // console.log(`added ${JSON.stringify(payload)}`)
}

const addData = (data) => {
    data.forEach(item => {
        // console.log(item.stationKey, 'item.stationKeyitem.stationKey')
        const stationInfo = findStationByKey(getStationKey(item.stationKey))
        if (stationInfo === undefined) return
        // console.log(stationInfo, 'stationInfostationInfo')
        const meaLogs = generateMeaLog(item)
        const payload = {
            "stationId": stationInfo._id,
            "datetime": "2023-09-11T13:01:00.521Z",
            "name": `Báo cáo trạm ${stationInfo.name}`,
            "measuringLogs": meaLogs,
            "type": "manual"
        }
        addOneStation(payload)
    })
}

// addData(dataToAdd)