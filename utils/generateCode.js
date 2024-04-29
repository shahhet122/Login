const generateCode = (codeLength) => {
    const number = String(Math.random()).split('.')[1].split('');
    const length = number.length;
    let code = '';

    for (let i = 0; i < codeLength; i++) {
        code += number[length - (i + 1)];
    }
    return code;
}


module.exports = generateCode;