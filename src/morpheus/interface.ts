export type IType =
    | 'Date'
    | 'string'
    | 'number'
    | 'bigint'
    | 'boolean'
    | 'symbol'
    | 'undefined'
    | 'object'
    | 'function';

export interface KeyType {
    name: string;
    type: IType;
}
/**
 * Detect type of a key
 * Only dealing with 4 types for now
 * @param obj
 * @param key
 * @returns
 */
export const getPropertyType = (obj, key): IType => {
    if (obj[key] instanceof Date) {
        return 'Date';
    }

    if (typeof obj[key] === 'number') {
        return 'number';
    }

    if (typeof obj[key] === 'string') {
        return 'string';
    }

    // just return the default type
    return typeof obj[key];
};

export interface InterfaceProperty {
    name: string;
    type: IType;
}

interface InterfaceDefinition {
    name: string;
    properties: InterfaceProperty[];
}

/**
 * Create an interface from a class
 * @param Cls
 * @returns
 */
export const createInterfaceFromClass = (Cls: any): InterfaceDefinition => {
    // pass in class
    const CLS = new Cls();
    const keys = Object.getOwnPropertyNames(CLS); // got the keys

    const keysWithType: KeyType[] = keys.map((key) => {
        const keyType = getPropertyType(CLS, key);
        return {name: key, type: keyType};
    });

    const name = Cls.name;

    return {
        name,
        properties: keysWithType,
    };
};
