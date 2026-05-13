const multer = require("multer");
const fs = require("fs");

const filtrarExtensao = (req, file, callback) => {
  if (file.mimetype === "image/jpeg") {
    callback(null, true);
  } else {
    callback(new Error("Apenas imagens JPEG são permitidas"));
  }
};

const armazenamento = multer.diskStorage({
  destination: (req, file, callback) => {
    const idEvento = req.params.id;
    const pasta = `uploads/eventos/${idEvento}`;

    if (!fs.existsSync(pasta)) {
      fs.mkdirSync(pasta, { recursive: true });
    }

    callback(null, pasta);
  },

  filename: (req, file, callback) => {
    const nomeFinal = Date.now() + ".jpg";
    callback(null, nomeFinal);
  },
});

const upload = (req, res, next) => {
  const filemulter = multer({
    storage: armazenamento,
    fileFilter: filtrarExtensao,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });

  filemulter.single("imagem")(req, res, function (erro) {
    if (erro) {
      return res.status(400).json({ erro: erro.message });
    }

    if (!req.file) {
      return res.status(400).json({ erro: "Arquivo não enviado" });
    }

    next();
  });
};

module.exports = upload;