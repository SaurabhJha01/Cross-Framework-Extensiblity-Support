# Cross Framework Extensiblity Support
The sample consists of an Angular mono repo in which any third party framework application can be loaded and not only that but also the third party application is able to modify the host angular application, use its features and responds to its events. So, it allowes 3rd party developers of any framework be it angular, react or vue to create their onw extensions and not only load them inside the host application but also extend the host application features like providing their own data to host application but use their
mechanism to achieve the feature or use observer design pattern and singleton design patterns to subscribe the host application features, get the result from host application and then do their own stuff. So, every sort of modification and usage of angular host application would be possible with 3rd party developers of any framework.

To support extensibility between angular host application and other third party angular applications, the architecture of host angular application needs to be distributed
across angular libraries and state management should be done by redux.

However, in this sample we are not just supporting extensiblity between angular applications but have extended them to any framework and for that there needs to be extra layer 
added in the architetcure of host angular APp which is web component. So, the host application needs to be architected based on Web component and web component acts as wrapper for Angular libraries so that any framework can communicate to host application using the web component because angular libraries can be consumed only in angular application, so, we have to bring in web component. 

web component is mainly used to create reusable ui components and not for extensiblitly but here it's basic nature had to be moulded a bit and coupled with angular library,  dom and module federation or SystemJS in order to support extensiblity.


To have the optimize performance, the host application and the third party applications have to be compiled before they are rendered. Extensiblity has been achieved with AOT compilation and there is no need to do JIT compilation which
lowers down the loading performance of the application.

The sample consists of the below applications and files :

hostAngularApp -> Angular host application

thirdPartyAngularApp - > Angular third party application

thirdPartyReactApp -> React third party application

nodeServerApp -> The server application which provides the compiled files of third party application to host application

CustomAnalystModuleConfig.json -> The file which contains the third party application information which would be read by node-js-server and and then pass it to host application
to load the third party application.

base-app-lib-0.0.26.tgz -> The angular library compiled file which needs to be installed for Angular third party application to interact with host angular application.
It would also be required by the angular host application web component when any third party react application wants to trigger the hots application functionality.

Use yarn to install dependencies and run the host applictaion baseApp using yarn start command and also run the node server using nodemon nodeServer.js


 Angular Host Application/Angular third party  application :
 
The third party angular applications can be loaded via Web pack 5 Module federation inside the angular host application which is called BaseApp here.
Through Angular libraries the host angular application  is able to share its code with the third party angular application.
To allow third party angular application to modify the host angular application, the singleton version of angular library has to be shared.
For that, there is a setting inside webpack config where we add the entry of the angular library and mark it as Singleton.
Both the angular hot application and third party angular applications have to be AOT compiled.

 Angular Host Application/Non-Angular third party  application :
 
 React is choosen as non angular framework in this POC but it will work with any other framework like Vue also.
 The third party react application can be loaded via Web pack 5 Module federation inside the angular host application which is called BaseApp here.
 It can be also be loaded without webpack 5 Module federation support and in any build system if we concat the compiled non-Angular application files into a single file usingjscat plugin
 and then fed that js file to Angular host application using dynamic script.
 
Non-angular application has to be converted into a web component and then only the host angular application is able to load them
Non-angular application can communicate with angular host application and use its features or modify it through web components again. But, this time
it will be angular host application that needs to be developed as a collection of angular web components.




/** To run the whole system */

1. Copy paste the nodeServer application and run npm install from the directory where it is pasted
2. The run nodemon nodeServer.js

3. Go to directory where third party react application is pasted. Run npm install and then run npm run build and then npm run package.
4. Copy the compiled and concated js file of React application into any folder and make changes in the nodejs server application according to the path (The react-web-element section of nodeJS server application needs to be modified according to the folder where this file is copied.
)
5.   Go to directory where hostAngularApp is pasted. Run yarn install and then yarn start to start the host angular application .React application can be seen loaded when you click the legend icon. The react application can be seen
as modifying the hoist angular application where 3 different functionalities of host app is being used by this third party react extension.

6. To also include some other Angular third party application, then go to directory where extComp has been pasted.
  Run ng build --prod and copy its compiled contents to aany folder but make sure the cooresponding folder which has been choosen must be included in the nodeJS server application.

7. To see thi third party angular application, click on the add icon and it can also be seen as interacting and modifying the default behaviour of host application.

8. So, in a single host application we can see both these third party applications one React and other one Angular
can be loaded and vapability has been provided to them to not only plug their individual capability but also use
the host application features and even go to the extent of modifying yhe default behaviour of host application.



