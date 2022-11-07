export function makeLorem(num) {
    const words = [
        "Got", "ability", "shop", "recall,", "fruit", "easy", "dirty.", "giant", "shaking", "ground",
        "weather,", "lesson", "almost", "square", "forward,", "bend", "cold", "broken", "distant",
        "adjective.", "hand", "close", "ship", "possibly", "metal", "myself", "everybody",
        "serious.", "adult", "favorite",
        "duke", "vision", "height", "basic", "bat", "nose", "quantity", "inside", "quality", "gradient", "acute", "laser",
        "manner", "indication", "silver", "nuance", "beach", "other", "genetic", "explode",
    ]

    let str = ''
    for (var i = 1; i < num; i++) {
        str+= ' ' + words[Math.floor(Math.random() * words.length)];
    }

    return str
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}