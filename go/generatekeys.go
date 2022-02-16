package main

import (
    "syscall/js"
    "encoding/pem"
    "crypto/x509"
    "crypto/rand"
)


func wrapkey(this js.Value, args []js.Value) interface{} {
    password := args[0].String()
    privatekey := args[1].String()

    privatekeybytes, error := x509.MarshalPKCS8PrivateKey(privatekey)
    privatekeyblock, error := x509.EncryptPEMBlock(rand.Reader, "PRIVATE KEY", privatekeybytes, []byte(password), x509.PEMCipherAES256)
    privatepem := pem.EncodeToMemory(privatekeyblock)

    if error != nil {}

    return string(privatepem)
}


func main() {
    js.Global().Set("gowrapkey", js.FuncOf(wrapkey))
    <- make(chan bool)
}
