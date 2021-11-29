const ejs = require("ejs");
const fs = require("fs");

const files = ["ac", "agreements", "contacts_santo_tirso", "contacts", "ds", "gallery", "galleryST", "gv", "index", "lc", "mb", "mca", "privacy", "specialties"];
const portuguese = JSON.parse(fs.readFileSync("./languages/pt.json", { encoding: 'utf8' }));
const english = JSON.parse(fs.readFileSync("./languages/en.json", { encoding: 'utf8' }));
const spanish = JSON.parse(fs.readFileSync("./languages/es.json", { encoding: 'utf8' }));

fs.rmSync("./html", { recursive: true });
fs.mkdirSync("./html", { recursive: true })
fs.mkdirSync("./html/en", { recursive: true })
fs.mkdirSync("./html/es", { recursive: true })

files.forEach(name => {
    ejs.renderFile(
        `./ejs/${name}.ejs`,
        portuguese
        ,
        (err, html) => {
            if (err !== null) {
                console.log(err);
            }
            fs.writeFile(`./html/${name}.html`, html, (err) => {
                if (err !== null) {
                    console.log(err);
                }
            })
        }
    )
});

files.forEach(name => {
    ejs.renderFile(
        `./ejs/${name}.ejs`,
        english
        ,
        (err, html) => {
            if (err !== null) {
                console.log(err);
            }
            fs.writeFile(`./html/en/${name}.html`, html, (err) => {
                if (err !== null) {
                    console.log(err);
                }
            })
        }
    )
});

files.forEach(name => {
    ejs.renderFile(
        `./ejs/${name}.ejs`,
        spanish
        ,
        (err, html) => {
            if (err !== null) {
                console.log(err);
            }
            fs.writeFile(`./html/es/${name}.html`, html, (err) => {
                if (err !== null) {
                    console.log(err);
                }
            })
        }
    )
});