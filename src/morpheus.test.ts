import 'mocha';

import {MorpheusArgs, writeAllFilesToProject} from './morpheus';

import {expect} from 'chai';

const demoFiles: MorpheusArgs[] = [
    {
        filename: 'somefile_name',
        consts: [
            {
                name: 'GoodConst',
                value: 'somevalue',
                leadingTrivia: '// some text before the definition',
            },
        ],
    },
];

describe('Morpheus', () => {
    it('it should write TS files with consts and export them', async () => {
       const project =  await writeAllFilesToProject(demoFiles, "../");
       expect(project).to.be.true;
    });
});
