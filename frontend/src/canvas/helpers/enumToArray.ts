const enumToArray = (enumObject: any) => {
    return Object.keys(enumObject).map((key) => ({
        key: key,
        value: enumObject[key]
    }));
};

export default enumToArray;
