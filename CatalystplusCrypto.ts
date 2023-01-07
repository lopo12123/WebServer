import CryptoJS from "crypto-js"

/**
 * @description CryptoJS 加密解密工具类
 * @example
 * const data_to_encode = 'Hello World'
 *
 * const encoded_base64 = CatalystPlusCrypto.encode_base64(data_to_encode)
 * const encoded_hex = CatalystPlusCrypto.encode_hex(data_to_encode)
 * const decoded_base64 = CatalystPlusCrypto.decode_base64(encoded_base64)
 * const decoded_hex = CatalystPlusCrypto.decode_hex(encoded_hex)
 *
 * console.log('[Origin]', data_to_encode)
 *
 * console.log('[Encode-Base64]', encoded_base64)
 * console.log('[Encode-Hex]', encoded_hex)
 *
 * console.log('[Decode-Base64]', decoded_base64)
 * console.log('[Decode-Hex]', decoded_hex)
 */
abstract class CatalystPlusCrypto {
    /**
     * @description 构建md5原文
     */
    static #generate_seed(type: 'key' | 'iv') {
        const _date = new Date()
        return `catalyst_plus_${ type }${ _date.getFullYear() }${ _date.getMonth() + 1 }${ _date.getDate() }${ _date.getHours() }${ Math.floor(_date.getMinutes() / 10) }`
    }

    /**
     * @description 生成 key
     */
    static #generate_key() {
        return CryptoJS.MD5(CatalystPlusCrypto.#generate_seed('key'))
    }

    /**
     * @description 生成 iv
     */
    static #generate_iv() {
        return CryptoJS.MD5(CatalystPlusCrypto.#generate_seed('iv'))
    }

    /**
     * @description 生成 AES 的配置
     */
    static #generate_cfg() {
        return {
            iv: CatalystPlusCrypto.#generate_iv(),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    }

    /**
     * @description 加密 - 输出 Base64
     */
    public static encode_base64(str: string) {
        return CryptoJS.AES
            .encrypt(
                CryptoJS.enc.Utf8.parse(str),
                CatalystPlusCrypto.#generate_key(),
                CatalystPlusCrypto.#generate_cfg()
            )
            .ciphertext.toString(CryptoJS.enc.Base64)
    }

    /**
     * @description 加密 - 输出 Hex
     */
    public static encode_hex(str: string) {
        return CryptoJS.AES
            .encrypt(
                CryptoJS.enc.Utf8.parse(str),
                CatalystPlusCrypto.#generate_key(),
                CatalystPlusCrypto.#generate_cfg()
            )
            .ciphertext.toString(CryptoJS.enc.Hex)
    }

    /**
     * @description 解密 Base64密文 - 输入格式不符则无法预期输出
     */
    public static decode_base64(str: string) {
        return CryptoJS.AES
            .decrypt(str, CatalystPlusCrypto.#generate_key(), CatalystPlusCrypto.#generate_cfg())
            .toString(CryptoJS.enc.Utf8)
    }

    /**
     * @description 解密 Hex密文 - 输入格式不符则无法预期输出
     */
    public static decode_hex(str: string) {
        const _de_hex = CryptoJS.enc.Hex.parse(str)
        const _re_base64 = CryptoJS.enc.Base64.stringify(_de_hex)
        return CryptoJS.AES
            .decrypt(_re_base64, CatalystPlusCrypto.#generate_key(), CatalystPlusCrypto.#generate_cfg())
            .toString(CryptoJS.enc.Utf8)
    }
}

export {
    CatalystPlusCrypto
}
