import 'reflect-metadata';

import {
    InterfaceDefinition,
    MorpheusArgs,
    createInterfaceFromClass,
    writeAllFilesToProject,
} from '..';

import flatten from 'lodash/flatten';

interface ClientArgs {
    name: string;
    client: any; // client from any @couchset automation
    fragment: any;
};

interface Args {
    rootDir: string; // .
    destDir: string; // src/some/path
    clients: ClientArgs[]
};


/**
 * Write files to project
 * e.g clients from any @couchset automation
 * @param arg 
 */
export const writeAutomaticClient = async (arg: Args) => {

    const { rootDir, destDir, clients } = arg;

    const clientMorphs = clients.map((client) =>
        Object.keys(client.client).map((key) => {
            const clientName = client.name;
            const ClientValue = client.client[key];
            const clientFragmentValue: any = client.fragment;

            if (key === 'FRAGMENT') {
                const clientFragment = createInterfaceFromClass(clientFragmentValue);
                const clientPagination: InterfaceDefinition = {
                    name: `${clientName}Pagination`,
                    properties: [
                        {name: 'items?', type: `${clientName}[]` as any},
                        {name: 'hasNext?', type: 'boolean'},
                        {name: 'params?', type: 'object'},
                    ],
                };

                const contentFrag: MorpheusArgs = {
                    filename: `${clientName}.fragment`,
                    consts: [{name: `${clientName}Fragment`, value: ClientValue}],
                    interfaces: [clientFragment, clientPagination],
                };

                return contentFrag;
            }

            const contentFile: MorpheusArgs = {
                filename: `${clientName}.${key.toLowerCase()}`,
                consts: [{name: `${clientName}${key}`, value: ClientValue}],
            };
            return contentFile;
        })
    );

    const morphs: MorpheusArgs[] = [...flatten(clientMorphs)];

    await writeAllFilesToProject(morphs, rootDir, destDir);
};
