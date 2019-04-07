import { Navigation } from 'react-native-navigation';
import MainTitleIcon from './MainTitleIcon';
import FavoriteButton from './FavoriteButton';
import CloseButton from './CloseButton';
import UpdateList from './UpdateList'

export function registerComponents(){
    Navigation.registerComponent("filtering.MainTitleIcon", ()=>MainTitleIcon);
    Navigation.registerComponent("filtering.FavoriteButton", ()=> FavoriteButton);
    Navigation.registerComponent("filtering.CloseButton", () => CloseButton);
    Navigation.registerComponent("filtering.UpdateList", ()=>UpdateList);
}