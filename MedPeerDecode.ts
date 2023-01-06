import CryptoJS from "crypto-js"

//  MD5('MedPeer_data_key_' + YYYYMMDDHHm)
//                                      ↑ 分钟的 十位

abstract class MedPeerDecode {
    /**
     * @description 生成 key 种子
     * @description 格式: YYYYM(M)D(D)HHm
     *                                 ↑ 分钟的 十位
     */
    static #generate_key_seed() {
        const _date = new Date()
        return `MedPeer_data_key_${ _date.getFullYear() }${ _date.getMonth() + 1 }${ _date.getDate() }${ _date.getHours() }${ Math.floor(_date.getMinutes() / 10) }`
    }

    /**
     * @description 生成 key
     */
    public static generate_key() {
        return CryptoJS.MD5(CryptoJS.enc.Utf8.parse(MedPeerDecode.#generate_key_seed()))
    }

    /**
     * @description 生成 iv 种子
     */
    static #generate_iv_seed() {
        return 'a1b2d3f594561a6c'
    }

    /**
     * @description 生成 iv
     */
    public static generate_iv() {
        return CryptoJS.enc.Utf8.parse(MedPeerDecode.#generate_iv_seed())
    }

    /**
     * @description 生成 cfg
     */
    static #generate_cfg() {
        return {
            iv: MedPeerDecode.generate_iv(),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    }

    /**
     * @description 加密
     */
    public static encode(str: string) {
        const utf8_str = CryptoJS.enc.Utf8.parse(str)
        return CryptoJS.AES
            .encrypt(utf8_str, MedPeerDecode.generate_key(), MedPeerDecode.#generate_cfg())
            .toString(CryptoJS.format.Hex)
    }

    /**
     * @description 解密
     */
    public static decode(str: string) {
        const hex_str = CryptoJS.enc.Hex.parse(str)
        const base64_str = CryptoJS.enc.Base64.stringify(hex_str)
        return CryptoJS.AES
            .decrypt(base64_str, MedPeerDecode.generate_key(), MedPeerDecode.#generate_cfg())
            .toString(CryptoJS.enc.Utf8)
    }
}

const data_to_encode = 'jinghuashuiyue'

const encoded = MedPeerDecode.encode(data_to_encode)
const decoded = MedPeerDecode.decode(encoded)
console.log('[Origin]', data_to_encode)
console.log('[Encode]', encoded)
console.log('[Decode]', decoded)
