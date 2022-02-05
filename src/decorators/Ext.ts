/**
 * Extend a class
 * @param bCtor 
 * @returns 
 */
export function Ext(bCtor: any) 
{
    return (aCtor: any) => 
    {
        Object.getOwnPropertyNames(bCtor.prototype).forEach(name => {
            aCtor.prototype[name] = bCtor.prototype[name];
        });
    }
}