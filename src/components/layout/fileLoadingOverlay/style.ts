import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    loaderContainer: {
      position: "fixed",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "rgba(23, 23, 39, 0.5)",
      alignItems: "center",
      textAlign: "center",
      width: "100vw",
      height: "100vh",
      zIndex: 5000,
    },
    logo: {
      width: "50%",
    },
    status: {
      paddingTop: "50px",
      color:"rgb(245,255,250)"
    },
  }));