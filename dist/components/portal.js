import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { usePortalizeKey } from '../hooks/use-portalize-key';
const PortalManager = React.forwardRef((_, ref) => {
    const [portals, setPortals] = useState([]);
    useImperativeHandle(ref, () => ({
        mount(key, children) {
            setPortals(prev => [...prev, { key, children }]);
        },
        update(key, children) {
            setPortals(prev => prev.map(item => {
                if (item.key === key) {
                    return { ...item, children };
                }
                return item;
            }));
        },
        unmount(key) {
            setPortals(prev => prev.filter(item => item.key !== key));
        },
    }));
    return (<>
      {portals.map(({ key, children }, index) => (<View key={`react-native-portalize-${key}-${index}`} collapsable={false} pointerEvents="box-none" style={StyleSheet.absoluteFill}>
          {children}
        </View>))}
    </>);
});
const portalContext = React.createContext({});
export const PortalProvider = ({ style, children, }) => {
    const managerRef = React.useRef(null);
    const queue = [];
    const { generateKey, removeKey } = usePortalizeKey();
    React.useEffect(() => {
        while (queue.length && managerRef.current) {
            const action = queue.pop();
            if (action) {
                switch (action.type) {
                    case 'mount':
                        managerRef.current?.mount(action.key, action.children);
                        break;
                    case 'update':
                        managerRef.current?.update(action.key, action.children);
                        break;
                    case 'unmount':
                        managerRef.current?.unmount(action.key);
                        break;
                }
            }
        }
    }, []);
    const mount = (children) => {
        const key = generateKey();
        if (managerRef.current) {
            managerRef.current.mount(key, children);
        }
        else {
            queue.push({ type: 'mount', key, children });
        }
        return key;
    };
    const update = (key, children) => {
        if (managerRef.current) {
            managerRef.current.update(key, children);
        }
        else {
            const op = { type: 'mount', key, children };
            const index = queue.findIndex(o => o.type === 'mount' || (o.type === 'update' && o.key === key));
            if (index > -1) {
                queue[index] = op;
            }
            else {
                queue.push(op);
            }
        }
    };
    const unmount = (key) => {
        if (managerRef.current) {
            managerRef.current.unmount(key);
            removeKey(key);
        }
        else {
            queue.push({ type: 'unmount', key });
        }
    };
    return (<portalContext.Provider value={{ mount, update, unmount }}>
      <View style={[{ flex: 1 }, style]} collapsable={false} pointerEvents="box-none">
        {children}
      </View>

      <PortalManager ref={managerRef}/>
    </portalContext.Provider>);
};
const Consumer = ({ children, context }) => {
    const key = useRef();
    const checkManager = () => {
        if (!context) {
            throw new Error('No portal context defined');
        }
    };
    const handleInit = () => {
        checkManager();
        key.current = context?.mount(children);
    };
    useEffect(() => {
        checkManager();
        context?.update(key.current, children);
    }, [children, context]);
    useEffect(() => {
        handleInit();
        return () => {
            checkManager();
            context?.unmount(key.current);
        };
    }, []);
    return null;
};
export const Portal = ({ children }) => (<portalContext.Consumer>
    {context => <Consumer context={context}>{children}</Consumer>}
  </portalContext.Consumer>);
