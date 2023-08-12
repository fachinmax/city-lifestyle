// class used in show-cities and scroll-to-choises modules. These modules need to exchange some information for the application to work properly
class Index {
    constructor() {}

    set value(value) {
        if (typeof value !== 'number') return
        if (value < -1) return
        this._value = value
    }

    get value() {
        return this._value
    }
}

class InputValue {
    constructor() {}

    set value(value) {
        if (typeof value !== 'string') return
        this._value = value
    }

    get value() {
        return this._value
    }
}

class IdCity {
    constructor() {}

    set value(value) {
        if (value === undefined) {
            this._value = undefined
            return
        }
        if (!isFinite(value)) return
        this._value = Number.parseInt(value)
    }

    get value() {
        return this._value
    }
}

let dataDictionaryChoises = {
    inputValue: new InputValue(),
    index: new Index(),
    idCity: new IdCity(),
}

export { dataDictionaryChoises }
