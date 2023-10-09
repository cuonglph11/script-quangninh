const fs = require('fs')
const { getAllStationsFromQN, createOneStation, getImportedDataByMe, deleteImportedData, addOneStation } = require("./api")
const { splitArrayIntoChunks, findStationByKey, getStationKey, generateMeaLog, convertData, transformReceivedAt } = require("./utils")

const dataToAdd = JSON.parse(fs.readFileSync("./data/quangninh/data-new.json"))
// const dataToAdd = JSON.parse(fs.readFileSync("./data/quangninh/source.json"))


/**
 * UNUSED_FUNCTIONS
 */
const cloneDataToDemo = () => {
}
const createStationsOnDemo = async () => {
    const stations = await getAllStationsFromQN()
    stations.forEach(item => {
        createOneStation(item)
    })
}

/**
 * USED FUNCTIONS
 */
const deleteTrash = async () => {
    const myImportedData = await getImportedDataByMe()

    const ids = myImportedData.map(item => item._id)
    const chunks = splitArrayIntoChunks(ids, 20)
    chunks.forEach(chunkIds => {
        deleteImportedData(chunkIds)
    })

    // console.log(myImportedData.length)
}


/**
 * UNIT TESTS
 */
function hasDuplicates(array, fieldToCheck) {
    const valuesSoFar = new Set();

    for (const obj of array) {
        const fieldValue = obj[fieldToCheck];

        if (fieldValue !== undefined && valuesSoFar.has(fieldValue)) {
            return true;
        }

        valuesSoFar.add(fieldValue);
    }

    return false;
}

/**
 * DEBUG
 */

const get458Data = ()=>{
    const result = dataToAdd.filter(d=>d.collectionName==="data-station-fixed-nn_nuocsachqn_458")
    fs.writeFileSync("data458.json",JSON.stringify(result))
}




/**
 * TO BE USED
 */

const addData = async (data) => {
    // console.log("Start convert")
    const updatedData = convertData(data)
    // console.log(updatedData,'updatedDataupdatedData');
    // const data458 = updatedData.filter(d=>d.stationId==="5f504df6beee1b001220b6d2")
    // fs.writeFileSync("debug.json",JSON.stringify(data458))
    // console.log("Convert done")
    // fs.writeFileSync("output.json",JSON.stringify(updatedData))
    // console.log(updatedData[700])

    // Now, updatedData contains the original items with the "datetime" property added
    // You can use updatedData as needed
    for (const payload of updatedData) {
        await new Promise(resolve => setTimeout(resolve, 500)); // 1000 milliseconds (1 second) delay
        addOneStation(payload);
    }
};

addData(dataToAdd);
// deleteTrash()




