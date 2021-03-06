import 'mocha';

import {InterfaceDefinition, createInterfaceFromClass} from './morpheus/interface';
import {MorpheusArgs, writeAllFilesToProject} from './morpheus';

import { createIndexExports } from '.';
import {expect} from 'chai';

class GClass {
    j: string = 'j string';

    g: number = 10;

    e: Date = new Date();

    a: any = [];
}

let demoFiles: MorpheusArgs[] = [
    {
        filename: 'somefile_name_nice',

        exports: [
            { kind: 10, moduleSpecifier: "./nicefile"}
        ]
        // consts: [
        //     {
        //         name: 'GoodConst',
        //         value: 'somevalue',
        //     },
        // ],
        // interfaces: [
        //     {
        //         name: 'GClass',
        //         properties: [
        //             {name: 'j', type: 'string'},
        //             {name: 'g', type: 'number'},
        //             {name: 'e', type: 'Date'},
        //             {name: 'a', type: 'object'},
        //         ],
        //     },
        // ],
    },
    {
        filename: 'somefile_name2',
        consts: [
            {
                name: 'GoodConst',
                value: 'somevalue',
            },
        ],
        // interfaces: [
        //     {
        //         name: 'GClass',
        //         properties: [
        //             {name: 'j', type: 'string'},
        //             {name: 'g', type: 'number'},
        //             {name: 'e', type: 'Date'},
        //             {name: 'a', type: 'object'},
        //         ],
        //     },
        // ],
    },
];

describe('Morpheus', () => {
    // it('it should createIndexExports',async () => {
    //     const indexFile = createIndexExports(["path1", "path2"], ".", ".");
    // });
    
    let ginterfaceDefinition: InterfaceDefinition = null;
    it('it should write TS files with consts and export them', async () => {
        const project = await writeAllFilesToProject(demoFiles, '.', 'src/client');
        expect(project).to.be.true;
    });

    it('it should create a interface definition from a class', async () => {
        ginterfaceDefinition = createInterfaceFromClass(GClass);
        expect(ginterfaceDefinition).to.not.be.null;
    });

    it('it should create TS files with consts and interfaces', async () => {
        // Add the create ginterfaceDefinition
        demoFiles[0].interfaces = [ginterfaceDefinition];

        const project = await writeAllFilesToProject(demoFiles, '.', 'src/client');
        expect(project).to.be.true;
    });

    // TODO for interfaces
});
