import React from "react";

export type ProgressVariant = "linear" | "circular" | "indeterminate";
export type ProgressSize = "sm" | "md" | "lg" | "xl";

export interface ProgressBarProps {
    value: number;
    min?: number;
    max?: number;
    size?: ProgressSize;
    color?:string;
    className?: string;
    label?: React.ReactNode | ((value:number)=> React.ReactNode);
    indeterminate?: boolean;
    showValue?: boolean;
    ariaLabel?: string;
    transition?: string;
    variant?: ProgressVariant;
}