import React from "react";
import {
  Card,
  Avatar,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { makeStyles, withStyles } from "@mui/styles";
import { blue, yellow } from "@mui/material/colors";

//DYNAMIC VALUES passed to makeStyles to apply conditional styling!
const useStyles = makeStyles((theme) => {
  return {
    dynamicBackground: {
      backgroundColor: (note) => {
        if (note.category === "work") {
          return yellow[700];
        } else if (note.category === "todos") {
          return blue[500];
        }
        return "red";
      },
    },
    text: {
      color: "red",
    },
  };
});
//for some reason ClassName does not work with Avatar. To dynamically set bgcolor of Avatar
//use helper function with style prop.
function setAvatarColor(note) {
  if (note.category === "work") {
    return yellow[700];
  } else if (note.category === "todos") {
    return blue[500];
  }
  return "red";
}

export default function NoteCard({ note, handleDelete }) {
  //pass arg 'note' to useStyles here
  const classes = useStyles(note);

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar style={{ backgroundColor: setAvatarColor(note) }}>
              {note.category.slice(0, 1).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlineIcon />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" className={classes.dynamicBackground}>
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
