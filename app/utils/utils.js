export default class Utils {
    static renderif(condition, component) {
        return (condition ? component : null); 
    }
}