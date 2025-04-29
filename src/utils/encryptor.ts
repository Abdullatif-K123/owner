import JSEncrypt from "jsencrypt";

const publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmgtARJHKLq5uQOI5EBTe
fe4YFLO/GByMVPxchYEQ4jV7HLhUm7cFe3N58lF0jARZOhkD5YCGx+KLeoWQuDPq
LqHiG94/Snx9ePKB4JpO1W0jODZCzoWepsrdyLx1aiFZO1Ccg1l9jfSIt+Z44zGD
8SngsbNvdZq3sBpcuF1hoN+AC6x2iH6LZA/UOSAfxy9gwbuetocJCqcwN1Agf7Hu
ivGNdloGMMJZPjRKjGvWFSOZT9OVe7Sr3z42i24eFQnKVRJ0HAysAaDoHk5oBiqD
SbFfN4Fa2H/hYgBiaN19ZuJ9cBoCfNkikNdsSMO8+URzt6iz0zguWT9tU4/IK8Kz
2wIDAQAB
-----END RSA PUBLIC KEY-----`;

const encrypt = new JSEncrypt();
encrypt.setPublicKey(publicKey);

export const encryptor = (plainText: string) => encrypt.encrypt(plainText);
