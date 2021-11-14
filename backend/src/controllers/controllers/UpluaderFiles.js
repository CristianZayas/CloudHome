const path = require("path");
const fs = require("fs-extra");
const pathFather = path.join(__dirname, "../../upluaders/");

const HomePath = async (req, res) => {
  res.send("Send messages Zayas Cristian");
};

const CreateFolder = async (req, res) => {
  const { nameFolder } = req.body;
  console.log(req.body);
  const result = fs.mkdirsSync(`${pathFather}/${nameFolder}`);
  if (result == undefined) return res.json("Ya existe la carpeta");
  const full = await fs.readdirSync(`${pathFather}`);
  if (String(full) == []) return res.json(false);
  res.json({ true: full });
};
const CreateSubFolder = async (req, res) => {
  const { namesubfolder, rutaPath } = req.body;
  const rutafinish = `${pathFather}/${rutaPath}`;
  const result = fs.mkdirsSync(`${rutafinish}/${namesubfolder}`, {
    recursive: true,
  });
  if (result == undefined) return res.json("Ya existe la carpeta");
  const full = await fs.readdirSync(rutafinish);
  const dateJSON = {
    rutafinish,
    true: full,
  };
  res.json(dateJSON);
};

const UploadFiles = async (req, res) => {
  const { rutaPath } = req.body;
  try {
    const verify = fs.existsSync(`${pathFather}/${rutaPath}`);
    if (!verify) {
      if (!rutaPath == "") {
        await fs.mkdirsSync(`${pathFather}/${rutaPath}`);
        const rutafinish = `${pathFather}/${rutaPath}`;
        req.files.map(async (i) => {
          // console.log(i.path.substr(72, 41))
          fs.moveSync(`${i.path}`, `${rutafinish}/${i.path.substr(72, 41)}`, {
            overwrite: true,
          });
        });
        const full = await fs.readdirSync(rutafinish);
        return res.json({ full });
      }
    } else {
      if (!rutaPath == "") {
        console.log(rutaPath);
        const rutafinish = `${pathFather}/${rutaPath}`;
        req.files.map(async (i) => {
          // console.log(i.path.substr(72, 41))
          fs.moveSync(`${i.path}`, `${rutafinish}/${i.path.substr(72, 41)}`, {
            overwrite: true,
          });
        });
        const full = await fs.readdirSync(rutafinish);
        return res.json({ full });
      }
    }

    const full = await fs.readdirSync(pathFather);
    res.json({ full });
  } catch (error) {
    res.send("Disculpa pero algo salio mal");
  }
};

const DirTree = async (req, res) => {
  const full = await fs.readdirSync(pathFather);
  console.log(full);
  if (String(full) == []) return res.json(false);

  res.json({ true: full });
};

const GetSendPath = async (req, res) => {
  const { id } = req.params;
  const verify = fs.existsSync(`${pathFather}/${id}`);
 
  debugger;
  if (verify) {
    const rutafinish = `${pathFather}/${id}`;
    const full = await fs.readdirSync(rutafinish);
    console.log({ true: full, namePath: id })

    res.json({
      false:
        "Disculpa pero no me as dicho que carpeta desea ver el contenido 👨‍❤️‍👨",
        namePath: id,
    });
      //res.json({ true: full, namePath: id);

  } else if (id == undefined) {
    res
      .status(404)
      .json({
        false:
          "Disculpa pero no me as dicho que carpeta desea ver el contenido 👨‍❤️‍👨",
          namePath: id,
      });
  } else {
    res.json({
      false: "Disculpa pero no as creado una carpeta 👨‍❤️‍👨",
      namePath: id,
    });

  }
};

const CreateFiles = async (req, res) => {
  const { parrafo, nameFile } = req.body;
  const encoding = "utf8";
  try {
    fs.writeFileSync(`${pathFather}${nameFile}`, parrafo, encoding);
    res.send(true);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  HomePath,
  CreateFolder,
  CreateSubFolder,
  UploadFiles,
  DirTree,
  GetSendPath,
  CreateFiles,
};
