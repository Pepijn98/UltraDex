interface Utils {
    darkmode: boolean;
    lastModified(): string;
    isEmptyObject(obj: Object): boolean;
    success(message: string, debug?: boolean): void;
    info(message: string, debug?: boolean): void;
    error(message: string, debug?: boolean): void;
    warning(message: string, debug?: boolean): void;
    capitalize(str: string): string;
    format(date: Date | string, includeTime?: boolean): string;
    wait(m: number): Promise<void>;
    range(start: number, stop: number, step?: number): number[];
}

export default Utils;
