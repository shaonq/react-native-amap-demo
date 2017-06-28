import React, {Component, PropTypes} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {
    Theme,
    NavigationPage,
    NavigationBar,
    BasePage,
    Label,
    ListRow,
    SegmentedBar,
    SegmentedView,
    TabView
} from 'teaset';

import HomeHome from  './tabs/HomeHome';
import HomeDemo from  './tabs/HomeDemo';
import HomeAbout from  './tabs/HomeAbout';
import TWebView from  './TWebView';

const images = [
        [
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB7klEQVRYR+3Wz0vCYBgH8OfZiiEitbwIdfCQVBDhySAIpGOl+Sf4DwRJLjrVujZDjx27djONik5e6xQSFBTUwaBDtiJKjLYnlow05o+9Gl7cddv7/bzP8+wHQpcP7HI+9ABtVSCsPE8ZLcxIQ3nWVjID5rdVP8/pJ0Dg1IibPVoTL1gQTIBKOKU1HSM8D37UKfVFGGRB2AZUh5uBoR01yoqwBbAKN8vOimgZ0Ci8HURLgFbCWRFNAXbCWRANASzhdhF1AUY4h3SqES0fr7n3WZ7xhYS6wRGta4Qz9R5RS4C5cyJ4AsD4oSTmWACLihpE0HcR0FPvPWEJCCXUiKbDPY+UIkC5PQDJgJgyNpCNi+m/G2k4AyHlOdcJQFYaCtarYA/AVAFjuFwObskp4IBR2vcyvb6V9IO/s1IZQpI72oJIUvX2c5Cfm3S6hP6K/62kQ+7y45M4GEvHxHuz3/8CCCnqyrRPSAZGHTVzdX5bgrObciwriT8Tbxz/AggrRTngc2xaAc5vSlsZyS33AB2rQDhR3APk7jKr4pa5qNGC8RFhc2JYqJmBq4cyXBfKNS0wrgUEbybujjK9iCJJdVD7oj0AGPxdgDyIMGK1IBEUAPCx6twL34fRdEx8YQKwfIDs3tP0h8Tugnav7wG6XoFvOHB9MO/8gGYAAAAASUVORK5CYII=',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEqklEQVRYR8WXX0xbdRTHv79721Ja2vV2Y3NOE8KIZBkLLG6AA5PVvZgp0KCZisaw+OdJExjdzBITfZgv/BE0xgefYInOh0UK1cmDBh0bGSTbIAp2uMhwMLI/UChtWdt778/82tyuMNp72y3xPrX3/u45n3N+33PO7xL8zxd5FP+HW31lBj2W3M3CjWztZATg7PTZJFH+hOfIEZniyWSnHMGkTElrv0voyQRGM0BNm6+J5+lnuQbOsLfAqNti5ZFv4REWKfyrMqZvRzBxMyLKlN6JSOSlcyeEMS0gmgBq2xe6dRzXUPlMrr6sICel3XCUYsgbgncuAkrIUU+L0K0GoQrAItfzaH2l0qLPt/Jq9mLPx26EMTwVCkVEUqWWibQAzk5fgSzR6UN7zNi1w5BwziL13opgdjEKq5HDFqtuzXO28KcrAczcjU66W+y701GnBWCpf8Kmf+vVSksi9L/mIrjoDcFsJNi5lUcgTDF9R4LFyMFRYoaSJaaL74b80SjF++m2Ii1AXcdi8IUSs0mJfnZRhHt0Ba8/Z8QbB3ITgQXDFKfcAdzzU9TttyBHHzf7yx9BeOfCPf2uzY2pspAS4OU230GO0MH3DtkSBn++GoA9D/jYmfeQPQbxzjfLeLYwF4pQWbYG/wwG3C12S9YAH7woJN79asCHk3V5qCzSb2jvi4EgvPMy6svj/pSM9bvsKQNVzcB6gFNHLNjztG5DgDPDqzh/TXw8AEoFvHbAmhDW6fPLOFxqWLP/ySQf9vghmHV4fpcpdnv0+iou/xOe6j0mFGe8BewF5+eLt/YVGreXF8UFxwxO3Ayj620rtlq5NTZ/nYjgy4EgkoG/HfJHfUHx637X5qasAGrbFj41G/mTRx2bEk3g+2E/VsMy3nWYUJDPg4lv5HoEnithlBcZocCyMjz9+zJEmexN14zUGpFNlqgvuRGxJjQ+cx/jM2Gw3+yymjhUFZuwc9sDcbISnJqPjLiP2SuzbkTsRdaM8nL4Nxsdmx5SHosyR0cSZao4UqKXKXH8eFz47ZEAmBgh00lHiTk3uR2nM+q5HBD/vRcd6WuxV6dbx56pDqNYFuJa+Kih2mpUulwqw0rta4leMwA7iIDCu68wZ5sislQATPn++9LZ3mZ7g1r0mgHYwpp2n5OA9iaX2XoHbAxfvBYKEY7scDcLS48VgBmr61i8sN2mq6ivsGwoyDMX/NGIiBOe40KXFucZZSDWmDp9BVSmE1XFJtP6k9HZSyvS7WXxkhbhJcNpEmHyC+yEZNChtb7iwQkpKfW7Mz0hZwygbIVg5vc3VFsNd/0SfhhZiaWe16Fb694rQakC1HT4GkFpHSjYXF7idSR2uJAlOlteZDT/PR+NLoWkUZZ69p3AE9oFAhtArwJcn8cluLNqRKz0ZIkZoX0cz3WtT61SFQCCHE+eWh+5AkMIHctqGCnjON0wqW1f6JIp507VbpleQGiTx2UvyGoaxqKktJsSDBIQtyhjXO2YHT/KoRSUNlICIsmkMetpqFDH0y07KUgZAUqZFiiw5suHAAdBsczus7SLMtetBptxH0hOI4tU+S9TLGlxttE2qFaB1o6W7br/AFT7KD9fyO85AAAAAElFTkSuQmCC',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADU0lEQVRYR+2VXUgUURSAz71z91dHd3TNUoI1pFKjQjF6iaKEftBSkIieCoLoRVvKiCAqAinFlKIIeomKKAraUPoninpYoiA30iKrLbO/dXfUXfdndmZujGKouLt3SojAedzZOec737nnXAT/+EH/OD/MAPyfBiqbxVXZ6eDEGM1XVCojgA/+ELR2NAiP9J4pXQaqW0WbAdPbRfmGkrWLTbydxyP5+oMq3PXEgq96450UUJXLKQywgjADjCRH1L1jDV+wupgYyWju34+sAtzplKULT0Lea/XCgmkH2HIycKyqzLpn83ITmZx8LJkGcfFpTL7XGW65Upe1nwWC2UDNicBw01abtTA3+Sc9PygcuDrou1YvzJo2gA1N4tLyAsP9+vVpdiEteVhxGKDxZkjs+SmXupyCNxUEkwHt1C8vNHbUrbOm8ebUAGfuh4fdPVIly1QwAVS3io6CHPL8YHV6NouBo66Q/6NPLmSZBiYArebaNvH7kdrM3OL85J94eik0ugbfX60TClPp194zA1S1iNsqSkynt6+0WBO1IRgFOHU3HHW/l3a17xHOTyvAqIXA5YrF1sqaMiM/K2Mi+88hCjdeSMEHnnDH9d1ZW1mS6zIwFlDbBxhj5+pFRijOI0aEAF73ydLD1xJVFbWNdf7H4jG3YHxF2qFUZKiem40War/3itTNYXjEMnaTzfwRgLYXOAKZ44MpMgze2ie8ZFWvy4BWsarAJhOBelmhcwSeixo5JM+2cUQL9Nkvj15KQ4qNt2B3MELPYg5u/vUYahcQwXAOI1hX6rBwc+3EkpPBJS3SN6RA15dY7O03KYIAnY2r9HgykIQt0DSbjfBg2TyLtXSeyaJXbSxOwf0uEnvzVfoWkaAmUXumBNCUEwwva8r5zFQVpwLr7pPgcXfYr1KYcjNOCbCx2X94icN8aEWRNVV8pvePu8Ixzydpf3uD0MY0BZp+3gyX0sw4tyjfZM8TCOg1MRRRoS8gg9cnBT71yzQqQcVUbUg6hhqIxUh3EoxWRCRaYs/g+k0EQV6WIR0BTLgXKUD0ayAekhRKxKBiJgT5KIVn0Thcat8ruBKp0rUHNCCMwIYwOJCqOsYHpRh7qQpelcKAnn2gC4Cp4Tr/NAMwY+AXrDtQMG3pvpsAAAAASUVORK5CYII='
        ],
        [
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABq0lEQVRYR+2Wv07CUBTGv5PAZIyMDA6UcNvNOJuY8AbyCLyAiSYOTlKeQEdHVjfcjJOPYNi4l1AGBwcHXIX0mGvapBIK9BTC0js1vX++3/nOObcl7HnQnvVRAORyYDwen9gU1uv1gTSVYgCt9SkRvTDzAYBz13XfJRAigEi8z8wtABbkgZmbEojMAEnxWFBr3ZZCZAJYJh7bLoXYGGCVeB6IjQA2EZdCrAXIIi6BWAkgEc8KkQoQib+GYXjped6TpMeHw+EdEd0COEtr0aUAceQAvgDcKKXeJADGmCYzPxJRNe2eWAowGo1aYRhObG8D8PMA2P3ROWg0Gv3FQFbWgDHGRp4bQCnVTHOwABA5YIsLwAWAo8jabwDPi7USrbMp3F4KgiCozWazAREdxnllZvv4Uy6XPcdxJvH7nQAYY64A3KcU1bVSynbO39gVgA+gkwLQVUrZ+QJgOw5orXtEFCiluglbfWbuEP1vIFuIRLSYAru25rpuW3QRBUFQmc/nPQCVRMVXARynHPhBRJ+JuWmpVGo7jjMVAUg+QFn3rP0hyXpg1vUFwN4d+AXPuEAwAgGPOAAAAABJRU5ErkJggg==',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC0klEQVRYR8VXPW/UQBCd8dkRBCGFCvFR5CTvXpECKBBIUEBNQSqKQHE01KlAVKShSZWKOumRCL8gFBRAQyiI0O5JpkAUNBwSSWPjh+ZkS9bp7F37QNnybnbmzczbN2OmYz48T3xjzOUoisb9fv9rVz+tACRJspRl2TMA95j5fDUogIMgCDbjON5pA8YbgLV2nYieA1hg5rAmSAbgBxHd0Vrv+wDxAmCM2SaiNWaOfJyKDYCHWmu513icACRzAJtEFDE7zavBjgDccFWi0WOSJMtZliUAqGXwCRDhhdZ6pakEjQCk9Mz8gIh6pZM6MPK7nCpQACkRPWpqRSMAa+0hgEXf7GeBA7CjtR7WVaEWgLX2FhHtuUjU9H9Rld9a69PHAqAMqpSqTfS/VmAuAPO+gDJ4nudmMBgMWrdALhhjvjPzOR8elASsElFeQRAEL+I4FhWdeVyvYAPAU2ZemHXbRx8AXGkSI5cQyfD56ROoJsH3SqnrnYWoaIPo+f2GAdTk/7ZS6s1cAAoyHgA42UKQMmaW7G+6+OM1Xay1G0T0hIhOuBxW/ndmP5FuH4eyiKRp+oWZz7rsC/1/qbVec9l6AxDD0Wi0CuCVByGPwjC80O/3x/8UgDiz1r4lomtEVLcRyfR7rJTa8gneqgJiXBDyMxEtzgjwh4je+RCveteLA9ULxW64CWB6Q5LSr7TdkFsDKFsB4KooZMGJSenDMNz27X2ZlBOAMWbIzHeJ6AwRjcMwnCwXaZp+Y+ZTwnpm/iCll+8EZt4CsEREH4MgeB3H8W4nISqe3sRJr9fbmi5t5VUcRlF0cTrzEgwz73caRpVxXDtMRqORZLtbJ7cFX9aVUsudpmGRpcyCPWbezfP8k2vNllUOwCUiklZJi4edp2GJWoDkeb5KRNJjcS4iM/3lIzvkL/ldyp7n+bYLbGsdmHqOEnByAIx9gs1qg/MV+CpaV7u/X1txMD2pNHcAAAAASUVORK5CYII=',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACdklEQVRYR+2WMWgUURRF752dWZJoSMCg2O3Azl/BRuwFCwsLRW2t7MRKgk06LbUQ0wgBG4tgrRBIoUXKIBba7qC7nYJGIxpMZoe98pe/KMvuzp8YCMJOO++/d/59790Z4pAfHnJ9TAD+TwXSND0vaRGAIZlL+kDyUZIkG2VnqpQCrVZrPs/zdQCnAcxK6tUje2l+SHoXRdHlOI63fUG8AWzxLMs2ScYkq8MKSMoktRuNRuPAAdI0vS/pDslwXHJJOcmHSZIs+UB4K5Cm6Q6AGZ+kkj4bY477xHoBNJvNMyRfAljwSQrgWxiGZ+M4bhfFewG4qV8DcMQN3Ni8knZIXvLZCi+AVqtVy7LsTRAEx4puZN93u92tarVa99kGLwCbtNlsfiJ5wgdA0ntjTN0ntgzADZKPJc2MaoPzhV0At4wxTw8UwKnwzPZW0uwghC1O0prRmjHmuk/xnon5BvbjnB8sOoC+IWUArC0u++5/P19pAHvQDmWe51clnXKJNqMo2vBZu8EL7wvA+cLc38kkfTfGvC2rqBeAvXGn07kC4DbJkyR3reUC6Nlyfx4kzQOw34uVSqXy4p/X0H6AOp3OE5IXAVQkTRcZkRvGPQC/AKyEYfhgHMhIBazMAF6RtP4/XVZaF7/X7XY/krw2qj1DAZzktp9zRTcuAnPesBVF0VBnHAqQpuk9AHeLkpd4b1uylCTJstcWuClfBWCtd8H1tUS9P6GSvjqPuDCsDWO3wIIEQXBT0jn3G/bFpT4KYGqAyFrwT7cZU/afAMDrIAhW6/X681H0XmvYP+yUmZdUI1kb8IE2ybak7TJ+UApgXz0oODQBmCjwGyq3CzBimfySAAAAAElFTkSuQmCC'
        ]
    ],
    texts = [
        ['Home', 'Demo', 'About'],
        ['主页', '示例', '关于我']
    ];

export default class Home extends BasePage {

    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: ' 测试 ',
        showBackButton: true,
    };

    constructor(props) {
        super(props);
        Object.assign(this.state,{
            selectIndex:0
        })
    }
    _renderView() {
        let view = null;
        switch (texts[0][this.state.selectIndex]){
            case 'Home':
                view = <HomeHome/>;
                break;
            case 'Demo':
                view =  <HomeDemo/>;
                break;
            case 'About':
                view =  <HomeAbout/>;
                break;
        }
        return view;
    }
    renderPage() {
        return (
            <TabView style={{flex: 1}} onChange={ (selectIndex) => this.setState({selectIndex}) }>
                <TabView.Sheet
                    title={texts[1][0]}
                    icon={{uri: images[0][0]}}
                    activeIcon={{uri: images[1][0]}}
                >
                    {this._renderView()}
                </TabView.Sheet>
                <TabView.Sheet
                    title={texts[1][1]}
                    icon={{uri: images[0][1]}}
                    activeIcon={{uri: images[1][1]}}
                >
                    {this._renderView()}
                </TabView.Sheet>
                <TabView.Sheet
                    title={texts[1][2]}
                    icon={{uri: images[0][2]}}
                    activeIcon={{uri: images[1][2]}}
                >
                    {this._renderView()}
                </TabView.Sheet>
            </TabView>
        );
    }

}