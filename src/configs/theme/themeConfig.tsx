// You can customize the template with the help of this file

//Template config options
const themeConfig = {
  app: {
    appName: 'Tour Monitor',
    appLogoImage: require('@src/assets/images/logo/bonnychow_80.png'),
    useRefreshToken: false,
  },
  layout: {
    isRTL: false,
    skin: 'light', // light, dark, bordered, semi-dark
    routerTransition: 'fadeIn', // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
    type: 'vertical', // vertical, horizontal
    contentWidth: 'boxed', // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false,
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'floating', // static , sticky , floating, hidden
      backgroundColor: 'white', // BS color options [primary, success, etc]
    },
    footer: {
      type: 'hidden', // static, sticky, hidden
    },
    customizer: false,
    scrollTop: false, // Enable scroll to top button
  },
};

export default themeConfig;
