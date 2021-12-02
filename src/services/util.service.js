export const utilService = {
    makeId,
    makeLength,
    makeTags
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function makeLength() {
    const length = Math.floor(Math.random() * (6000000 - 3000000) + 3000000)
    return length
}

function makeTags(num) {
    const allTags = ['rock', 'pop', 'func', 'soul', 'punk', 'metal', 'jazz', 'prog rock', 'art pop', 'alt hip hop', 'hip hop', 'rap']
    var tags = []
    for (var i = 0; i < num; i++) {
        const idx = Math.floor(Math.random() * allTags.length)
        tags.push(allTags[idx])
    }
    return tags
}