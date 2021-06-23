const ejs = require("ejs");
const fs = require("fs");

const files = ["agreements", "contacts_santo_tirso", "contacts", "gallery", "galleryST", "index", "privacy", "specialties"];
const titles = ["Conveções", "Contactos", "Contactos", "Galeria do Porto", "Galeria de S.Tirso", "Início", "Política de Privacidade", "Especialidades"]
let counter = 0;

files.forEach(name => {
    ejs.renderFile(
        `./ejs/${name}.ejs`,
        {
            title: titles[counter]
        },
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
    counter++;
});
