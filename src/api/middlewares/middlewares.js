const registro = (req, res, next) => {
  console.log(`[${new Date().toLocaleString("en-GB")}] ---> ${req.method} - ${req.path}`);
  next();
}
registro
const validacionId = (req, res, next) => {
  const id = req.params.id;
  if(!id || isNaN(id)) return res.status(400).json({ error: `Tenes que ingresar un id válido` });
  next();
}

export {
  registro as registro,
  validacionId as validacionId
}