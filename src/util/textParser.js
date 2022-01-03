const colors = {
    dark_red: '#aa0000',
    red: '#ff5555',
    gold: '#ffaa00',
    yellow: '#ffff55',
    dark_green: '#00aa00',
    green: '#55ff55',
    aqua: '#55ffff',
    dark_aqua: '#00aaaa',
    dark_blue: '#0000aa',
    blue: '#5555ff',
    light_purple: '#ff55ff',
    dark_purple: '#aa00aa',
    white: '#ffffff',
    gray: '#aaaaaa',
    dark_gray: '#555555',
    black: '#000000'
}

const colorCodes = {
    '4': colors['dark_red'],
    'c': colors['red'],
    '6': colors['gold'],
    'e': colors['yellow'],
    '2': colors['dark_green'],
    'a': colors['green'],
    'b': colors['aqua'],
    '3': colors['dark_aqua'],
    '1': colors['dark_blue'],
    '9': colors['blue'],
    'd': colors['light_purple'],
    '5': colors['dark_purple'],
    'f': colors['white'],
    '7': colors['gray'],
    '8': colors['dark_gray'],
    '0': colors['black']
}

const parseStringText = (str, color = '#ffffff', bold = false, underline = false, strikethrough = false, italic = false) => {
    const results = []

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '§') {
            // End of string
            if (i === (str.length - 1)) {
                continue;
            }

            // Check if its a color code
            const c = colorCodes[str[i + 1].toLowerCase()];
            if (c !== undefined) {
                color = c;
                i += 1;
                continue;
            }

            // Check for formatting code
            switch(str[i+1].toLowerCase()) {
                case 'k':
                    i += 1
                    continue;
                case 'l':
                    bold = true
                    break
                case 'm':
                    strikethrough = true
                    break
                case 'n':
                    underline = true
                    break
                case 'o':
                    italic = true
                    break
                case 'r':
                    color = '#ffffff';
                    bold = false;
                    underline = false;
                    strikethrough = false;
                    italic = false;
                    break

                // Character § was used, but is not a color code or formatting code
                default:
                    continue
            }

            i += 1
            continue
        }

        if (str[i]) {
            results.push({
                color,
                bold,
                underline,
                strikethrough,
                italic,
                text: str[i]
            })
        }
    }

    return results;
}

const toHexadecimal = (color) => {
    if (color.startsWith('#')) return color;
    return colors[color];
}

export const parseText =
    (obj,
     results = [],
     color = '#ffffff',
     bold = false,
     underline = false,
     strikethrough = false,
     italic = false) => {
    if (typeof obj === 'string') {
        return parseStringText(obj);
    }

    Object.keys(obj)
        .sort((a, b) => {
        if (typeof obj[a] === 'object' && typeof obj[b] === 'object') return 0
        if (typeof obj[a] === 'object') return 1;
        if (typeof obj[b] === 'object') return -1;
        return 0
        }) // Sort the keys so that all keys are parsed before the children objects
        .forEach(key => {
            const value = obj[key];

            if (key === 'bold') {
                bold = value;
            }

            if (key === 'underline') {
                underline = value;
            }

            if (key === 'strikethrough') {
                strikethrough = value;
            }

            if (key === 'color') {
                color = value;
            }

            if (key === 'italic') {
                italic = value;
            }

            if (key === 'text' && obj[key]) {
                if (obj[key].includes('§')) {
                    results.push(...parseStringText(obj[key], color, bold, underline, strikethrough, italic))
                } else {
                    results.push({
                        bold,
                        italic,
                        underline,
                        strikethrough,
                        color: toHexadecimal(color),
                        text: obj.text
                    })
                }
            }

            if (typeof value === 'object') { // Child object, call function recursively
                parseText(value, results, color, bold, underline, strikethrough, italic)
            }
        });

    return results
}

export const splitLines = (segments) => {
    const first = []
    const second = []

    let hitNewLine = false;
    for (let segment of segments) {
        if (hitNewLine) {
            second.push(segment)
            continue
        }

        if (segment.text.includes('\n')) {
            first.push(segment)
            hitNewLine = true;
            continue
        }

        first.push(segment)
    }

    return { first, second }
}