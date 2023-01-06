import CryptoJS from "crypto-js"

abstract class CatalystplusCrypto {
    /**
     * @description 生成 key 种子
     * @description 格式: YYYYM(M)D(D)HHm
     *                                 ↑ 分钟的 十位
     */
    static #generate_seed(type: 'key' | 'iv') {
        const _date = new Date()
        return `catalyst_plus_${ type }_key_${ _date.getFullYear() }${ _date.getMonth() + 1 }${ _date.getDate() }${ _date.getHours() }${ Math.floor(_date.getMinutes() / 10) }`
    }

    /**
     * @description 生成 key
     */
    static #generate_key() {
        return CryptoJS.MD5(CatalystplusCrypto.#generate_seed('key'))
    }

    /**
     * @description 生成 iv
     */
    static #generate_iv() {
        return CryptoJS.enc.Utf8.parse(CatalystplusCrypto.#generate_seed('iv'))
    }

    /**
     * @description 生成 cfg
     */
    static #generate_cfg() {
        return {
            iv: CatalystplusCrypto.#generate_iv(),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    }

    /**
     * @description 加密 Hex
     */
    public static encode_hex(str: string) {
        return CryptoJS.AES
            .encrypt(
                CryptoJS.enc.Utf8.parse(str),
                CatalystplusCrypto.#generate_key(),
                CatalystplusCrypto.#generate_cfg()
            )
            .toString(CryptoJS.format.Hex)
    }

    /**
     * @description 解密 Hex
     */
    public static decode_hex(str: string) {
        const _1 = CryptoJS.enc.Hex.parse(str)
        const _2 = CryptoJS.enc.Base64.stringify(_1)
        return CryptoJS.AES
            .decrypt(_2, CatalystplusCrypto.#generate_key(), CatalystplusCrypto.#generate_cfg())
            .toString(CryptoJS.enc.Utf8)
    }

    /**
     * @description 加密 Base64
     */
    public static encode_base64(str: string) {
        return CryptoJS.AES
            .encrypt(
                CryptoJS.enc.Utf8.parse(str),
                CatalystplusCrypto.#generate_key(),
                CatalystplusCrypto.#generate_cfg()
            )
            .toString(CryptoJS.format.OpenSSL)
    }

    /**
     * @description 解密 Base64
     */
    public static decode_base64(str: string) {
        // const _1 = CryptoJS.enc.Base64.parse(str)
        // const _2 = CryptoJS.enc.Base64.stringify(_1)
        return CryptoJS.AES
            .decrypt(str, CatalystplusCrypto.#generate_key(), CatalystplusCrypto.#generate_cfg())
            .toString(CryptoJS.enc.Utf8)
    }
}

export {
    CatalystplusCrypto
}

// const data_to_encode = 'hello'
const data_to_encode = new Array(10000000)
    .fill(0)
    .map((_, idx) => (idx % 10).toFixed(0))
    .join('')
//
const encoded_hex = CatalystplusCrypto.encode_hex(data_to_encode)
const decoded_hex = CatalystplusCrypto.decode_hex(encoded_hex)

const encoded_base64 = CatalystplusCrypto.encode_base64(data_to_encode)
const decoded_base64 = CatalystplusCrypto.decode_base64(encoded_base64)

console.time('serde')

console.log('[Origin]', data_to_encode)
console.log('[Encode-Base64]', encoded_base64)
console.log('[Encode-Hex]', encoded_hex)
console.log('[Decode-Base64]', decoded_base64)
console.log('[Decode-Hex]', decoded_hex)
// console.log('[Assert]', data_to_encode === decoded ? 'true' : 'false')

console.timeEnd('serde')
