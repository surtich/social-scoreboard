var fileComposer = require('file-composer');

fileComposer.render({
    i: './server/api/apiary/pre.apiary.apib',
    o: './server/api/apiary/apiary.apib',
    b: './server/api/apiary'
});