import CryptoJS from "crypto-js"

//  MD5('MedPeer_data_key_' + YYYYMMDDHHm)
//                                      ↑ 分钟的 十位

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
     * @description 加密
     */
    public static encode(str: string) {
        return CryptoJS.AES
            .encrypt(
                CryptoJS.enc.Utf8.parse(str),
                CatalystplusCrypto.#generate_key(),
                CatalystplusCrypto.#generate_cfg()
            )
            .toString(CryptoJS.format.Hex)
    }

    /**
     * @description 解密
     */
    public static decode(str: string) {
        const _1 = CryptoJS.enc.Hex.parse(str)
        const _2 = CryptoJS.enc.Base64.stringify(_1)
        return CryptoJS.AES
            .decrypt(_2, CatalystplusCrypto.#generate_key(), CatalystplusCrypto.#generate_cfg())
            .toString(CryptoJS.enc.Utf8)
    }
}

const data_to_encode = 'jinghuashuiyue'

const encoded = CatalystplusCrypto.encode(data_to_encode)
const decoded = CatalystplusCrypto.decode(encoded)
console.log('[Origin]', data_to_encode)
console.log('[Encode]', encoded)
console.log('[Decode]', decoded)
