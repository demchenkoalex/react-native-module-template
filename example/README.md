# example

## Getting Started

```bash
yarn
```

for iOS:

```bash
npx pod-install
```

To run the app use:

```bash
yarn ios
```

or

```bash
yarn android
```

## Updating project

1. Remove current `example` project
2. Create a project named `example` using [react-native-better-template](https://github.com/demchenkoalex/react-native-better-template)
3. Revert `README.md` so you can see this guide
3. In `tsconfig.json` add

```json
"baseUrl": ".",
"paths": {
  "react-native-module-template": ["../src"]
},
```

4. Check the difference in `metro.config.js` and combine all
5. Revert `App.tsx`
6. Check the difference in `settings.gradle` and combine all
7. Check the difference in `android/app/build.gradle` and combine all
7. Check the difference in `MainApplication.kt` and combine all
8. Open new `example` project in Xcode, right click on the `Libraries` folder, select "Add Files to". Navigate to the library root, `ios` folder, select `RNModuleTemplateModule.xcodeproj`. Deselect "Copy items if needed", click add. Go to the `Build Phases` of the `example` target, "Link Binary with Libraries", click +, search for the `libRNModuleTemplateModule.a`, click add.
