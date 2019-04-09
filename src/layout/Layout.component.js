import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';


import { styles } from './Layout.styles';
import './Layout.component.scss';
import AppRouting from '../routing/AppRouting.component';
import { navList } from './Nav-links.data';
import { getFromLocalStorage } from '../shared/services/Storage.service';
import { userLoggedIn } from '../store/auth/actionCreator';

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };
  componentDidMount() {
    const loginData = getFromLocalStorage('loginData');
    if(loginData) {
      this.props.updateLoginStatus(loginData);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
        this.setState({ mobileOpen: false });
    }
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
            <ul className="side-nav-container">
                {navList}
            </ul>
      </div>
    );
    const getNav = () =>{
      if(this.props.isLoggedIn) {
        return (
          <nav className={classes.drawer}>
            {/* The implementation can be swap with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={this.props.container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
        );
      }
      return null;
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {/* <img src={require('../assets/logo.png')}/> */}
                {/* HeroBot */}
            </Typography>
          </Toolbar>
        </AppBar>
        {getNav()}
        <main className={classes.content}>
          <ToastContainer/>
          <div className={classes.toolbar} />
            <AppRouting isLoggedIn={this.props.isLoggedIn}/>
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.AuthReducer.isLoggedIn
  }
};
const mapDispatchToProps = dispatch => {
  return {
      updateLoginStatus: (payload) => dispatch(userLoggedIn(payload))
  }
};
export default withRouter(withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer)));
