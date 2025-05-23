"use strict";
function formatCount(value = 0) {
  if (value > 1e8) {
    value /= 1e8;
    return value.toFixed(1) + "亿";
  } else if (value >= 1e4) {
    value /= 1e4;
    return value.toFixed(1) + "万";
  } else {
    return value.toString();
  }
}
function joinArtistNames(artists, separator = " / ") {
  const validNames = artists.map((artist) => {
    var _a;
    return (_a = artist == null ? void 0 : artist.name) == null ? void 0 : _a.trim();
  }).filter((name) => name && name.length > 0);
  return validNames.join(separator);
}
function formatTimestampToDate(timestamp, separator = "-") {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return [year, month, day].join(separator);
}
exports.formatCount = formatCount;
exports.formatTimestampToDate = formatTimestampToDate;
exports.joinArtistNames = joinArtistNames;
