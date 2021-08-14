const ejs = require("ejs");
const fs = require("fs");

const files = ["ac", "agreements", "contacts_santo_tirso", "contacts", "ds", "gallery", "galleryST", "gv", "index", "lc", "mb", "mca", "privacy", "specialties"];
const titles = ["Dra. Ana Carriço", "Conveções", "Contactos", "Contactos", "Dra. Dília Soares", "Galeria do Porto", "Galeria de S.Tirso", "Dra. Gabriela Vasconcellos", "Início", "Dra. Leonilde Coelho", "Dra. Marta Baltar", "Dra. Manuela Calado Araújo", "Política de Privacidade", "Especialidades"]
const portuguese = JSON.parse(fs.readFileSync("./languages/pt.json", { encoding: 'utf8' }));
const english = JSON.parse(fs.readFileSync("./languages/en.json", { encoding: 'utf8' }));

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

/* files.forEach(name => {
    ejs.renderFile(
        `./ejs/${name}.ejs`,
        {
            title: titles[counter]
        },
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
    counter++;
}); */
