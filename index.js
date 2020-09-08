"use strict";
var database = require("./database/address");
var _ = require("lodash");
var lang = "th";
var functionLib = {
    locale: function (language) {
        lang = language.toLocaleLowerCase();
        return lang;
    },
    // GET Provinces
    provinces: function (callback) {
        if (lang === "en") {
            if (typeof callback === "function") {
                callback(_.uniq(_.map(database, "province_en")));
            }
        }
        else {
            if (typeof callback === "function") {
                callback(_.uniq(_.map(database, "province")));
            }
        }
    },
    // GET District By Province
    district: function (req, callback) {
        if (!req.province) {
            return callback(null, new Error("Not province"));
        }
        else {
            if (lang === "en") {
                callback(_.uniq(_.map(_.filter(database, { province_en: req.province }), "amphoe_en")));
            }
            else {
                callback(_.uniq(_.map(_.filter(database, { province: req.province }), "amphoe")));
            }
        }
    },
    // GET SubDistrict and Zipcode By Province and District
    subDistrict: function (req, callback) {
        if (!req.province && !req.district) {
            return callback(null, new Error("Not province and amphoe"));
        }
        else if (!req.province) {
            return callback(null, new Error("Not province"));
        }
        else if (!req.district) {
            return callback(null, new Error("Not amphoe"));
        }
        else {
            if (lang === "en") {
                callback(_.uniqBy(_.map(_.filter(database, {
                    province_en: req.province,
                    amphoe_en: req.district
                }), function (e) { return ({ subDistrict: e.district_en, zipcode: e.zipcode }); }), function (v) { return JSON.stringify([v.subDistrict, v.zipcode]); }));
            }
            else {
                callback(_.uniqBy(_.map(_.filter(database, {
                    province: req.province,
                    amphoe: req.district
                }), function (e) { return ({ subDistrict: e.district, zipcode: e.zipcode }); }), function (v) { return JSON.stringify([v.subDistrict, v.zipcode]); }));
            }
        }
    }
};
module.exports = functionLib;
