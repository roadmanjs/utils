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
import {IType, InterfaceDefinition} from '../interface';

import isEmpty  from 'lodash/isEmpty';

interface WriteFileProps extends StatementedNodeStructure {
    pathToFolder?: string; //
    pathToTs: string;
    filename: string;
    variables?: OptionalKind<VariableDeclarationStructure>[];
    interfaces?: InterfaceDefinition[];
    exports?: OptionalKind<ExportDeclarationStructure>[];
}

export const writeTsFile = async (props: WriteFileProps): Promise<any> => {
    const {filename, statements, variables, interfaces, exports, pathToTs, pathToFolder} = props;

    const project = new Project({
        tsConfigFilePath: `${pathToTs}/tsconfig.json`,
        skipAddingFilesFromTsConfig: true,
    });

    const sourceFile = project.createSourceFile(
        `${pathToFolder || pathToTs}/${filename}.ts`,
        {},
        {overwrite: true}
    );

    if (!isEmpty(interfaces)) {
        interfaces.map((interfc) => {
            const interfaceDef = sourceFile.addInterface({
                name: interfc.name,
                isExported: true,
            });

            interfc.properties.map((proper) => {
                interfaceDef.addProperty({
                    name: proper.name,
                    type: proper.type,
                });
            });
        });
    }

    if (!isEmpty(variables)) {
        sourceFile.addVariableStatement({
            declarationKind: VariableDeclarationKind.Const, // defaults to "let"
            isExported: true,
            declarations: variables,
        });
    }

    if (!isEmpty(exports)) {
        sourceFile.addExportDeclarations(exports);
    }

    return await sourceFile.save();
};
