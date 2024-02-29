const {parse} = require('csv-parse/sync');
const {stringify} = require('csv-stringify/sync');

function serializeSchedule(schedule) {
    return stringify(schedule, {
        header: true,
        columns: [
            {key: "user", header: "user"},
            {key: "day", header: "day"},
            {key: "start", header: "start"},
            {key: "end", header: "end"},
        ]
    });
}

function serializeIds(ids) {
    return stringify(ids, {
        header: true,
        columns: [
            {key: "id", header: "id"},
            {key: "name", header: "name"},
            {key: "userid", header: "userid"},
        ]
    });
}

function parseCsv(text) {
    return parse(text, {
        columns: true,
        skip_empty_lines: true
    });
}

module.exports = {
    serializeSchedule,
    serializeIds,
    parseCsv,
}