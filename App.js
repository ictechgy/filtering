import { Navigation } from "react-native-navigation";
import { registerScreens } from './src/screens';
import { registerComponents } from './src/components';

export function start(){
  registerScreens();
  registerComponents();

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        bottomTabs : {
          id : "filteringScreens",
          children : [
            {
              stack : {
                children : [
                  {
                    component : {
                      id : "Main",
                      name: "filtering.SearchScreen",
                      options : {
                        bottomTab : {
                          text : "Search",
                          icon : require("./assets/images/search.png"),
                          iconColor : "#8ac2ff",
                          selectedIconColor : "#214fa0",
                          textColor : "#3b99ff",
                          selectedTextColor : "#0078fb",
                        }
                      }
                    }
                  }
                ]
              }
            },
            {
              stack : {
                children : [
                  {
                    component : {
                      id : "Favorite",
                      name : "filtering.FavoriteScreen",
                      options : {
                        bottomTab : {
                          text : "BookMark",
                          icon : require("./assets/images/emptyStar.png"),
                          selectedIcon : require("./assets/images/filledStar.png"),
                          iconColor : "#3b99ff",
                          selectedIconColor : "#0078fb",
                          textColor : "#3b99ff",
                          selectedTextColor : "#0078fb"
                        }
                      }
                    }
                  }
                ]
              }
            },
            {
              stack : {
                children : [
                  {
                    component : {
                      id : "Settings",
                      name : "filtering.SettingsScreen",
                      options : {
                        bottomTab : {
                          text : "Settings",
                          icon : require("./assets/images/emptySettings.png"),
                          selectedIcon : require("./assets/images/filledSettings.png"),
                          iconColor : "#3b99ff",
                          selectedIconColor : "#0078fb",
                          textColor : "#3b99ff",
                          selectedTextColor : "#0078fb",
                        }
                      }
                    }
                  }
                ]
              }
            }
          ]
        },
      }
    });
  });
}