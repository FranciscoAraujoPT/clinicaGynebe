const ejs = require("ejs");
const fs = require("fs");

const files = ["ac", "agreements", "contacts_santo_tirso", "contacts", "ds", "gallery", "galleryST", "gv", "index", "lc", "mb", "mca", "privacy", "specialties"];
const titles = ["Dra. Ana Carriço", "Conveções", "Contactos", "Contactos", "Dra. Dília Soares", "Galeria do Porto", "Galeria de S.Tirso", "Dra. Gabriela Vasconcellos", "Início", "Dra. Leonilde Coelho", "Dra. Marta Baltar", "Dra. Manuela Calado Araújo", "Política de Privacidade", "Especialidades"]
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
