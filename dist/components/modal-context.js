import React, { useContext, useLayoutEffect, useMemo, useState } from 'react';
import { globalModalService } from '../core/modal';
const modalContext = React.createContext({});
export const useModalService = () => useContext(modalContext).modalService;
export const ModalProvider = ({ modalService = globalModalService, children, }) => {
    const [modalMap, setModalMap] = useState(new Map());
    const context = useMemo(() => {
        return {
            modalService,
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
            .sort(([keyA], [keyB]) => keyA.localeCompare(keyB, 'en', { numeric: true }))
            .map(([key, modal]) => <React.Fragment key={key}>{modal}</React.Fragment>);
    }, [modalMap]);
    useLayoutEffect(() => {
        modalService.mount(context);
        return () => {
            modalService.unmount();
        };
    }, []);
    return (<modalContext.Provider value={context}>
      {children}
      {modalList}
    </modalContext.Provider>);
};
