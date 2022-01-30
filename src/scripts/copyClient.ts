import shelljs from 'shelljs';

export interface DirArg {
    cmd: 'rm' | 'mkdir' | 'cp';
    dir: string; // folder
    newDir?: string; // only for cp
}

/**
 * Small util to build a dir
 * @param args
 */
export const buildDirs = (args: DirArg[]): boolean => {
    try {
        args.forEach((arg) => {
            const {cmd, dir, newDir} = arg;

            if (cmd === 'cp') {
                shelljs.cp('-rf', dir, newDir);
            }

            if (cmd === 'mkdir') {
                shelljs.mkdir('-p', dir);
            }

            if (cmd === 'rm') {
                shelljs.rm('-rf', dir);
            }
        });

        return true;
    } catch (error) {
        throw error;
    }
};
