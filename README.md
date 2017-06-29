### Package

```
# 高德地图
npm install react-native-smart-amap --save
# 高德地图定位
npm install  react-native-smart-amap-location --save
# 全局事件监听
npm install  react-native-smart-app-event-listener-enhance --save

```

### Android 
🔨 `android/settings.gradle`

```
// amap
include ':react-native-smart-amap'
include ':react-native-smart-amap-location'
project(':react-native-smart-amap').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-smart-amap/android')
project(':react-native-smart-amap-location').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-smart-amap-location/android')
```

🔨 `android/app/build.gradle`

```
dependencies {
    ...
    // amap
    compile project(':react-native-smart-amap')
    compile project(':react-native-smart-amap-location')
}
```
🔨 `android\app\src\main\java\com\[projectName]\MainApplication.java`

```
...
import com.reactnativecomponent.amap.RCTAMapPackage;    
import com.reactnativecomponent.amaplocation.RCTAMapLocationPackage; 
...
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        ...
        new RCTAMapPackage(),  
        new RCTAMapLocationPackage()
    );
}
 
 
```

🔨 `android\app\src\main\AndroidManifest.xml`

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="[packageName]"
          android:versionCode="1"
          android:versionName="1.0">
    <!-- ... -->
    <!--运营商信息-->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    <!--wifi网络定位-->
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
    <!--wifi信息-->
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>
    <uses-permission android:name="android.permission.CHANGE_CONFIGURATION"/>

    <!-- 后台唤醒定位 -->
    <!--<uses-permission android:name="android.permission.WAKE_LOCK" />-->

    <!--网络定位-->
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
    <!--GPS定位-->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
    <!--GPS定位-->
    <uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS"/>
    <!--写入扩展存储-->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <!--读取缓存数据-->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>

    <!--用于读取手机状态-->
    <uses-permission android:name="android.permission.READ_PHONE_STATE"/>
    <!-- 更改设置 -->
    <uses-permission android:name="android.permission.WRITE_SETTINGS"/>
    <!-- ... -->
    <application
            android:name=".MainApplication"
            android:allowBackup="true"
            android:label="@string/app_name"
            android:icon="@mipmap/ic_launcher"
            android:theme="@style/AppTheme">
        <!-- ... -->
        <!-- amap key -->
        <meta-data
                android:name="com.amap.api.v2.apikey"
                android:value="edbca2b6913614b8dd66ddcfea6ebf0b"/>
        <!-- amap aps -->
        <service android:name="com.amap.api.location.APSService"/>

    </application>
</manifest>
```
### IOS
* `null`


### Code
```javascript
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
        console.log(result)
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
```

### end 


