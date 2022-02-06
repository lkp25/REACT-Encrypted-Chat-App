import SubjectOutlined from "@mui/icons-material/SubjectOutlined";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { makeStyles } from "@mui/styles";
import { format } from "date-fns";
import {
  Avatar,
  Drawer,
  ListItem,
  ListItemText,
  Typography,
  List,
  ListItemIcon,
  AppBar,
  Toolbar,
} from "@mui/material";
const drawerWidth = 240;

//use makeStyles as a function returning object, to have access to the MAIN THEME properties:
// eg using theme.spacin g( method)
const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(6),
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: "red",
    },
    appbar: {
      background: "red",
    },
    toolbar: theme.mixins.toolbar, //take collection of styles from main theme for 'toolbar' component
    date: {
      flexGrow: 1, //element takes up all available horizontal space
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
    title: {
      color: "red",
    },
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];

  return (
    <div className={classes.root}>
      {/* app bar - ClassName does not work - use style or sx object(precedence!!!) for styling*/}

      <AppBar
        sx={{ boxShadow: 10 }}
        style={{ color: "gray", width: `calc(100% - ${drawerWidth}px)` }}
        className={classes.appbar}
        elevation={0}
      >
        <Toolbar>
          <Typography className={classes.date}>
            Today is the {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography>Mario</Typography>
          <Avatar className={classes.avatar} src="/dv.png"></Avatar>
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Ninja Notes
          </Typography>
        </div>

        {/* links/list section */}
        <List>
          {menuItems.map((item) => (
            //ListItem doesnt work with classList ternary style - hence the div wrapper
            <div
              className={
                location.pathname === item.path ? classes.active : null
              }
              key={item.text}
            >
              <ListItem button onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </div>
          ))}
        </List>
      </Drawer>

      {/* main content - passed in as CHILDREN PROP */}
      <div className={classes.page}>
        {/* empty div to push content below the actual nav Toolbar, uses its styles to have same size */}
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
