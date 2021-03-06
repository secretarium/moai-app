const licenseChecker = require('license-checker');
const fse = require('fs-extra');

// Output file
const file = './public/disclaimer.txt';

// license-checker configuration
licenseChecker.init(
    {
        start: './',
        production: true,
        excludePrivatePackages: true
    },
    (err, packageJson) => {
        if (err) {
            console.error(err);
        } else {
            createDisclaimer(packageJson);
        }
    }
);

// Generates license disclaimer
const createDisclaimer = packageJson => {
    const licenses = [];
    Object.keys(packageJson).forEach((key) => {
        let obj = packageJson[key];
        obj.module = key;
        licenses.push(obj);
    });

    licenses.forEach(license => {
        copyLicense(license);
    });
};

// Copies each license to the disclaimer file
const copyLicense = item => {
    if (item.licenseFile && !isMarkDown(item.licenseFile)) {
        try {
            const stream = fse.createWriteStream(file, { flags: 'a' });
            const licenseFile = fse.readFileSync(`${item.licenseFile}`, 'utf8');
            stream.write(`${item.module}\n${item.licenses}\n<${item.repository}>\n\n` + licenseFile + '\n\n************************************************\n\n');
        } catch (err) {
            console.error(err);
        }
    }
};

// Checks if there is a readme file instead of license
const isMarkDown = filename => {
    if (filename) {
        const pathArray = filename.split('/');
        const extension = pathArray[pathArray.length - 1];
        if (
            (extension.toUpperCase() === 'README.MD') ||
            (extension.toUpperCase() === 'README.MARKDOWN')
        ) {
            return true;
        }
    }
    return false;
};

