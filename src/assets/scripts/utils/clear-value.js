'use strict'

function clearValue(value) {
    let valueCleared = undefined

    switch (value.type) {
        case 'float':
            valueCleared = parseFloat(value.float_value).toFixed(2)
            break
        case 'currency_dollar':
            valueCleared = `$ ${value.currency_dollar_value}`
            break
        case 'percent':
            valueCleared = parseFloat(value.percent_value).toFixed(2) + ' %'
            break
        default:
            valueCleared = value[`${value.type}_value`]
            break
    }

    return valueCleared
}

export { clearValue }
