import User from "../models/User.js";

// @route: GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @route: GET /api/users/:id
const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @route: POST /api/users
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const { password: _, ...safe } = user.toJSON();
    res.status(201).json(safe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @route: PUT /api/users/:id
const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const [affected] = await User.update(
      { name, email, password },
      { where: { id: req.params.id } }
    );
    if (!affected) return res.status(404).json({ message: "not found" });
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @route: DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "not found" });
    res.status(200).json({ message: "deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAllUsers, getUser, createUser, updateUser, deleteUser };
