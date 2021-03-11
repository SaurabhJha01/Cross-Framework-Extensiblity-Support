
/**
 * The bootstrap code has been moved from here to a newly created bootstrap component so that
 * we can make the bootstraping of host application asynchronous by using dynamic import.
 * The reason for making the bootstraping of host application is to resolve the shared depedencies/libraries between
 * host and extensible applications based on their cooresponding web-pack config.
 * It gives time to decide the host application to use its own library version or the one from the extensible one.
 */

import('./bootstrap');