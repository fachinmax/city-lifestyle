'use strict'

function clearDescription(description) {
    return description.replace(/\[Teleport score\]/, '(score)')
}

export { clearDescription }
