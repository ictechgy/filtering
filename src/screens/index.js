import { Navigation } from 'react-native-navigation';
import SearchScreen from './SearchScreen';
import ListScreen from './ListScreen';
import DetailScreen from './DetailScreen';
import SettingsScreen from './SettingsScreen';
import FavoriteScreen from './FavoriteScreen';
import ShoppingModalScreen from "./ShoppingModalScreen";
import MaskListModalScreen from "./MaskListModalScreen";
import MaskDetailScreen from './MaskDetailScreen';
import LicenseScreen from './LicenseScreen';

export function registerScreens(){
    Navigation.registerComponent('filtering.SearchScreen', () => SearchScreen);
    Navigation.registerComponent('filtering.ListScreen', () => ListScreen);
    Navigation.registerComponent('filtering.DetailScreen', () => DetailScreen);
    Navigation.registerComponent('filtering.SettingsScreen', () => SettingsScreen);
    Navigation.registerComponent('filtering.FavoriteScreen', () => FavoriteScreen);
    Navigation.registerComponent('filtering.ShoppingModalScreen', () => ShoppingModalScreen);
    Navigation.registerComponent('filtering.MaskListModalScreen', ()=>MaskListModalScreen);
    Navigation.registerComponent('filtering.MaskDetailScreen', () => MaskDetailScreen);
    Navigation.registerComponent('filtering.LicenseScreen', () => LicenseScreen);
}

//비구조화 할당에서 import할 때 함수는 {}를 쓰고 클래스는 안써도 되는건가