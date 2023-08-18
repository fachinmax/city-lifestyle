'use strict'

function findRelatedInformations(values, key) {
    let arr = values.filter(obj => {
        return obj.label === key
    })

    return arr[0]
}

export { findRelatedInformations }
