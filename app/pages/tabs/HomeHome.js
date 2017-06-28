import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
    Alert,
    Platform,
} from 'react-native';

import AMap from 'react-native-smart-amap';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

export default class HomeHome extends Component {


    constructor(props) {
        super(props);

        this._amap = null;
        this._page = 0;
        this._coordinate = {latitude:120.204851,longitude:31.261822};
    //    console.log(`this._coordinate -> `);
    //    console.log(this._coordinate);
        this._keywords = '商务住宅|学校';
        this._onDidMoveByUserTimer = null;

    }
    _onDidMoveByUser = (e) => {
        console.log(1,e)
    };
    _onLayout = (e) => {
        console.log(2,e)
    };
    render() {
        return (
            <View style={{flex: 1}}>
                <Text>1</Text>
                <AMap
                    ref={ component => this._amap = component }
                    style={{flex: 1,}}
                    options={{
                        frame: {
                            width: 100,
                            height: 100
                        },
                        showsUserLocation: false, //ios设置是否显示用户位置
                        userTrackingMode: Platform.OS === 'ios' ? AMap.constants.userTrackingMode.none : null,
                        centerCoordinate: {//地图的中心点
                            latitude: this._coordinate.latitude,
                            longitude: this._coordinate.longitude,
                        },
                        zoomLevel: 18, //缩放级别
                        centerMarker: Platform.OS === 'ios' ? 'icon_location' : 'poi_marker',
                    }}
                    onLayout={this._onLayout}
                    onDidMoveByUser={this._onDidMoveByUser}
                />
            </View>
        );
    }

}