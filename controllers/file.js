const { File } = require('../models/file');

module.exports = {

    upload: (async (req, res) => {
        const tempFiles = req.files.map(e => {
            e.path = 'public/' + e.filename;
            return e
        });
        const files = await File.insertMany(tempFiles);
        res.send(files);

    }),
}
