import 'mocha';

import {buildDirs} from './scripts';
import {createClientPackageJson} from '.';
import {expect} from 'chai';

describe('Scripts - Test', () => {
    it('should create a dir under dist-client', () => {
        const createDistClient = buildDirs([{cmd: 'mkdir', dir: 'dist-client'}]);
        expect(createDistClient).to.be.true;
    });

    it('should copy a file to dist-client', () => {
        const createREADMEinDistClient = buildDirs([
            {cmd: 'cp', dir: 'README.md', newDir: 'dist-client/README.md'},
        ]);
        expect(createREADMEinDistClient).to.be.true;
    });

    it('should create client package.json in dist-client', async () => {
        const createREADMEinDistClient = await createClientPackageJson({
            name: '@roadmanjs/someclient',
            description: 'some cool description about this package',
        });
        expect(createREADMEinDistClient).to.be.not.null;
    });

    it('should delete dist-client', () => {
        const createREADMEinDistClient = buildDirs([{cmd: 'rm', dir: 'dist-client'}]);
        expect(createREADMEinDistClient).to.be.true;
    });
});
