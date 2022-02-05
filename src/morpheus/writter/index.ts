import {
    ExportDeclarationStructure,
    InterfaceDeclarationStructure,
    OptionalKind,
    Project,
    StatementedNodeStructure,
    StructureKind,
    VariableDeclarationKind,
    VariableDeclarationStructure,
} from 'ts-morph';

import {IType} from '../interface';

interface FileInterfaces {
    name: string;
    properties: {name: string; type: IType}[];
}
interface WriteFileProps extends StatementedNodeStructure {
    pathToTs: string;
    filename: string;
    variables?: OptionalKind<VariableDeclarationStructure>[];
    interfaces?: FileInterfaces[];
    exports?: OptionalKind<ExportDeclarationStructure>[];
}

export const writeTsFile = async (props: WriteFileProps): Promise<any> => {
    const {filename, statements, variables, interfaces, exports, pathToTs} = props;

    const project = new Project({
        tsConfigFilePath: `${pathToTs}/tsconfig.json`,
        skipAddingFilesFromTsConfig: true,
    });

    const sourceFile = project.createSourceFile(
        `${pathToTs}/${filename}.ts`,
        {},
        {overwrite: true}
    );

    if (variables) {
        sourceFile.addVariableStatement({
            declarationKind: VariableDeclarationKind.Const, // defaults to "let"
            isExported: true,
            declarations: variables,
        });
    }

    if (interfaces) {
        interfaces.map((interfc) => {
            const interfaceDef = sourceFile.addInterface({
                name: interfc.name,
            });

            interfc.properties.map((proper) => {
                interfaceDef.addProperty({
                    name: proper.name,
                    type: proper.type,
                });
            });
        });
    }

    if (exports) {
        sourceFile.addExportDeclarations(exports);
    }

    return await sourceFile.save();
};
