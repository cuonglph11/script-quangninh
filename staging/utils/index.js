const axios = require('axios')
const fs = require('fs')
const stations = JSON.parse(fs.readFileSync("./data/quangninh/stations.json"))


/**
 * CONFIG
 */
const TOKEN = {
    TOKEN_DEMO: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE5MGI3ZWZjMzgzMDAwMWJmMTAxNWUiLCJmaXJzdE5hbWUiOiJNaW5oIiwibGFzdE5hbWUiOiLEkOG7lyIsImlzQWRtaW4iOnRydWUsImlzQWN0aXZlIjpmYWxzZSwiaXNPd25lciI6dHJ1ZSwib3JnYW5pemF0aW9uIjp7Il9pZCI6IjVlZWY4MDExOWQ0ZjQ1MDAxMWMzMGQ1OSIsIm5hbWUiOiJpTG90dXNMYW5kIFZpZXQgTmFtIEpTQy4ifSwiaWF0IjoxNjkzMzAwMDA0fQ.mfTmrw4Cro1RxPxt2APciLVQdJxwYViMQfTlFaN4Y28",
    TOKEN_QUANGNINH: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDU5YjFkMGU3MjYyOTAwMWI2ZDFkMGUiLCJmaXJzdE5hbWUiOiJBbmgiLCJsYXN0TmFtZSI6IlZ1IiwiaXNBZG1pbiI6dHJ1ZSwiaXNBY3RpdmUiOmZhbHNlLCJpc093bmVyIjp0cnVlLCJvcmdhbml6YXRpb24iOnsiX2lkIjoiNWM5ODc5YzM5MTM0YTcwMDEwNjQ5NjgxIiwibmFtZSI6IlPhu58gVE5NVCBRdeG6o25nIE5pbmgifSwiaWF0IjoxNjg5MjIwNzYzfQ.j4EPrmR3ezzAgiyu8cKUg7NM8ab-kXeUwMxEWjxhuvQ"
}

const headers = {
    HEADERS_QUANGNINH: {
        'Authorization': TOKEN.TOKEN_QUANGNINH,
        'Content-Type': 'application/json', // Example content type
    },
    HEADERS_DEMO: {
        'Authorization': TOKEN.TOKEN_DEMO,
        'Content-Type': 'application/json', // Example content type
    }
}

const postFetchDemo = async (endpoint, payload) => {
    try {
        const result = await axios.post(endpoint, payload, { headers: headers.HEADERS_DEMO })
        return result
    } catch (error) {
        console.error(`Request failed:`, error.message);
    }
}

const getFetchDemo = async (endpoint) => {
    try {
        const result = await axios.get(endpoint, { headers: headers.HEADERS_DEMO })
        return result
    } catch (error) {
        console.error(`Request failed:`, error.message);
    }
}

const postFetchQuangNinh = async (endpoint, payload) => {
    try {
        const result = await axios.post(endpoint, payload, { headers: headers.HEADERS_QUANGNINH })
        return result
    } catch (error) {
        // console.log(error.response.status)
        if(error.response.status ==422){
            console.error(`Request failed:`, { payload, error: error.response.data.error.details });
        }
    }
}

const getFetchQuangNinh = async (endpoint) => {
    try {
        const result = await axios.get(endpoint, { headers: headers.HEADERS_QUANGNINH })
        return result
    } catch (error) {
        console.error(`Request failed:`, error.message);
    }
}
const delFetchDemo = async endpoint => {
    try {
        const result = await axios.delete(endpoint, { headers: headers.HEADERS_DEMO })
        return result
    } catch (error) {
        console.error(`Err Request failed:`, error);
    }
}
const delFetchQuangNinh = async endpoint => {
    try {
        const result = await axios.delete(endpoint, { headers: headers.HEADERS_QUANGNINH })
        return result
    } catch (error) {
        console.error(`Request failed:`, error.message);
    }
}

function splitArrayIntoChunks(array, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        chunkedArray.push(chunk);
    }
    return chunkedArray;
}

const findStationByKey = key => {
    const result = stations.find(item => {
        return item.key.toUpperCase() === key.toUpperCase()
    })

    return result
}
function getStationKey(input) {
    // Use a regular expression to match and extract the desired substring
    const match = input.match(/data-station-fixed-(.*)/);

    // Check if a match was found
    if (match && match.length > 1) {
        // Return the captured group (the desired substring)
        return match[1];
    } else {
        // Return an empty string or handle the case where no match is found
        return '';
    }
}
const generateMeaLog = objSource => {
    const rawMeaLogs = Object.assign({}, objSource.measuringLogs)

    const result = {}
    for (const key in rawMeaLogs) {
        const valueObj = rawMeaLogs[key]
        result[key] = {
            key: key,
            value: valueObj.value
        }
    }
    // console.log({rawMeaLogs,objSource,result})
    return result
    // const clonedObj = { ...objSource }
    // delete clonedObj["stationKey"]
    // const result = {}
    // Object.keys(clonedObj)
    //     .filter(mea => clonedObj[mea] !== "")
    //     .map(mea => (mea === "E.Coli" ? "Ecoli" : mea))
    //     .forEach(mea => {
    //         result[mea] = {
    //             "key": mea,
    //             "value": clonedObj[mea]
    //         }
    //     })
    // return result
}

const generateUniqueDatetime = existingArray => {

    // Base datetime value
    const baseDatetime = new Date('2023-09-11T13:00:00.521Z');

    // Use the map method to add "datetime" to each item
    const arrayWithDatetime = existingArray.map((item, index) => {
        // Create a new Date object by adding index minutes to the base datetime
        const newDatetime = new Date(baseDatetime);
        newDatetime.setMinutes(baseDatetime.getMinutes() + index);

        // Format the new datetime as a string
        const formattedDatetime = newDatetime.toISOString();

        // Add the "datetime" property to the item
        return {
            ...item,
            datetime: formattedDatetime,
        };
    });

    return arrayWithDatetime

}
const formatDate = (inputDate) => new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
}).format(new Date(inputDate)).replace(',', '');

const convertData = data => {
    const uniqueData = transformReceivedAt(data)
    const updatedData = uniqueData.map((item, index) => {
        const stationInfo = findStationByKey(getStationKey(item.collectionName));
        if (stationInfo === undefined) return item;

        const meaLogs = generateMeaLog(item);
        // console.log(item)
        // Create and return the updated payload with the "datetime" property
        return {
            // ...item,
            stationId: stationInfo._id,
            datetime: item.receivedAt,
            name: `${stationInfo.name} ${formatDate(item.receivedAt)}`,
            measuringLogs: meaLogs, // UPDATE
            type: "manual",
        };
    });
    return updatedData
}
function transformReceivedAt(data) {
    const transformedData = [];
    const transformedValues = new Set();

    for (const obj of data) {
        let receivedAt = obj.receivedAt;
        // console.log(receivedAt,'receivedAtreceivedAt')
        let key = receivedAt.toString().slice(0, 16); // Extract the date and time up to minutes

        let counter = 1;
        while (transformedValues.has(key)) {
            const date = new Date(receivedAt);
            date.setMinutes(date.getMinutes() + counter);
            receivedAt = date;
            counter++;
            key = receivedAt.toString().slice(0, 16); // Update the key
        }

        transformedValues.add(key);

        transformedData.push({
            ...obj,
            receivedAt
        });
    }

    return transformedData;
}







module.exports = {
    getFetchDemo,
    getFetchQuangNinh,
    postFetchDemo,
    postFetchQuangNinh,
    delFetchDemo,
    delFetchQuangNinh,
    splitArrayIntoChunks,
    findStationByKey,
    getStationKey,
    generateMeaLog,
    generateUniqueDatetime,
    convertData,
    transformReceivedAt
}