const Wait = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time)
    });
};

module.exports = Wait;
