const regexEmail = (emailAddress)=>{
    // let regex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}$/
    // let regex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]$/
    let regex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
    return regex.test(emailAddress.toLowerCase());
}

module.exports = regexEmail;