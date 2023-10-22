export default function makeStyles(theme) {
  return {
    appBar: {
      position: 'relative',
    },
    layout: {
      marginTop: '5%',
      width: 'auto',
      marginLeft: 2,
      marginRight: 2,
    },
    paper: {
      marginTop: 3,
      marginBottom: 3,
      padding: 2,
    },
    stepper: {
      padding: 3,
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: 3,
      marginLeft: 1,
    },
    divider: {
      margin: '20px 0',
    },
    spinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
}