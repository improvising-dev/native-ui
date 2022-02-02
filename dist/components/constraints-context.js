import React, { memo, useContext } from 'react';
import { useWindowDimensions } from 'react-native';
const constraintsContext = React.createContext({});
export const useConstraints = () => {
    const { width, height } = useWindowDimensions();
    const { maxWidth = width, maxHeight = height } = useContext(constraintsContext);
    return { maxWidth, maxHeight };
};
export const ConstraintsProvider = memo(({ maxWidth, maxHeight, children }) => {
    return (<constraintsContext.Provider value={{ maxWidth, maxHeight }}>
        {children}
      </constraintsContext.Provider>);
});
