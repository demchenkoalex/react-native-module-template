#!/usr/bin/env node

'use strict'

const fs = require('fs')
const readline = require('readline')

/*
  PARAMS USED IN THE TEMPLATE PROJECT
*/
const DEFAULT_NAME = 'react-native-module-template'
const DEFAULT_SHORT_NAME = 'RNModuleTemplate'
const DEFAULT_URL =
  'https://github.com/demchenkoalex/react-native-module-template#readme'
const DEFAULT_GIT_URL =
  'https://github.com/demchenkoalex/react-native-module-template.git'
const DEFAULT_AUTHOR_NAME = 'Alex Demchenko'
const DEFAULT_AUTHOR_EMAIL = 'alexdemchenko@yahoo.com'

/*
  LIST OF ALL QUESTIONS
*/
const QUESTION_NAME = `Enter library name (use kebab-case) (default ${DEFAULT_NAME}): `
const QUESTION_SHORT_NAME = `Enter library short name (used to name ObjC and Java classes, use PascalCase) (default ${DEFAULT_SHORT_NAME}): `
const QUESTION_URL = `Enter library homepage (default ${DEFAULT_URL}): `
const QUESTION_GIT_URL = `Enter library git url (default ${DEFAULT_GIT_URL}): `
const QUESTION_AUTHOR_NAME = `Enter author name (default ${DEFAULT_AUTHOR_NAME}): `
const QUESTION_AUTHOR_EMAIL = `Enter author email (default ${DEFAULT_AUTHOR_EMAIL}): `

/*
  PASS `js-only` ARGUMENT TO REMOVE ALL NATIVE CODE
*/
const jsOnly = process.argv.slice(2).includes('js-only')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

if (jsOnly) {
  /*
    JS ONLY MODE
    REMOVE `QUESTION_SHORT_NAME` SINCE IT IS USED ONLY IN THE NATIVE CODE
    REMOVE `QUESTION_GIT_URL` SINCE IT IS USED ONLY IN THE .PODSPEC FILE
  */
  rl.question(QUESTION_NAME, name => {
    rl.question(QUESTION_URL, url => {
      rl.question(QUESTION_AUTHOR_NAME, authorName => {
        rl.question(QUESTION_AUTHOR_EMAIL, authorEmail => {
          renameFiles(
            name || undefined,
            undefined,
            url || undefined,
            undefined,
            authorName || undefined,
            authorEmail || undefined
          )
          rl.close()
        })
      })
    })
  })
} else {
  /*
    NORMAL MODE
    ALL QUESTIONS
  */
  rl.question(QUESTION_NAME, name => {
    rl.question(QUESTION_SHORT_NAME, shortName => {
      rl.question(QUESTION_URL, url => {
        rl.question(QUESTION_GIT_URL, gitUrl => {
          rl.question(QUESTION_AUTHOR_NAME, authorName => {
            rl.question(QUESTION_AUTHOR_EMAIL, authorEmail => {
              renameFiles(
                name || undefined,
                shortName || undefined,
                url || undefined,
                gitUrl || undefined,
                authorName || undefined,
                authorEmail || undefined
              )
              rl.close()
            })
          })
        })
      })
    })
  })
}

const replaceDefaultShortName = (data, shortName) => {
  return data.replace(new RegExp(DEFAULT_SHORT_NAME, 'g'), shortName)
}

const renameFiles = (
  name = DEFAULT_NAME,
  shortName = DEFAULT_SHORT_NAME,
  url = DEFAULT_URL,
  gitUrl = DEFAULT_GIT_URL,
  authorName = DEFAULT_AUTHOR_NAME,
  authorEmail = DEFAULT_AUTHOR_EMAIL
) => {
  try {
    /*
      REMOVE .GIT
    */
    if (fs.existsSync('.git')) {
      fs.rmdirSync('.git', { recursive: true })
    }
    /*
      CLEAR README.MD
    */
    fs.writeFileSync('README.md', '')
    /*
      JS ONLY MODE - REMOVE PODSPEC
      NORMAL MODE - RENAME PODSPEC AND REPLACE GIT URL
    */
    if (jsOnly) {
      fs.unlinkSync(`${DEFAULT_NAME}.podspec`)
    } else {
      fs.renameSync(`${DEFAULT_NAME}.podspec`, `${name}.podspec`)
      const podspecData = fs.readFileSync(`${name}.podspec`).toString()
      const newPodspecData = podspecData.replace(DEFAULT_GIT_URL, gitUrl)
      fs.writeFileSync(`${name}.podspec`, newPodspecData)
    }
    /*
      MODIFY PACKAGE.JSON
      JS ONLY MODE - SUPPLY ONLY LIB FOLDER IN PACKAGE.JSON
    */
    const packageData = fs.readFileSync('package.json').toString()
    let newPackageData = packageData
      .replace(new RegExp(DEFAULT_NAME, 'g'), name)
      .replace(DEFAULT_AUTHOR_NAME, authorName)
      .replace(DEFAULT_AUTHOR_EMAIL, authorEmail)
      .replace(DEFAULT_URL, url)
      .replace('React Native Module Template', '')
      .replace(/"version": ".+"/g, '"version": "1.0.0"')
    if (jsOnly) {
      newPackageData = newPackageData.replace(
        /"files": \[.+\],/s,
        '"files": [\n    "lib"\n  ],'
      )
    }
    fs.writeFileSync('package.json', newPackageData)
    /*
      UPDATE AUTHOR IN LICENSE
    */
    const licenseData = fs.readFileSync('LICENSE').toString()
    const newLicenseData = licenseData.replace(DEFAULT_AUTHOR_NAME, authorName)
    fs.writeFileSync('LICENSE', newLicenseData)
    /*
      UPDATE EXAMPLE TSCONFIG.JSON
    */
    const tsConfigData = fs.readFileSync('example/tsconfig.json').toString()
    const newTsConfigData = tsConfigData.replace(DEFAULT_NAME, name)
    fs.writeFileSync('example/tsconfig.json', newTsConfigData)
    /*
      JS ONLY MODE
    */
    if (jsOnly) {
      /*
        REMOVE NATIVE MODULES FROM INDEX.TSX
      */
      const indexData = fs.readFileSync('src/index.tsx').toString()
      const newIndexData = indexData
        .replace(
          new RegExp(
            `\nexport default NativeModules.${DEFAULT_SHORT_NAME}\n`,
            'g'
          ),
          ''
        )
        .replace('NativeModules, ', '')
      fs.writeFileSync('src/index.tsx', newIndexData)
      /*
        REMOVE NATIVE MODULES FROM APP.TSX
      */
      const appData = fs.readFileSync('example/src/App.tsx').toString()
      const newAppData = appData
        .replace(`${DEFAULT_SHORT_NAME}, `, '')
        .replace(DEFAULT_SHORT_NAME, "''")
        .replace(DEFAULT_NAME, name)
      fs.writeFileSync('example/src/App.tsx', newAppData)
      /*
        REMOVE NATIVE FOLDERS
      */
      fs.rmdirSync('ios', { recursive: true })
      fs.rmdirSync('android', { recursive: true })
    } else {
      /* NORMAL MODE */
      /*
        RENAME NATIVE MODULES IN INDEX.TSX
      */
      const indexData = fs.readFileSync('src/index.tsx').toString()
      const newIndexData = replaceDefaultShortName(indexData, shortName)
      fs.writeFileSync('src/index.tsx', newIndexData)
      /*
        RENAME NATIVE MODULES IN APP.TSX
      */
      const appData = fs.readFileSync('example/src/App.tsx').toString()
      const newAppData = replaceDefaultShortName(appData, shortName).replace(
        DEFAULT_NAME,
        name
      )
      fs.writeFileSync('example/src/App.tsx', newAppData)
      /*
        RENAME XCSCHEME FILE
      */
      fs.renameSync(
        `ios/${DEFAULT_SHORT_NAME}.xcodeproj/xcshareddata/xcschemes/${DEFAULT_SHORT_NAME}.xcscheme`,
        `ios/${DEFAULT_SHORT_NAME}.xcodeproj/xcshareddata/xcschemes/${shortName}.xcscheme`
      )
      const schemeData = fs
        .readFileSync(
          `ios/${DEFAULT_SHORT_NAME}.xcodeproj/xcshareddata/xcschemes/${shortName}.xcscheme`
        )
        .toString()
      const newSchemeData = replaceDefaultShortName(schemeData, shortName)
      fs.writeFileSync(
        `ios/${DEFAULT_SHORT_NAME}.xcodeproj/xcshareddata/xcschemes/${shortName}.xcscheme`,
        newSchemeData
      )
      /*
        RENAME XCODEPROJ FOLDER
      */
      fs.renameSync(
        `ios/${DEFAULT_SHORT_NAME}.xcodeproj`,
        `ios/${shortName}.xcodeproj`
      )
      /*
        MODIFY PROJECT.PBXPROJ
      */
      const projectData = fs
        .readFileSync(`ios/${shortName}.xcodeproj/project.pbxproj`)
        .toString()
      const newProjectData = replaceDefaultShortName(
        projectData,
        shortName
      ).replace(DEFAULT_AUTHOR_NAME, authorName)
      fs.writeFileSync(
        `ios/${shortName}.xcodeproj/project.pbxproj`,
        newProjectData
      )
      /*
        RENAME AND MODIFY HEADER FILE
      */
      fs.renameSync(`ios/${DEFAULT_SHORT_NAME}.h`, `ios/${shortName}.h`)
      const headerData = fs.readFileSync(`ios/${shortName}.h`).toString()
      const newHeaderData = replaceDefaultShortName(
        headerData,
        shortName
      ).replace(DEFAULT_AUTHOR_NAME, authorName)
      fs.writeFileSync(`ios/${shortName}.h`, newHeaderData)
      /*
        RENAME AND MODIFY IMPLEMENTATION FILE
      */
      fs.renameSync(`ios/${DEFAULT_SHORT_NAME}.m`, `ios/${shortName}.m`)
      const implementationData = fs
        .readFileSync(`ios/${shortName}.m`)
        .toString()
      const newImplementationData = replaceDefaultShortName(
        implementationData,
        shortName
      ).replace(DEFAULT_AUTHOR_NAME, authorName)
      fs.writeFileSync(`ios/${shortName}.m`, newImplementationData)
      /*
        GENERATE ANDROID PACKAGE NAME FROM AUTHOR AND MODULE NAMES
      */
      const androidPackageAuthorName = authorName
        .replace(/\s/g, '')
        .toLowerCase()
      const androidPackageModuleName = name.replace(/-/g, '').toLowerCase()
      const androidPackageName = `com.${androidPackageAuthorName}.${androidPackageModuleName}`
      /*
        GENERATE CURRENT ANDROID PACKAGE NAME FROM DEFAULT AUTHOR AND MODULE NAMES
      */
      const defaultAndroidPackageAuthorName = DEFAULT_AUTHOR_NAME.replace(
        /\s/g,
        ''
      ).toLowerCase()
      const defaultAndroidPackageModuleName = DEFAULT_NAME.replace(
        /-/g,
        ''
      ).toLowerCase()
      const defaultAndroidPackageName = `com.${defaultAndroidPackageAuthorName}.${defaultAndroidPackageModuleName}`
      /*
        RENAME PACKAGE IN ANDROID.MANIFEST
      */
      const manifestData = fs
        .readFileSync('android/src/main/AndroidManifest.xml')
        .toString()
      const newManifestData = manifestData.replace(
        defaultAndroidPackageName,
        androidPackageName
      )
      fs.writeFileSync('android/src/main/AndroidManifest.xml', newManifestData)
      /*
        RENAME PACKAGE FOLDERS
      */
      fs.renameSync(
        `android/src/main/java/com/${defaultAndroidPackageAuthorName}`,
        `android/src/main/java/com/${androidPackageAuthorName}`
      )
      fs.renameSync(
        `android/src/main/java/com/${androidPackageAuthorName}/${defaultAndroidPackageModuleName}`,
        `android/src/main/java/com/${androidPackageAuthorName}/${androidPackageModuleName}`
      )
      /*
        RENAME AND MODIFY JAVA FILES
      */
      fs.renameSync(
        `android/src/main/java/com/${androidPackageAuthorName}/${androidPackageModuleName}/${DEFAULT_SHORT_NAME}Module.java`,
        `android/src/main/java/com/${androidPackageAuthorName}/${androidPackageModuleName}/${shortName}Module.java`
      )
      const javaModuleData = fs
        .readFileSync(
          `android/src/main/java/com/${androidPackageAuthorName}/${androidPackageModuleName}/${shortName}Module.java`
        )
        .toString()
      const newJavaModuleData = replaceDefaultShortName(
        javaModuleData,
        shortName
      ).replace(defaultAndroidPackageName, androidPackageName)
      fs.writeFileSync(
        `android/src/main/java/com/${androidPackageAuthorName}/${androidPackageModuleName}/${shortName}Module.java`,
        newJavaModuleData
      )
      fs.renameSync(
        `android/src/main/java/com/${androidPackageAuthorName}/${androidPackageModuleName}/${DEFAULT_SHORT_NAME}Package.java`,
        `android/src/main/java/com/${androidPackageAuthorName}/${androidPackageModuleName}/${shortName}Package.java`
      )
      const javaPackageData = fs
        .readFileSync(
          `android/src/main/java/com/${androidPackageAuthorName}/${androidPackageModuleName}/${shortName}Package.java`
        )
        .toString()
      const newJavaPackageData = replaceDefaultShortName(
        javaPackageData,
        shortName
      ).replace(defaultAndroidPackageName, androidPackageName)
      fs.writeFileSync(
        `android/src/main/java/com/${androidPackageAuthorName}/${androidPackageModuleName}/${shortName}Package.java`,
        newJavaPackageData
      )
      /*
        MODIFY EXAMPLE PROJECT.PBXPROJ
      */
      const exampleProjectData = fs
        .readFileSync('example/ios/example.xcodeproj/project.pbxproj')
        .toString()
      const newExampleProjectData = replaceDefaultShortName(
        exampleProjectData,
        shortName
      )
      fs.writeFileSync(
        'example/ios/example.xcodeproj/project.pbxproj',
        newExampleProjectData
      )
      /*
        MODIFY SETTINGS.GRADLE
      */
      const settingsData = fs
        .readFileSync('example/android/settings.gradle')
        .toString()
      const newSettingsData = settingsData.replace(
        new RegExp(DEFAULT_NAME, 'g'),
        name
      )
      fs.writeFileSync('example/android/settings.gradle', newSettingsData)
      /*
        MODIFY BUILD.GRADLE
      */
      const buildData = fs
        .readFileSync('example/android/app/build.gradle')
        .toString()
      const newBuildData = buildData.replace(
        new RegExp(DEFAULT_NAME, 'g'),
        name
      )
      fs.writeFileSync('example/android/app/build.gradle', newBuildData)
      /*
        MODIFY MAINAPPLICATION.JAVA
      */
      const mainApplicationData = fs
        .readFileSync(
          'example/android/app/src/main/java/com/example/MainApplication.java'
        )
        .toString()

      const newMainApplicationData = replaceDefaultShortName(
        mainApplicationData,
        shortName
      ).replace(defaultAndroidPackageName, androidPackageName)
      fs.writeFileSync(
        'example/android/app/src/main/java/com/example/MainApplication.java',
        newMainApplicationData
      )
    }
  } catch (err) {
    console.log(err)
  }
}
