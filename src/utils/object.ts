export const removeUndefinedFields = (obj: object): object => {
    const newObject = {};
    const objectEntries = Object.entries(obj);
    for (let index = 0; index < objectEntries.length; index += 1) {
        const [key, value] = objectEntries[index];
        if (value !== undefined) {
            newObject[key] = value;
        }
    }
    return newObject;
};
