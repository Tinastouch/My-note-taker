const util = require('util');
const fs = require('fs');

const readFileAsync = util.promisify(fs.readFile);

class Store {
    read() {
        return readFileAsync('./db.json', 'utf8');
    }

    getNotes() {
        return this.read().then(notes => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        })
    }
}

module.exports = new Store();