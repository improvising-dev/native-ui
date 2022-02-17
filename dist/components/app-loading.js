import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeOut } from 'react-native-reanimated';
export const AppLoading = ({ splashScreen, children, loadAsync, onReady, onError = console.warn, }) => {
    const [appIsReady, setAppIsReady] = useState(false);
    const appView = useMemo(() => {
        if (!appIsReady) {
            return null;
        }
        return children;
    }, [appIsReady, children]);
    const splashScreenView = useMemo(() => {
        if (!splashScreen || appIsReady) {
            return null;
        }
        return (<Animated.View style={[StyleSheet.absoluteFill, { zIndex: 50000 }]} pointerEvents="box-none" exiting={FadeOut.duration(250)}>
        {splashScreen}
      </Animated.View>);
    }, [splashScreen, appIsReady]);
    useEffect(() => {
        if (appIsReady) {
            onReady === null || onReady === void 0 ? void 0 : onReady();
        }
        else {
            loadAsync()
                .then(() => setAppIsReady(true))
                .catch(onError);
        }
    }, [appIsReady]);
    return (<React.Fragment>
      {appView}
      {splashScreenView}
    </React.Fragment>);
};
