"use strict"
var database = require("./database/address")
var _ = require("lodash")
var lang = "th"
var functionLib = {
  locale: function (language) {
    lang = language
    return lang
  },
  // GET Provinces
  provinces: function (req, callback) {
    if (lang === "en") {
      if (typeof callback === "function") {
        return callback(_.uniq(_.map(database, "province_en")))
      }
      if (req) {
        return callback(_.uniq(_.map()))
      }
    } else {
      if (typeof callback === "function") {
        return callback(_.uniq(_.map(database, "province")))
      }
    }
  },
  // GET District By Province
  district: function (req, callback) {
    if (!req.province) {
      return callback(null, new Error("Not province"))
    } else {
      if (lang === "en") {
        return callback(
          _.uniq(
            _.map(
              _.filter(database, { province_en: req.province }),
              "amphoe_en"
            )
          )
        )
      } else {
        return callback(
          _.uniq(
            _.map(_.filter(database, { province: req.province }), "amphoe")
          )
        )
      }
    }
  },
  // GET SubDistrict and Zipcode By Province and District
  subDistrict: function (req, callback) {
    if (!req.province && !req.district) {
      return callback(null, new Error("Not province and amphoe"))
    } else if (!req.province) {
      return callback(null, new Error("Not province"))
    } else if (!req.district) {
      return callback(null, new Error("Not amphoe"))
    } else {
      if (lang === "en") {
        return callback(
          _.uniqBy(
            _.map(
              _.filter(database, {
                province_en: req.province,
                amphoe_en: req.district,
              }),
              function (e) {
                return { subDistrict: e.district_en, zipcode: e.zipcode }
              }
            ),
            function (v) {
              return JSON.stringify([v.subDistrict, v.zipcode])
            }
          )
        )
      } else {
        return callback(
          _.uniqBy(
            _.map(
              _.filter(database, {
                province: req.province,
                amphoe: req.district,
              }),
              function (e) {
                return { subDistrict: e.district, zipcode: e.zipcode }
              }
            ),
            function (v) {
              return JSON.stringify([v.subDistrict, v.zipcode])
            }
          )
        )
      }
    }
  },
  convertTHToEN: function (req, callback) {
    if (lang === "en") {
      if (req.type === "p") {
        return callback(
          _.reduce(
            _.filter(database, { province_en: req.data.province }),
            (prev, curr) => {
              prev = curr.province
              return prev
            },
            ""
          )
        )
      } else if (req.type === "d") {
        return callback(
          _.reduce(
            _.filter(database, {
              province_en: req.data.province,
              amphoe_en: req.data.district,
            }),
            (prev, curr) => {
              prev = curr.amphoe
              return prev
            },
            ""
          )
        )
      } else if (req.type === "sd") {
        return callback(
          _.reduce(
            _.filter(database, {
              province_en: req.data.province,
              amphoe_en: req.data.district,
              district_en: req.data.subDistrict,
            }),
            (prev, curr) => {
              prev.subDistrict = curr.district
              prev.zipcode = curr.zipcode
              return prev
            },
            { subDistrict: "", zipcode: "" }
          )
        )
      } else {
        return callback(null, new Error(`Not type ${req.type}`))
      }
    } else {
      if (req.type === "p") {
        return callback(
          _.reduce(
            _.filter(database, { province: req.data.province }),
            (prev, curr) => {
              prev = curr.province_en
              return prev
            },
            ""
          )
        )
      } else if (req.type === "d") {
        return callback(
          _.reduce(
            _.filter(database, {
              province: req.data.province,
              amphoe: req.data.district,
            }),
            (prev, curr) => {
              prev = curr.amphoe_en
              return prev
            },
            ""
          )
        )
      } else if (req.type === "sd") {
        return callback(
          _.reduce(
            _.filter(database, {
              province: req.data.province,
              amphoe: req.data.district,
              district: req.data.subDistrict,
            }),
            (prev, curr) => {
              prev.subDistrict = curr.district_en
              prev.zipcode = curr.zipcode
              return prev
            },
            { subDistrict: "", zipcode: "" }
          )
        )
      } else {
        return callback(null, new Error(`Not type ${req.type}`))
      }
    }
  },
}
module.exports = functionLib
