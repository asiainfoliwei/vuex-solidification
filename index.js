import Solidification from './libs/Solidification.js';

export default function (options) {

    return (store) => new Solidification(options, store);
    
}