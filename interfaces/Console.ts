export default interface Console {
    info(message: string): void;
    buildInfo(override?: boolean): void;
    success(message: string): void;
    error(message: string): void;
    warning(message: string): void;
};
