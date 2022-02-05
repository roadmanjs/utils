import {
  ExportDeclarationStructure,
  InterfaceDeclarationStructure,
  OptionalKind,
  Project,
  StatementedNodeStructure,
  StructureKind,
  VariableDeclarationKind,
  VariableDeclarationStructure
} from "ts-morph";

interface WriteFileProps extends StatementedNodeStructure {
  pathToTs: string;
  filename: string;
  variables?: OptionalKind<VariableDeclarationStructure>[];
  interfaces?: OptionalKind<InterfaceDeclarationStructure>[];
  exports?: OptionalKind<ExportDeclarationStructure>[];
}

export const writeTsFile = async (props: WriteFileProps): Promise<any> => {
  const { filename, statements, variables, interfaces, exports, pathToTs, } = props;
  
  const project = new Project({
    tsConfigFilePath: `${pathToTs}/tsconfig.json`,
    skipAddingFilesFromTsConfig: true,
  });

  const sourceFile = project.createSourceFile(
    `${pathToTs}/${filename}.ts`,
    {},
    { overwrite: true }
  );

  if (variables) {
    sourceFile.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const, // defaults to "let"
      isExported: true,
      declarations: variables,
    });
  }

  if (interfaces) {
    sourceFile.addInterfaces(interfaces);
  }

  if(exports){
    sourceFile.addExportDeclarations(exports)
  }

  return await sourceFile.save();
};
