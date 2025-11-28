

export default class AppTools {

    

    static wait(ms = 3000) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}