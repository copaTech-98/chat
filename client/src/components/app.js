import io from "socket.io-client";
import { Global } from "../Global";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { getMessage } from "../utils/middleware/getMessage.js";
const socket = io(Global.URL);

export default function App() {
  const [form, setForm] = useState({
    type: "",
    notification: "",
  });
  const [messages, setMessages] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    socket.on("notification", (data) => console.log(data));
    return () => socket.off("notification", (data) => console.log(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("notification", JSON.stringify(form));
    setForm({ ...form, message: "" });
  };

  const handleSaveUser = () => {
    localStorage.setItem("user", form.userName);
    setDisabled(true);
  };

  return (
    <Box display={"flex"} flexDirection="column" gap={"20px"} padding="20px">
      <Box></Box>
      <Box
        display={"flex"}
        flexDirection="column"
        gap={"20px"}
        padding="20px"
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Typography>Chat: {form.userName}</Typography>
        <TextField
          onChange={handleChange}
          name="type"
          disabled={disabled}
          value={form.type}
          label="Username"
          sx={{ width: "100%" }}
        />
        <Button onClick={handleSaveUser} disabled={disabled}>
          Save
        </Button>
        <TextField
          onChange={handleChange}
          name="notify"
          value={form.notify}
          multiline={true}
          label="Message"
          sx={{ width: "100%" }}
        />
        <Button variant="contained" type="sumbit">
          Enviar
        </Button>
      </Box>
    </Box>
  );
}
