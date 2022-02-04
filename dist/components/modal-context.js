import React, { useEffect, useMemo, useState } from 'react';
import { ModalService } from '../core/modal';
const modalContext = React.createContext({});
export const ModalProvider = ({ children }) => {
    const [modalMap, setModalMap] = useState(new Map());
    const context = useMemo(() => {
        return {
            set: (id, node) => {
                setModalMap(prevState => new Map(prevState).set(id, node));
            },
            delete: id => {
                setModalMap(prevState => {
                    const nextMap = new Map(prevState);
                    nextMap.delete(id);
                    return nextMap;
                });
            },
        };
    }, []);
    const modalList = useMemo(() => {
        return Array.from(modalMap.entries())
            .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
            .map(([key, modal]) => <React.Fragment key={key}>{modal}</React.Fragment>);
    }, [modalMap]);
    useEffect(() => {
        ModalService.mount(context);
        return () => {
            ModalService.unmount();
        };
    }, []);
    return (<modalContext.Provider value={context}>
      {children}
      {modalList}
    </modalContext.Provider>);
};
