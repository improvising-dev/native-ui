/// <reference types="react" />
import { ViewStyle } from 'react-native';
export interface CardProps {
    style?: ViewStyle;
    onPressed?: () => void;
}
declare const Card: React.FC<CardProps>;
export default Card;
