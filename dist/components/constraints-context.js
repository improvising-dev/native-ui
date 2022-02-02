import React, { useContext } from 'react';
import { useWindowDimensions } from 'react-native';
const constraintsContext = React.createContext({});
export const useConstraints = () => useContext(constraintsContext);
export const ConstraintsProvider = ({ maxWidth: providedMaxWidth, maxHeight: providedMaxHeight, children, }) => {
    const dimensions = useWindowDimensions();
    const maxWidth = providedMaxWidth !== null && providedMaxWidth !== void 0 ? providedMaxWidth : dimensions.width;
    const maxHeight = providedMaxHeight !== null && providedMaxHeight !== void 0 ? providedMaxHeight : dimensions.height;
    return (<constraintsContext.Provider value={{ maxWidth, maxHeight }}>
      {children}
    </constraintsContext.Provider>);
};
