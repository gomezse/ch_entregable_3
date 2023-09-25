import express from "express";
import { manager } from "./ProductManager.js";

const app = express();

app.use(express.json());

// req => params - query - body
app.get("/api/users", async (req, res) => {
  try {
    const users = await manager.getProducts(req.query);
    res.status(200).json({ message: "Users found", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await manager.getUserById(+id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with the id provided" });
    }
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



app.post("/api/users", async (req, res) => {
  const { first_name, course, password } = req.body;
  if (!first_name || !course || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const response = await manager.createUser(req.body);
    res.status(200).json({ message: "User created", user: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/users/:idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
    const response = await manager.deleteUser(+idUser);
    if (!response) {
      return res
        .status(404)
        .json({ message: "User not found with the id provided" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/users/:idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
    const response = await manager.updateUser(+idUser, req.body);
    if (!response) {
      return res
        .status(404)
        .json({ message: "User not found with the id provided" });
    }
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.listen(8080, () => {
  console.log("Escuchando al puerto 8080");
});