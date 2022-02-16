async function generatekeys(passphrase) {
    let encoder = new TextEncoder()
    let decoder = new TextDecoder()
    let salt = crypto.getRandomValues(new Uint8Array(16))

    let keypair = await crypto.subtle.generateKey(
        {
            name: 'RSA-OAEP',
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: 'SHA-256'
        },
        true,
        ['encrypt', 'decrypt']
    )


    function buffertopem(format, buffer) {
        let base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))

        let newlines = ''
        while(base64.length > 0) {
            newlines += base64.substring(0, 64) + "\n"
            base64 = base64.substring(64)
        }

        let header = ''
        let footer = ''

        if(format == 'private') {
            header = '-----BEGIN ENCRYPTED PRIVATE KEY-----\n'
            footer = '-----END ENCRYPTED PRIVATE KEY-----'
        }
        else if(format == 'public') {
            header = '-----BEGIN PUBLIC KEY-----\n'
            footer = '-----END PUBLIC KEY-----'
        }

        return header + newlines + footer
    }


    let privatekey = await crypto.subtle.exportKey('pkcs8', keypair['privateKey'])
    let privatekeypem = buffertopem('private', privatekey)

    let publickey = await crypto.subtle.exportKey('spki', keypair['publicKey'])
    let publickeypem = buffertopem('public', publickey)

    return [privatekeypem, publickeypem]
}


