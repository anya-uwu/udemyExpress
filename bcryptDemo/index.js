const bcrypt = require('bcrypt')

const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw, salt);
    console.log(salt);
    console.log(hash);
}

const login = async(pw, hashedPW) => {
    const result = await bcrypt.compare(pw, hashedPW);
    if(result) {
        console.log('logged you in')
    } else {
        console.log('incorrect')
    }
}

// hashPassword('monkey');
login('monkey', '$2b$12$cEZxnuprqAFwHkOSMN35Ae1MYDHKUbrOloORUYf3I.rC.4YBw1p2u');