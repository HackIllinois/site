declare module "react-simple-maps" {
    export interface GeographyProps {
        geography: any;
        onMouseEnter?: () => void;
        onMouseLeave?: () => void;
        style?: {
            default?: {
                fill?: string;
                stroke?: string;
                strokeWidth?: number;
                outline?: string;
                transition?: string;
            };
            hover?: {
                fill?: string;
                stroke?: string;
                strokeWidth?: number;
                outline?: string;
                transition?: string;
            };
            pressed?: {
                fill?: string;
                stroke?: string;
                strokeWidth?: number;
                outline?: string;
                transition?: string;
            };
        };
    }

    export interface ComposableMapProps {
        projection?: string;
        className?: string;
        children?: React.ReactNode;
    }

    export interface GeographiesProps {
        geography: string;
        children: (props: { geographies: any[] }) => React.ReactNode;
    }

    export const ComposableMap: React.FC<ComposableMapProps>;
    export const Geographies: React.FC<GeographiesProps>;
    export const Geography: React.FC<GeographyProps>;
}
