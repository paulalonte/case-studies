export const convertToCapital = (val: string) => {
    return val.charAt(0).toUpperCase() + val.substr(1, val.length);
};
