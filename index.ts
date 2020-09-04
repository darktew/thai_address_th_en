import * as database from "./database/address"
import * as _ from "lodash"
import { IReqDistrict, IReqSubDistrict, ICallback } from './interface'

let lang: String = "th"

const functionLib = {
  locale: (language: string) : String => {
    lang = language
    return lang
  },
  // GET Provinces
  provinces: (callback: ICallback) => {
    if (lang === "en") {
      if (typeof callback === "function") {
        callback(_.uniq(_.map(database, "province_en")))
      }
    } else {
      if (typeof callback === "function") {
        callback(_.uniq(_.map(database, "province")))
      }
    }
  },
  // GET District By Province
  district: (req: IReqDistrict, callback : ICallback) => {
    if (!req.province) {
      return callback(null, new Error("Not province"))
    } else {
      if (lang === "en") {
        callback(
          _.uniq(
            _.map(
              _.filter(database, { province_en: req.province }),
              "amphoe_en"
            )
          )
        )
      } else {
        callback(
          _.uniq(
            _.map(_.filter(database, { province: req.province }), "amphoe")
          )
        )
      }
    }
  },
  // GET SubDistrict and Zipcode By Province and District
  subDistrict: (req : IReqSubDistrict, callback : ICallback) => {
    if (!req.province && !req.district) {
      return callback(null, new Error("Not province and amphoe"))
    } else if (!req.province) {
      return callback(null, new Error("Not province"))
    } else if (!req.district) {
      return callback(null, new Error("Not amphoe"))
    } else {
      if (lang === "en") {
        callback(
          _.uniqBy(
            _.map(
              _.filter(database, {
                province_en: req.province,
                amphoe_en: req.district,
              }),
              (e) => ({ subDistrict: e.district_en, zipcode: e.zipcode })
            ),
            v => JSON.stringify([v.subDistrict, v.zipcode])
          )
        )
      } else {
        callback(
          _.uniqBy(
            _.map(
              _.filter(database, {
                province: req.province,
                amphoe: req.district,
              }),
              (e) => ({ subDistrict: e.district, zipcode: e.zipcode })
            ),
            v => JSON.stringify([v.subDistrict, v.zipcode])
          )
        )
      }
    }
  },
}

module.exports = functionLib
