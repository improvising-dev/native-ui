var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { FullscreenLoading } from '../components/fullscreen-loading';
import { showModal } from './modal';
export const showLoading = ({ controller, message, } = {}) => {
    const { dispose, handleDismiss } = showModal({
        global: true,
        builder: ({ visible, handleDismiss }) => (<FullscreenLoading controller={controller} message={message} visible={visible} onDismiss={handleDismiss} onUnmounted={() => dispose()}/>),
    });
    return handleDismiss;
};
export const handleLoading = (cb, params = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const hideLoading = showLoading(params);
    try {
        return yield cb();
    }
    finally {
        hideLoading();
    }
});
