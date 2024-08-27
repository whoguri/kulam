export const range = (from, to, step) => {
    return [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step)
}

export function addHyphen(string = "") {
    if (!string) return ""
    return replace_(string, " ", "-")
}
export function removeHyphen(string = "") {
    if (!string) return ""
    return replace_(string, "-", " ")
}

function replace_(string, o, n) {
    if (!string) return ""
    if (!o || !n) return string
    let result = string
    while (result.includes(o)) {
        result = result.replace(o, n)
    }
    return result
}

export const validUrlRgx = /(https?:\/\/[^\s]+)/g

export const validEmailRgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const getError = (e) => {
    if (!e)
        return `Something went wrong`
    if (typeof e == "string")
        return e
    return e?.response?.data?.error || e.response?.data?.message || e.message
}


export const editorModules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        [{
            'color': [
                '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff',
                '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff',
                '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff',
                '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2',
                '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466',
                "#23B7C4", "#29334d", "#c2baba", "#774b47", "#117B34", "#EEFDF3"
            ]
        }],
        [{
            'background': [
                '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff',
                '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff',
                '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff',
                '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2',
                '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466',
                "#23B7C4", "#29334d", "#c2baba", "#774b47", "#117B34", "#EEFDF3"
            ]
        }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            // { indent: '-1' },
            // { indent: '+1' },
        ],
        ['link',
            // 'image', 'video'
        ],
        // ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}
export const editorFormats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'color',
    'background'
    // 'image',
    // 'video',
]

export const getFormError = (errors, name) => {
    let error_ = ""
    if (errors)
        error_ = errors[name]?.type
    if (error_ === "required") {
        error_ = errors[name]?.message
    }
    if (error_ === "pattern") {
        error_ = errors[name]?.message
    }
    if (error_ === "validate") {
        error_ = errors[name]?.message
    }
    if (error_ === "minLength") {
        error_ = errors[name]?.message
    }
    return error_
}


export function removeUnderScore(string = "") {
    if (typeof string !== "string")
        return ""

    let s = string.replaceAll("_", " ")
    return s
}
