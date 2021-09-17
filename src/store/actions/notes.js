export const loadNote = (value) => {
    return {
        type: 'load-notes'
    }
}

export const addNote = (value) => {
    return {
        type: 'add-note',
        payload: value
    }
}

export const removeNote = (value) => {
    return {
        type: 'remove-note',
        payload: value
    }
}

export const updateNote = (value) => {
    return {
        type: 'update-new-note',
        payload: value
    }
}