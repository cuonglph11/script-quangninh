const fs = require('fs')
const { getAllStationsFromQN, createOneStation, getImportedDataByMe, deleteImportedData, addOneStation } = require("./api")
const { splitArrayIntoChunks, findStationByKey, getStationKey, generateMeaLog } = require("./utils")

const dataToAdd = JSON.parse(fs.readFileSync("./data/quangninh/source.json"))


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
 * TO BE USED
 */

const addData = async (data) => {
    // Base datetime value
    const baseDatetime = new Date('2023-09-11T13:00:00.521Z');

    // Use the map method to transform the data array
    const updatedData = data.map((item, index) => {
        const stationInfo = findStationByKey(getStationKey(item.stationKey));
        if (stationInfo === undefined) return item;

        const meaLogs = generateMeaLog(item);

        // Create a new Date object by adding index minutes to the base datetime
        const newDatetime = new Date(baseDatetime);
        newDatetime.setMinutes(baseDatetime.getMinutes() + index);

        // Format the new datetime as a string
        const formattedDatetime = newDatetime.toISOString();

        // Create and return the updated payload with the "datetime" property
        return {
            // ...item,
            stationId: stationInfo._id,
            datetime: formattedDatetime,
            name: `Báo cáo trạm ${stationInfo.name}`,
            measuringLogs: meaLogs,
            type: "manual",
        };
    });

    // Now, updatedData contains the original items with the "datetime" property added
    // You can use updatedData as needed
    for (const payload of updatedData) {
        await new Promise(resolve => setTimeout(resolve, 500)); // 1000 milliseconds (1 second) delay
        addOneStation(payload);
    }
};

addData(dataToAdd);
// deleteTrash()
