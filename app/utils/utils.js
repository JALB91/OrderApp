export default class utils {
    static renderif(condition, component) {
        return (condition ? component : null); 
    }
}