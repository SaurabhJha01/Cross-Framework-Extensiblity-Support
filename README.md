# Cross Framework Extensiblity Support
The sample consists of an Angular mono repo in which any third party framework application can be loaded and not only that but also the third party application is able to modify the host angular application, use its features and responds to its events.

The sample consists of the below applications and files :
BaseApp -> Angular host application
ExtComp - > Angular third party application
mfe4-React -> React third party application
node-js-server -> The server application which provides the compiled files of third party application to host application
CustomAnalystModuleConfig.json -> the file which contains the third party application information which would be read by node-js-server and and then pass it to host application
to load the third party application.


 Angular Host Application/Angular third party  application :
 
The third party angular applications can be loaded via Web pack 5 Module federation inside the angular host application which is called BaseApp here.
Through Angular libraries the host angular application  is able to share its code with the third party angular application.
To allow third party angular application to modify the host angular application, the singleton version of angular library has to be shared.
For that, there is a setting inside webpack config where we add the entry of the angular libraray and mark it as Singleton.
Both the angular hot application and third party angular applications have to be AOT compiled.

 Angular Host Application/Non-Angular third party  application :
 
 React is choosen as non angular framework in this POC but it will work with any other framework like Vue also.
 The third party react application can be loaded via Web pack 5 Module federation inside the angular host application which is called BaseApp here.
 It can be also be loaded with webpack 5 Module federation support if we concat the compiled non-Angular application files into a single file usingjscat plugin
 and then fed that js file to Angular host application using dynamic script.
 
Non-angular application has to be converted into a web component and then only the host angular application is able to load them
Non-angular application can communicate with angular host application and use its features or modify it through web components again. But, this time
it will be angular host application that needs to be developed as a collection of angular web components.

Web component is mainly used to reusable ui components but here it's basic nature to be moulded a bit in order to support extensiblity where a non-angular application
is able to not only get loaded inside the angular application but also trigger its functionalities, get access to its features and even modify the behavious of the host application. So, web component has to be made singleton by applying singleton design pattern in typescript inside the web component



