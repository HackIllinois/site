declare module "react-simple-maps" {
    import type { FC, ReactNode, SVGProps } from "react";
    export interface MapGeography {
        rsmKey: string;
        svgPath: string;
        properties: { name: string };
    }
    export interface GeographyProps extends SVGProps<SVGPathElement> {
        geography: MapGeography;
    }
    export interface ComposableMapProps extends SVGProps<SVGSVGElement> {
        projection?: string;
        projectionConfig?: { scale?: number };
    }
    export interface GeographiesProps {
        geography: string;
        children: (props: { geographies: MapGeography[] }) => ReactNode;
    }
    export const ComposableMap: FC<ComposableMapProps>;
    export const Geographies: FC<GeographiesProps>;
    export const Geography: FC<GeographyProps>;
}
