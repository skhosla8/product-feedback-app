// Base Imports

export const capitalizeStr = (str: string) => {
    if (str === 'ui' || str === 'ux') {
        str = str.toUpperCase();
    } else {
        str = str.substring(0, 1).toUpperCase() + str.substring(1);
    }

    return str;
};

