import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
    Alert,
    Platform,
} from 'react-native';

import AMap from 'react-native-smart-amap';
import AMapLocation from 'react-native-smart-amap-location'

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
    zoomLevel: 3, //指定缩放级别
    centerMarker: Platform.OS === 'ios' ? 'icon_location' : 'poi_marker', //中心点自定义图标的项目资源名称
};
/**
 * @url:  https://github.com/react-native-component/react-native-smart-amap
 * API:
 * setOptions:修改默认配置
 * setCenterCoordinate:修改中心点
 * searchPoiByCenterCoordinate:搜索周边
 *
 * Event:
 * onDidMoveByUser:监听用户动作, 返回当前地图中心点的经纬度信息
 * amap.onPOISearchDone: 监听POI搜索回调, 返回周边的POI信息
 * */
export default class HomeHome extends Component {

    constructor(props) {
        super(props);
        this._amap = null;
        this._keywords = '商务住宅|学校';
    }
    _onDidMoveByUser = (e) => {
        console.log(1,e)
    };
    _onLayout = (e) => {
        console.log(2,e);
        console.log(3,this._amap)
    };
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