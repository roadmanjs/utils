/**
 * Define all models that can should be morphed
 */
import {ExportDeclarationStructure, StructureKind} from 'ts-morph';

import {InterfaceDefinition} from './interface';
import {toSnakeUpper} from '../utils/text.utils';
import {writeTsFile} from './writter';

export interface Consts {
    name: string;
    value: any;
    leadingTrivia?: string;
}

export interface MorpheusArgs {
    filename: string;
    consts: Consts[];
    interfaces?: InterfaceDefinition[]; // todo
}
/**
 * Morpheus in action
 */
export const writeAllFilesToProject = async (
    args: MorpheusArgs[],
    path: string,
    pathToFolder?: string
) => {
    // write each file
    const writeFilesTasks = args.map((arg) => {
        const {consts: constStatements, filename, interfaces} = arg;
        const nameSNAKE_CASE = toSnakeUpper(filename);

        return {
            filename: nameSNAKE_CASE,
            task: writeTsFile({
                pathToFolder,
                pathToTs: path,
                filename: nameSNAKE_CASE,
                variables: constStatements.map((con) => ({
                    name: con.name,
                    initializer: JSON.stringify(con.value),
                    // leadingTrivia: (writer) => {
                    //     writer.writeLine('\n');

                    //     if (con?.leadingTrivia) {
                    //         writer.writeLine(con.leadingTrivia);
                    //     }
                    // },
                    // trailingTrivia: (writer) => writer.writeLine('\n'),
                })),
                interfaces,
            }),
        };
    });

    //  write all files
    await Promise.all(writeFilesTasks.map((i) => i.task));

    // write all exports
    const allFileExports: ExportDeclarationStructure[] = writeFilesTasks
        .map((i) => i.filename)
        .map((c) => ({
            kind: StructureKind.ExportDeclaration,
            //   namespaceExport: "*",
            moduleSpecifier: `./${c}`,
        }));

    // write final index file
    await writeTsFile({
        pathToFolder,
        pathToTs: path,
        filename: 'index',
        exports: allFileExports,
    });

    return true;
};

export const createIndexExports = async (filesname: string[], pathToFolder: string, path: string) => {
    // write all exports
    const allFileExports: ExportDeclarationStructure[] = filesname.map((c) => ({
        kind: StructureKind.ExportDeclaration,
        //   namespaceExport: "*",
        moduleSpecifier: `./${c}`,
    }));

    // write final index file
    await writeTsFile({
        pathToFolder,
        pathToTs: path,
        filename: 'index',
        exports: allFileExports,
    });
};

export * from './interface';
export * from './writter';
