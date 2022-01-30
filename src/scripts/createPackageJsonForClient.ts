/**
 * A simple script to copy current version from main package.json and create a client version
 */

import {readFileSync, writeFileSync} from 'fs';

export interface CreatePackageJson {
    parentDir?: string; // parent to clone defaults to 'package.json'
    dir: string; // the dir to write this package.json to defaults to 'dist-client/package.json'
    name: string;
    description: string;
    dependencies: any; // object
}
/**
 * Re-usable method for generating client package.json
 * @param clientPackageName
 */
export const createClientPackageJson = async (args: CreatePackageJson): Promise<Object> => {
    const {
        parentDir = 'package.json',
        name,
        dependencies,
        description,
        dir = 'dist-client/package.json',
    } = args;
    const packageFile: any = await readFileSync(parentDir, {encoding: 'utf8'});
    const packageContentJSON = JSON.parse(packageFile);

    const newPackage: Object = {
        ...packageContentJSON,
        name,
        description,
        dependencies: {
            // make it only one dep for easy client react .e.t.c
            'graphql-tag': '^2.12.5',
            ...dependencies,
        },
        devDependencies: {}, // make it empty
        peerDependencies: {}, // make it empty
        scripts: {}, // empty scripts
    };

    // console.log('new packageJson file', newPackage);

    writeFileSync(dir, JSON.stringify(newPackage), {
        encoding: 'utf8',
    });

    return newPackage;
};
