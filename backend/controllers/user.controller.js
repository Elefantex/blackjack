const User = require("../models/user");


exports.users = (req, res) => {
  const crewcode = req.query.usuario;
  const filter = crewcode ? { crewcode } : {};

  User.find(filter).exec((err, users) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send(users);
  });
};




exports.login = async (req, res) => {
  const { usuario } = req.body;

  try {
    const user = await User.findOne({ usuario }).exec();
    if (!user) {
      const existingUser = await User.findOne({ usuario });
      if (existingUser) {
        return res.send({ message: "Login successful", user });
      } else {
        const newUser = new User({
          usuario,
          puntos: 2500
        });
        await newUser.save();
        const user = await User.findOne({ usuario });
        return res.send({ message: "Login successful", user });
      }
    }

    return res.send({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};
exports.updateUser = (req, res) => {
  const { usuario, puntos } = req.body;

  User.findOneAndUpdate(
    { usuario: usuario }, // Encuentra el documento con el usuario proporcionado
    { $set: { puntos: puntos } }, // Actualiza los puntos del usuario
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err); // Imprimir el error para depurar
        res.status(500).send({ message: err });
        return;
      }
      res.send("updatedUser");
    }
  );
}





exports.userInfo = (req, res) => {
  const id = req.params.id;

  User.findById(id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    res.send(user);
  });
};





