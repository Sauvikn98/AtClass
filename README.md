# AtClass (Attendance Tracking App) <img src = "https://user-images.githubusercontent.com/46704901/193746358-2f474c3a-bce9-4a3f-8eae-91ad24d757ff.png" width="20"> 


<img src = "https://user-images.githubusercontent.com/46704901/193746849-a07850e0-addb-4672-86da-bc1db82c7f01.jpg" width="200"> <img src = "https://user-images.githubusercontent.com/46704901/193746890-a3acf38e-2796-4cac-a9fb-66b13ff3ca1a.jpg" width="200"> <img src = "https://user-images.githubusercontent.com/46704901/193746950-173991b4-e029-4340-be1d-bbad3332703d.jpg" width="200"> <img src = "https://user-images.githubusercontent.com/46704901/193746962-c36536c6-a792-4c65-b688-b8b1d9b01f1c.jpg" width="200">
<br>
<br>


## About the project

AtClass is a an app that helps you to track and manage your daily attendance, be it for your ongoing current semester, your school etc.
It helps you to never miss on that 75% mark of average attendance your teacher criticizes you for. You can easily take a stay back at home without
worrying for your 75% average percentage as per the current UGC or AICTE norms laid back

AtClass is under build process🔨🛠. If you wish to contribute to build a product of excellence clone this repository and follow the [Installation](https://github.com/Sauvikn98/AtClass/blob/main/README.md#installation) steps.


## Installation

1) Set up react-native in your system using this [link](https://reactnative.dev/docs/environment-setup)

2) Clone the repo and install the dependencies:

```bash
> npm install
```
It will install the required dependencies for the project.

3) Set up firebase for your react-native app using this [link](https://console.firebase.google.com/)

4) Download google-services.json file and store it in the ``` android/app/ ``` folder

5) To run the app on an android device or emulator, go to the root directory and run:

```bash
> npx react-native run-android
```

## Release

1. Generating an upload key using ``` keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000 ```
2. Setting up Gradle Variables-
      a) Place the  ```my-upload-key.keystore``` file under the ```android/app``` directory in your project folder.
      b) Edit the file ```~/.gradle/gradle.properties``` or ```android/gradle.properties```, and add the following (replace ***** with the correct keystore password,  alias and key password)
      
      ```
      MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
      MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
      MYAPP_UPLOAD_STORE_PASSWORD=*****
      MYAPP_UPLOAD_KEY_PASSWORD=*****
      ```
3. Adding signing config to your app's Gradle config
   ```
   ...
    android {
       ...
       defaultConfig { ... }
       signingConfigs {
           release {
               if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                   storeFile file(MYAPP_UPLOAD_STORE_FILE)
                   storePassword MYAPP_UPLOAD_STORE_PASSWORD
                   keyAlias MYAPP_UPLOAD_KEY_ALIAS
                   keyPassword MYAPP_UPLOAD_KEY_PASSWORD
               }
           }
       }
       buildTypes {
           release {
               ...
               signingConfig signingConfigs.release
            }
        }
    }
   ...
   ```
4. Generating the release AAB

    ```
    cd android
    ./gradlew assembleRelease
    ```

### Here is a list of features that Atclass is providing:

1. User can register with their email address
2. Once registered, user will be redirected to home page
3. User can Add a subject based on his/her current course and add other required details such as teacher name and total number of class for that subject 
4. Users can edit or delete a subject based on his/her choice
5. User can logout from the app

## Future plans

- Update Attendance based on Geographical location of the student
- Based on a routine update attendance using location
- Give a prompt to the user whether he/she is actually present in the class
- Better UI/UX using robust and smooth architecture


## License

[MIT](https://choosealicense.com/licenses/mit/)
