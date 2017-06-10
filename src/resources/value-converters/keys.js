export class KeysValueConverter {
    static toView(obj) {
        return Reflect.ownKeys(obj)
    }
}
