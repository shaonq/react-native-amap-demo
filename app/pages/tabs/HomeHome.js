import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
    Alert,
    Platform,
    StyleSheet,
    NativeAppEventEmitter,
    ActivityIndicator
} from 'react-native'

import AMap from 'react-native-smart-amap';
import AMapLocation from 'react-native-smart-amap-location'
import AppEventListenerEnhance from 'react-native-smart-app-event-listener-enhance'

const {width, height} = Dimensions.get('window');

const options ={
    frame: { width, height},  //  ios 地图宽高
    showTraffic:false, // ios 地图路况
    showsUserLocation: false, //ios 用户位置
    userTrackingMode: Platform.OS === 'ios' ? AMap.constants.userTrackingMode.none : null, // ios 用户位置更新
    centerCoordinate: {//地图的中心点
        latitude:120.204851,
        longitude:31.261822,
    },
    zoomLevel: 8, //指定缩放级别
    centerMarker: Platform.OS === 'ios' ? 'icon_location' : 'poi_marker', //中心点自定义图标的项目资源名称
};
/**
 * @name react-native-smart-amap
 * @url: https://github.com/react-native-component/react-native-smart-amap
 * API:
 * setOptions:修改默认配置
 * setCenterCoordinate:修改中心点
 * searchPoiByCenterCoordinate:搜索周边
 *
 * Event:
 * onDidMoveByUser:监听用户动作, 返回当前地图中心点的经纬度信息
 * amap.onPOISearchDone: 监听POI搜索回调, 返回周边的POI信息
 * */
class HomeHome extends Component {

    constructor(props) {
        super(props);
        this._amap = null;
    }
    _onDidMoveByUser = (e) => {
        console.log("用户操作",e)
    };
    _onLayout = (e) => {

        AMapLocation.init(null); // 初始化
        //AMapLocation.getReGeocode(); // 开始定位 位置
        AMapLocation.getLocation(); // 开始定位 坐标
        console.log("加载完成",this._amap)
    };
    _onLocationResult = (result) => {
        if(result.error) {
            Alert.alert(`错误代码: ${result.error.code}, 错误信息: ${result.error.localizedDescription}`)
        }
        else {
            if(result.formattedAddress) {
                Alert.alert(`格式化地址 = ${result.formattedAddress}`)
            }
            else {
                Alert.alert(`纬度 = ${result.coordinate.latitude}, 经度 = ${result.coordinate.longitude}`)
            }
        }
    };
    componentDidMount() {
        this.addAppEventListener(
            NativeAppEventEmitter.addListener('amap.location.onLocationResult', this._onLocationResult)
        )
    }
    componentWillUnmount () {
        AMapLocation.cleanUp() // 清除定位
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <AMap
                    ref={ component => this._amap = component }
                    style={{flex: 1,}}
                    options={options}
                    onLayout={this._onLayout}
                    onDidMoveByUser={this._onDidMoveByUser}
                />
            </View>
        );
    }

}

export default AppEventListenerEnhance(HomeHome)