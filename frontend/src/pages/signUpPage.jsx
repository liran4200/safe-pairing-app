import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';

const styles = theme => ({
  formContainer: {
    position: "center",
    paddingTop: "140px",
  },
  formButton: {
    marginTop: theme.spacing.unit,
    width: "160px",
    height: "43px",
    paddingTop: theme.spacing.unit,
  },
  textField: {
    width: "345px",
    // height: "30px",
    paddingTop: theme.spacing.unit,
    marginBottom: 0,
    // color: "white",
    // inLineColor: "#D9D9D9",
  },
});

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.handleFormEvent = this.handleFormEvent.bind(this);
  }

  async handleFormEvent(event) {

  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.formContainer}>
        <Grid
          container
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <Typography component="h2" variant="display2">
              Sign up
            </Typography>
          </Grid>
          <form onSubmit={this.handleFormEvent}  style={{ position: "center" }}>
            <Grid item>
              <TextField
                className={classes.textField}
                name="email"
                autoComplete="email"
                label="email"
                margin="normal"
                // color="#999999"
                // variant="filled"
              />
            </Grid>
            <Grid item>
              <TextField
                className={classes.textField}
                name="password"
                autoComplete="password-current"
                type="password"
                placeholder="password"
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField
                className={classes.textField}
                name="password"
                autoComplete="password-current"
                type="password"
                placeholder="Verify password"
                margin="normal"
              />
            </Grid>
            <Grid container direction="row" spacing={16}>
              <Grid item>
                <Button
                  variant="contained"
                  color="#999999"
                  className={classes.formButton}
                  type="submit"
                  padding="5px">
                  confirm
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </div>
    );
  }

}

export default withStyles(styles)(SignUp);
