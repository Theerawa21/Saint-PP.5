"use strict";
var STCloud = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // vendor/scrypt-js/scrypt.js
  var require_scrypt = __commonJS({
    "vendor/scrypt-js/scrypt.js"(exports, module) {
      "use strict";
      (function(root) {
        const MAX_VALUE = 2147483647;
        function SHA256(m) {
          const K = new Uint32Array([
            1116352408,
            1899447441,
            3049323471,
            3921009573,
            961987163,
            1508970993,
            2453635748,
            2870763221,
            3624381080,
            310598401,
            607225278,
            1426881987,
            1925078388,
            2162078206,
            2614888103,
            3248222580,
            3835390401,
            4022224774,
            264347078,
            604807628,
            770255983,
            1249150122,
            1555081692,
            1996064986,
            2554220882,
            2821834349,
            2952996808,
            3210313671,
            3336571891,
            3584528711,
            113926993,
            338241895,
            666307205,
            773529912,
            1294757372,
            1396182291,
            1695183700,
            1986661051,
            2177026350,
            2456956037,
            2730485921,
            2820302411,
            3259730800,
            3345764771,
            3516065817,
            3600352804,
            4094571909,
            275423344,
            430227734,
            506948616,
            659060556,
            883997877,
            958139571,
            1322822218,
            1537002063,
            1747873779,
            1955562222,
            2024104815,
            2227730452,
            2361852424,
            2428436474,
            2756734187,
            3204031479,
            3329325298
          ]);
          let h0 = 1779033703, h1 = 3144134277, h2 = 1013904242, h3 = 2773480762;
          let h4 = 1359893119, h5 = 2600822924, h6 = 528734635, h7 = 1541459225;
          const w = new Uint32Array(64);
          function blocks(p2) {
            let off = 0, len = p2.length;
            while (len >= 64) {
              let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7, u, i2, j, t1, t2;
              for (i2 = 0; i2 < 16; i2++) {
                j = off + i2 * 4;
                w[i2] = (p2[j] & 255) << 24 | (p2[j + 1] & 255) << 16 | (p2[j + 2] & 255) << 8 | p2[j + 3] & 255;
              }
              for (i2 = 16; i2 < 64; i2++) {
                u = w[i2 - 2];
                t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
                u = w[i2 - 15];
                t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
                w[i2] = (t1 + w[i2 - 7] | 0) + (t2 + w[i2 - 16] | 0) | 0;
              }
              for (i2 = 0; i2 < 64; i2++) {
                t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g) | 0) + (h + (K[i2] + w[i2] | 0) | 0) | 0;
                t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
                h = g;
                g = f;
                f = e;
                e = d + t1 | 0;
                d = c;
                c = b;
                b = a;
                a = t1 + t2 | 0;
              }
              h0 = h0 + a | 0;
              h1 = h1 + b | 0;
              h2 = h2 + c | 0;
              h3 = h3 + d | 0;
              h4 = h4 + e | 0;
              h5 = h5 + f | 0;
              h6 = h6 + g | 0;
              h7 = h7 + h | 0;
              off += 64;
              len -= 64;
            }
          }
          blocks(m);
          let i, bytesLeft = m.length % 64, bitLenHi = m.length / 536870912 | 0, bitLenLo = m.length << 3, numZeros = bytesLeft < 56 ? 56 : 120, p = m.slice(m.length - bytesLeft, m.length);
          p.push(128);
          for (i = bytesLeft + 1; i < numZeros; i++) {
            p.push(0);
          }
          p.push(bitLenHi >>> 24 & 255);
          p.push(bitLenHi >>> 16 & 255);
          p.push(bitLenHi >>> 8 & 255);
          p.push(bitLenHi >>> 0 & 255);
          p.push(bitLenLo >>> 24 & 255);
          p.push(bitLenLo >>> 16 & 255);
          p.push(bitLenLo >>> 8 & 255);
          p.push(bitLenLo >>> 0 & 255);
          blocks(p);
          return [
            h0 >>> 24 & 255,
            h0 >>> 16 & 255,
            h0 >>> 8 & 255,
            h0 >>> 0 & 255,
            h1 >>> 24 & 255,
            h1 >>> 16 & 255,
            h1 >>> 8 & 255,
            h1 >>> 0 & 255,
            h2 >>> 24 & 255,
            h2 >>> 16 & 255,
            h2 >>> 8 & 255,
            h2 >>> 0 & 255,
            h3 >>> 24 & 255,
            h3 >>> 16 & 255,
            h3 >>> 8 & 255,
            h3 >>> 0 & 255,
            h4 >>> 24 & 255,
            h4 >>> 16 & 255,
            h4 >>> 8 & 255,
            h4 >>> 0 & 255,
            h5 >>> 24 & 255,
            h5 >>> 16 & 255,
            h5 >>> 8 & 255,
            h5 >>> 0 & 255,
            h6 >>> 24 & 255,
            h6 >>> 16 & 255,
            h6 >>> 8 & 255,
            h6 >>> 0 & 255,
            h7 >>> 24 & 255,
            h7 >>> 16 & 255,
            h7 >>> 8 & 255,
            h7 >>> 0 & 255
          ];
        }
        function PBKDF2_HMAC_SHA256_OneIter(password, salt, dkLen) {
          password = password.length <= 64 ? password : SHA256(password);
          const innerLen = 64 + salt.length + 4;
          const inner = new Array(innerLen);
          const outerKey = new Array(64);
          let i;
          let dk = [];
          for (i = 0; i < 64; i++) {
            inner[i] = 54;
          }
          for (i = 0; i < password.length; i++) {
            inner[i] ^= password[i];
          }
          for (i = 0; i < salt.length; i++) {
            inner[64 + i] = salt[i];
          }
          for (i = innerLen - 4; i < innerLen; i++) {
            inner[i] = 0;
          }
          for (i = 0; i < 64; i++) outerKey[i] = 92;
          for (i = 0; i < password.length; i++) outerKey[i] ^= password[i];
          function incrementCounter() {
            for (let i2 = innerLen - 1; i2 >= innerLen - 4; i2--) {
              inner[i2]++;
              if (inner[i2] <= 255) return;
              inner[i2] = 0;
            }
          }
          while (dkLen >= 32) {
            incrementCounter();
            dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))));
            dkLen -= 32;
          }
          if (dkLen > 0) {
            incrementCounter();
            dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))).slice(0, dkLen));
          }
          return dk;
        }
        function blockmix_salsa8(BY, Yi, r, x, _X) {
          let i;
          arraycopy(BY, (2 * r - 1) * 16, _X, 0, 16);
          for (i = 0; i < 2 * r; i++) {
            blockxor(BY, i * 16, _X, 16);
            salsa20_8(_X, x);
            arraycopy(_X, 0, BY, Yi + i * 16, 16);
          }
          for (i = 0; i < r; i++) {
            arraycopy(BY, Yi + i * 2 * 16, BY, i * 16, 16);
          }
          for (i = 0; i < r; i++) {
            arraycopy(BY, Yi + (i * 2 + 1) * 16, BY, (i + r) * 16, 16);
          }
        }
        function R(a, b) {
          return a << b | a >>> 32 - b;
        }
        function salsa20_8(B, x) {
          arraycopy(B, 0, x, 0, 16);
          for (let i = 8; i > 0; i -= 2) {
            x[4] ^= R(x[0] + x[12], 7);
            x[8] ^= R(x[4] + x[0], 9);
            x[12] ^= R(x[8] + x[4], 13);
            x[0] ^= R(x[12] + x[8], 18);
            x[9] ^= R(x[5] + x[1], 7);
            x[13] ^= R(x[9] + x[5], 9);
            x[1] ^= R(x[13] + x[9], 13);
            x[5] ^= R(x[1] + x[13], 18);
            x[14] ^= R(x[10] + x[6], 7);
            x[2] ^= R(x[14] + x[10], 9);
            x[6] ^= R(x[2] + x[14], 13);
            x[10] ^= R(x[6] + x[2], 18);
            x[3] ^= R(x[15] + x[11], 7);
            x[7] ^= R(x[3] + x[15], 9);
            x[11] ^= R(x[7] + x[3], 13);
            x[15] ^= R(x[11] + x[7], 18);
            x[1] ^= R(x[0] + x[3], 7);
            x[2] ^= R(x[1] + x[0], 9);
            x[3] ^= R(x[2] + x[1], 13);
            x[0] ^= R(x[3] + x[2], 18);
            x[6] ^= R(x[5] + x[4], 7);
            x[7] ^= R(x[6] + x[5], 9);
            x[4] ^= R(x[7] + x[6], 13);
            x[5] ^= R(x[4] + x[7], 18);
            x[11] ^= R(x[10] + x[9], 7);
            x[8] ^= R(x[11] + x[10], 9);
            x[9] ^= R(x[8] + x[11], 13);
            x[10] ^= R(x[9] + x[8], 18);
            x[12] ^= R(x[15] + x[14], 7);
            x[13] ^= R(x[12] + x[15], 9);
            x[14] ^= R(x[13] + x[12], 13);
            x[15] ^= R(x[14] + x[13], 18);
          }
          for (let i = 0; i < 16; ++i) {
            B[i] += x[i];
          }
        }
        function blockxor(S, Si, D, len) {
          for (let i = 0; i < len; i++) {
            D[i] ^= S[Si + i];
          }
        }
        function arraycopy(src, srcPos, dest, destPos, length) {
          while (length--) {
            dest[destPos++] = src[srcPos++];
          }
        }
        function checkBufferish(o) {
          if (!o || typeof o.length !== "number") {
            return false;
          }
          for (let i = 0; i < o.length; i++) {
            const v = o[i];
            if (typeof v !== "number" || v % 1 || v < 0 || v >= 256) {
              return false;
            }
          }
          return true;
        }
        function ensureInteger(value, name) {
          if (typeof value !== "number" || value % 1) {
            throw new Error("invalid " + name);
          }
          return value;
        }
        function _scrypt(password, salt, N, r, p, dkLen, callback) {
          N = ensureInteger(N, "N");
          r = ensureInteger(r, "r");
          p = ensureInteger(p, "p");
          dkLen = ensureInteger(dkLen, "dkLen");
          if (N === 0 || (N & N - 1) !== 0) {
            throw new Error("N must be power of 2");
          }
          if (N > MAX_VALUE / 128 / r) {
            throw new Error("N too large");
          }
          if (r > MAX_VALUE / 128 / p) {
            throw new Error("r too large");
          }
          if (!checkBufferish(password)) {
            throw new Error("password must be an array or buffer");
          }
          password = Array.prototype.slice.call(password);
          if (!checkBufferish(salt)) {
            throw new Error("salt must be an array or buffer");
          }
          salt = Array.prototype.slice.call(salt);
          let b = PBKDF2_HMAC_SHA256_OneIter(password, salt, p * 128 * r);
          const B = new Uint32Array(p * 32 * r);
          for (let i = 0; i < B.length; i++) {
            const j = i * 4;
            B[i] = (b[j + 3] & 255) << 24 | (b[j + 2] & 255) << 16 | (b[j + 1] & 255) << 8 | (b[j + 0] & 255) << 0;
          }
          const XY = new Uint32Array(64 * r);
          const V = new Uint32Array(32 * r * N);
          const Yi = 32 * r;
          const x = new Uint32Array(16);
          const _X = new Uint32Array(16);
          const totalOps = p * N * 2;
          let currentOp = 0;
          let lastPercent10 = null;
          let stop = false;
          let state = 0;
          let i0 = 0, i1;
          let Bi;
          const limit = callback ? parseInt(1e3 / r) : 4294967295;
          const nextTick = typeof setImmediate !== "undefined" ? setImmediate : setTimeout;
          const incrementalSMix = function() {
            if (stop) {
              return callback(new Error("cancelled"), currentOp / totalOps);
            }
            let steps;
            switch (state) {
              case 0:
                Bi = i0 * 32 * r;
                arraycopy(B, Bi, XY, 0, Yi);
                state = 1;
                i1 = 0;
              // Fall through
              case 1:
                steps = N - i1;
                if (steps > limit) {
                  steps = limit;
                }
                for (let i = 0; i < steps; i++) {
                  arraycopy(XY, 0, V, (i1 + i) * Yi, Yi);
                  blockmix_salsa8(XY, Yi, r, x, _X);
                }
                i1 += steps;
                currentOp += steps;
                if (callback) {
                  const percent10 = parseInt(1e3 * currentOp / totalOps);
                  if (percent10 !== lastPercent10) {
                    stop = callback(null, currentOp / totalOps);
                    if (stop) {
                      break;
                    }
                    lastPercent10 = percent10;
                  }
                }
                if (i1 < N) {
                  break;
                }
                i1 = 0;
                state = 2;
              // Fall through
              case 2:
                steps = N - i1;
                if (steps > limit) {
                  steps = limit;
                }
                for (let i = 0; i < steps; i++) {
                  const offset = (2 * r - 1) * 16;
                  const j = XY[offset] & N - 1;
                  blockxor(V, j * Yi, XY, Yi);
                  blockmix_salsa8(XY, Yi, r, x, _X);
                }
                i1 += steps;
                currentOp += steps;
                if (callback) {
                  const percent10 = parseInt(1e3 * currentOp / totalOps);
                  if (percent10 !== lastPercent10) {
                    stop = callback(null, currentOp / totalOps);
                    if (stop) {
                      break;
                    }
                    lastPercent10 = percent10;
                  }
                }
                if (i1 < N) {
                  break;
                }
                arraycopy(XY, 0, B, Bi, Yi);
                i0++;
                if (i0 < p) {
                  state = 0;
                  break;
                }
                b = [];
                for (let i = 0; i < B.length; i++) {
                  b.push(B[i] >> 0 & 255);
                  b.push(B[i] >> 8 & 255);
                  b.push(B[i] >> 16 & 255);
                  b.push(B[i] >> 24 & 255);
                }
                const derivedKey = PBKDF2_HMAC_SHA256_OneIter(password, b, dkLen);
                if (callback) {
                  callback(null, 1, derivedKey);
                }
                return derivedKey;
            }
            if (callback) {
              nextTick(incrementalSMix);
            }
          };
          if (!callback) {
            while (true) {
              const derivedKey = incrementalSMix();
              if (derivedKey != void 0) {
                return derivedKey;
              }
            }
          }
          incrementalSMix();
        }
        const lib = {
          scrypt: function(password, salt, N, r, p, dkLen, progressCallback) {
            return new Promise(function(resolve, reject) {
              let lastProgress = 0;
              if (progressCallback) {
                progressCallback(0);
              }
              _scrypt(password, salt, N, r, p, dkLen, function(error, progress, key) {
                if (error) {
                  reject(error);
                } else if (key) {
                  if (progressCallback && lastProgress !== 1) {
                    progressCallback(1);
                  }
                  resolve(new Uint8Array(key));
                } else if (progressCallback && progress !== lastProgress) {
                  lastProgress = progress;
                  return progressCallback(progress);
                }
              });
            });
          },
          syncScrypt: function(password, salt, N, r, p, dkLen) {
            return new Uint8Array(_scrypt(password, salt, N, r, p, dkLen));
          }
        };
        if (typeof exports !== "undefined") {
          module.exports = lib;
        } else if (typeof define === "function" && define.amd) {
          define(lib);
        } else if (root) {
          if (root.scrypt) {
            root._scrypt = root.scrypt;
          }
          root.scrypt = lib;
        }
      })(exports);
    }
  });

  // backend/gas-entry.mjs
  var gas_entry_exports = {};
  __export(gas_entry_exports, {
    backup: () => backup,
    initialize: () => initialize,
    page: () => page,
    rpc: () => rpc
  });

  // backend/school-config.mjs
  function schoolDate(value) {
    if (!value) return null;
    if (typeof value !== "string") return null;
    let y, m, d;
    const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim()), thai = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value.trim());
    if (iso) [y, m, d] = iso.slice(1).map(Number);
    else if (thai) [d, m, y] = thai.slice(1).map(Number);
    else return null;
    if (y > 2400) y -= 543;
    if (y < 1900 || y > 2200) return null;
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d ? date : null;
  }
  function calendarError(sc) {
    for (const [start, end, label] of [["term1Start", "term1End", "\u0E20\u0E32\u0E04\u0E40\u0E23\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48 1"], ["term2Start", "term2End", "\u0E20\u0E32\u0E04\u0E40\u0E23\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48 2"]]) {
      if (sc[start] && !schoolDate(sc[start]) || sc[end] && !schoolDate(sc[end])) return "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E02\u0E2D\u0E07" + label + "\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07 \u0E43\u0E0A\u0E49 \u0E27\u0E27/\u0E14\u0E14/\u0E1E.\u0E28. \u0E2B\u0E23\u0E37\u0E2D \u0E04.\u0E28.-\u0E14\u0E14-\u0E27\u0E27";
      if (!!sc[start] !== !!sc[end]) return "\u0E01\u0E23\u0E2D\u0E01\u0E17\u0E31\u0E49\u0E07\u0E27\u0E31\u0E19\u0E40\u0E1B\u0E34\u0E14\u0E41\u0E25\u0E30\u0E27\u0E31\u0E19\u0E1B\u0E34\u0E14" + label;
      if (sc[start] && schoolDate(sc[start]) > schoolDate(sc[end])) return "\u0E27\u0E31\u0E19\u0E1B\u0E34\u0E14" + label + "\u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E01\u0E48\u0E2D\u0E19\u0E27\u0E31\u0E19\u0E40\u0E1B\u0E34\u0E14";
    }
    if (sc.term1End && sc.term2Start && schoolDate(sc.term2Start) <= schoolDate(sc.term1End)) return "\u0E0A\u0E48\u0E27\u0E07\u0E20\u0E32\u0E04\u0E40\u0E23\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48 1 \u0E41\u0E25\u0E30 2 \u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E17\u0E31\u0E1A\u0E01\u0E31\u0E19";
    return "";
  }

  // backend/indicator-model.mjs
  var outcomes = (item) => item.outcomes || [item.text];
  var planText = (plan) => plan.items.flatMap(outcomes).join("\n");
  var singleScore = (item) => item.entryMode === "total";
  var filled = (v) => ["number", "string"].includes(typeof v) && String(v).trim() !== "" && Number.isFinite(Number(v));
  var maxes = (plan) => plan.items.flatMap((i) => i.max);
  function validatePlan(plan) {
    if (!plan || plan.version !== 1 || !Array.isArray(plan.items) || !plan.items.length || plan.items.length > 100) throw Error("\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E07\u0E32\u0E19\u0E40\u0E01\u0E47\u0E1A\u0E04\u0E30\u0E41\u0E19\u0E19 1 \u0E16\u0E36\u0E07 100 \u0E07\u0E32\u0E19");
    const ids = /* @__PURE__ */ new Set();
    for (const item of plan.items) {
      if (!item || typeof item.id !== "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(item.id) || ids.has(item.id)) throw Error("\u0E23\u0E2B\u0E31\u0E2A\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
      ids.add(item.id);
      if (item.entryMode !== void 0 && !["total", "split"].includes(item.entryMode)) throw Error("\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E04\u0E30\u0E41\u0E19\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
      if (item.outcomes !== void 0 && (!Array.isArray(item.outcomes) || !item.outcomes.length || item.outcomes.length > 20 || item.outcomes.some((v) => typeof v !== "string" || !v.trim() || v.length > 4e3 || /[\r\n<>]/.test(v)) || item.text !== item.outcomes.join(" / "))) throw Error("\u0E01\u0E23\u0E2D\u0E01\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E43\u0E19\u0E07\u0E32\u0E19\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19\u0E1A\u0E23\u0E23\u0E17\u0E31\u0E14\u0E25\u0E30 1 \u0E02\u0E49\u0E2D \u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19 20 \u0E02\u0E49\u0E2D");
      if (singleScore(item) && (!Array.isArray(item.max) || item.max[1] !== 0 || item.max[2] !== 0)) throw Error("\u0E04\u0E30\u0E41\u0E19\u0E19\u0E23\u0E27\u0E21\u0E07\u0E32\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35\u0E04\u0E30\u0E41\u0E19\u0E19\u0E40\u0E15\u0E47\u0E21\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E0A\u0E48\u0E2D\u0E07\u0E41\u0E23\u0E01");
      if (typeof item.text !== "string" || !item.text.trim() || item.text.length > 4e3 || /[\r\n<>]/.test(item.text)) throw Error("\u0E01\u0E23\u0E2D\u0E01\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14 / \u0E1C\u0E25\u0E01\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E19\u0E23\u0E39\u0E49\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E1A \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E23\u0E27\u0E21\u0E15\u0E48\u0E2D\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E07\u0E32\u0E19\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19 4000 \u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23");
      if (!Array.isArray(item.max) || item.max.length !== 3 || item.max.some((v) => typeof v !== "number" || !Number.isFinite(v) || v < 0 || v > 1e4) || item.max.every((v) => v === 0)) throw Error("\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E04\u0E30\u0E41\u0E19\u0E19\u0E40\u0E15\u0E47\u0E21\u0E02\u0E2D\u0E07\u0E07\u0E32\u0E19\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 0 \u0E41\u0E25\u0E30\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19 10000 \u0E15\u0E48\u0E2D\u0E0A\u0E48\u0E2D\u0E07");
      if (item.passPercent !== null && (typeof item.passPercent !== "number" || !Number.isFinite(item.passPercent) || item.passPercent < 0 || item.passPercent > 100)) throw Error("\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1C\u0E48\u0E32\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E49\u0E2D\u0E22\u0E25\u0E30 0 \u0E16\u0E36\u0E07 100 \u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E27\u0E49\u0E19\u0E27\u0E48\u0E32\u0E07");
    }
    if (plan.fourParts) validateFourParts(plan);
  }
  function validatePlanChange(before, after, records) {
    const hasScores = records.some((r) => [1, 2].some((t) => (r["t" + t + "slots"] || []).some(filled)) || ["t1repairs", "t2repairs", "annualRepairs"].some((k) => Object.values(r[k] || {}).some(filled)));
    if (hasScores && !before && after) throw Error("\u0E27\u0E34\u0E0A\u0E32\u0E19\u0E35\u0E49\u0E21\u0E35\u0E04\u0E30\u0E41\u0E19\u0E19\u0E40\u0E01\u0E47\u0E1A\u0E40\u0E14\u0E34\u0E21 \u0E15\u0E49\u0E2D\u0E07\u0E08\u0E31\u0E14\u0E04\u0E39\u0E48\u0E04\u0E30\u0E41\u0E19\u0E19\u0E01\u0E31\u0E1A\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E40\u0E14\u0E34\u0E21\u0E01\u0E48\u0E2D\u0E19\u0E40\u0E1B\u0E34\u0E14\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21 \u0E44\u0E21\u0E48\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E04\u0E30\u0E41\u0E19\u0E19\u0E40\u0E14\u0E34\u0E21\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34");
    if (hasScores && before && (!after || before.items.length !== after.items.length || before.items.some((v, i) => v.id !== after.items[i].id))) throw Error("\u0E21\u0E35\u0E04\u0E30\u0E41\u0E19\u0E19\u0E41\u0E25\u0E49\u0E27 \u0E40\u0E1E\u0E34\u0E48\u0E21 \u0E25\u0E1A \u0E2B\u0E23\u0E37\u0E2D\u0E2A\u0E25\u0E31\u0E1A\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 \u0E41\u0E01\u0E49\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E25\u0E30\u0E04\u0E30\u0E41\u0E19\u0E19\u0E40\u0E15\u0E47\u0E21\u0E44\u0E14\u0E49");
    if (hasScores && before && after && before.items.some((item, i) => outcomes(item).length !== outcomes(after.items[i]).length || singleScore(item) !== singleScore(after.items[i]))) throw Error("\u0E21\u0E35\u0E04\u0E30\u0E41\u0E19\u0E19\u0E41\u0E25\u0E49\u0E27 \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E43\u0E19\u0E07\u0E32\u0E19\u0E2B\u0E23\u0E37\u0E2D\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E0A\u0E48\u0E2D\u0E07\u0E04\u0E30\u0E41\u0E19\u0E19\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49");
    if (after) for (const r of records) validateLinkedScores(after, r);
  }
  function validateLinkedScores(plan, r) {
    const m = maxes(plan);
    for (const t of [1, 2]) {
      const a = r["t" + t + "slots"] || [];
      if (!Array.isArray(a) || a.length > m.length) throw Error("\u0E08\u0E33\u0E19\u0E27\u0E19\u0E0A\u0E48\u0E2D\u0E07\u0E04\u0E30\u0E41\u0E19\u0E19\u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14");
      for (let i = 0; i < a.length; i++) if (a[i] !== "" && a[i] !== null && a[i] !== void 0 && (!filled(a[i]) || Number(a[i]) < 0 || Number(a[i]) > m[i])) throw Error("\u0E04\u0E30\u0E41\u0E19\u0E19\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 0 \u0E16\u0E36\u0E07\u0E04\u0E30\u0E41\u0E19\u0E19\u0E40\u0E15\u0E47\u0E21");
    }
    for (const key of ["t1repairs", "t2repairs", "annualRepairs"]) {
      const values = r[key] || {};
      if (typeof values !== "object" || Array.isArray(values)) throw Error("\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E04\u0E30\u0E41\u0E19\u0E19\u0E0B\u0E48\u0E2D\u0E21\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
      for (const [id, v] of Object.entries(values)) {
        const item = plan.items.find((i) => i.id === id), max = item?.max.reduce((a, b) => a + b, 0) * (key === "annualRepairs" ? 2 : 1);
        if (!item || v !== "" && v !== null && (!filled(v) || Number(v) < 0 || Number(v) > max)) throw Error("\u0E04\u0E30\u0E41\u0E19\u0E19\u0E0B\u0E48\u0E2D\u0E21\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E01\u0E34\u0E19\u0E04\u0E30\u0E41\u0E19\u0E19\u0E40\u0E15\u0E47\u0E21");
      }
    }
  }
  function validateFourParts(plan) {
    const p = plan.fourParts;
    if (!p || typeof p !== "object" || Array.isArray(p) || Object.keys(p).some((k) => !["before", "mid", "after", "final"].includes(k)) || ["before", "mid", "after", "final"].some((k) => typeof p[k] !== "number" || !Number.isFinite(p[k]) || p[k] < 0 || p[k] > 100)) throw Error("\u0E01\u0E23\u0E2D\u0E01\u0E04\u0E30\u0E41\u0E19\u0E19\u0E40\u0E15\u0E47\u0E21\u0E17\u0E31\u0E49\u0E07 4 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E49\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
    if (![20, 30].includes(p.final) || Math.abs(p.before + p.mid + p.after + p.final - 100) > 1e-6) throw Error("\u0E01\u0E48\u0E2D\u0E19\u0E01\u0E25\u0E32\u0E07\u0E20\u0E32\u0E04 + \u0E01\u0E25\u0E32\u0E07\u0E20\u0E32\u0E04 + \u0E2B\u0E25\u0E31\u0E07\u0E01\u0E25\u0E32\u0E07\u0E20\u0E32\u0E04 \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E17\u0E48\u0E32\u0E01\u0E31\u0E1A 70 \u0E2B\u0E23\u0E37\u0E2D 80 \u0E41\u0E25\u0E30\u0E23\u0E27\u0E21\u0E1B\u0E25\u0E32\u0E22\u0E20\u0E32\u0E04\u0E40\u0E1B\u0E47\u0E19 100");
    if (p.before <= 0 || p.after <= 0) throw Error("\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E04\u0E30\u0E41\u0E19\u0E19\u0E01\u0E48\u0E2D\u0E19\u0E41\u0E25\u0E30\u0E2B\u0E25\u0E31\u0E07\u0E01\u0E25\u0E32\u0E07\u0E20\u0E32\u0E04\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 0");
    if (plan.items.some((i) => !["before", "after"].includes(i.stage))) throw Error("\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E23\u0E37\u0E2D\u0E2B\u0E25\u0E31\u0E07\u0E01\u0E25\u0E32\u0E07\u0E20\u0E32\u0E04\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E1A\u0E17\u0E38\u0E01\u0E07\u0E32\u0E19");
    for (const stage of ["before", "after"]) if (!plan.items.some((i) => i.stage === stage)) throw Error("\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35\u0E07\u0E32\u0E19\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E17\u0E31\u0E49\u0E07\u0E01\u0E48\u0E2D\u0E19\u0E41\u0E25\u0E30\u0E2B\u0E25\u0E31\u0E07\u0E01\u0E25\u0E32\u0E07\u0E20\u0E32\u0E04");
  }

  // backend/legacy-model.mjs
  var excluded = /* @__PURE__ */ new Set(["lk3_mode", "lk3_dark", "lk3_sb", "lk3_lastClass", "lk3_currentTeacher", "lk3_fbConfig", "lk3_pendingSyncQueue", "lk3_syncNotifiedClasses", "lk3_hasPrinted", "lk3_gutter", "lk3_cloudScope", "lk3_forceFreshCloudScope", "lk3_currentYear", "lk3_lastPullInfo", "lk3_lastPruneAt", "lk3_deviceId", "lk3_syncLeader", "lk3_role", "lk3_attTap", "lk3_mono"]);
  var prefixes = ["__max_", "__mmax_", "__fmax_", "__lock_", "__lockmid_", "__lockfin_"];
  function eligible(k) {
    return typeof k === "string" && !excluded.has(k) && !/^lk3_.+_attSj$/.test(k) && !k.endsWith("__mbase") && (k.startsWith("lk3_") || prefixes.some((p) => k.startsWith(p)));
  }
  function unpack(records) {
    const data = {};
    for (const [id, v] of Object.entries(records)) {
      const [root, ...p] = JSON.parse(id);
      if (!p.length) {
        data[root] = v;
        continue;
      }
      data[root] ?? (data[root] = {});
      let x = data[root];
      for (const k of p.slice(0, -1)) {
        x[k] ?? (x[k] = {});
        x = x[k];
      }
      x[p.at(-1)] = v;
    }
    return data;
  }

  // backend/policy.mjs
  function policy(authContext) {
    function access(u, id, write = false) {
      let p;
      try {
        p = JSON.parse(id);
      } catch {
        return false;
      }
      if (!Array.isArray(p) || p.length > 5 || p.some((x) => typeof x !== "string" || ["__proto__", "prototype", "constructor"].includes(x))) return false;
      const [root, ...rest] = p;
      if (!eligible(root)) return false;
      if (u.role === "admin") return true;
      const { data, grants } = authContext, cs = data.lk3_classes || [];
      const has = (cid, sid) => grants.some((g) => g.cid === cid && (g.sid === sid || g.sid === "*"));
      if (["lk3_school", "lk3_schoolLogo", "lk3_classes"].includes(root)) return !write && !rest.length;
      const cls = cs.find((c) => root.startsWith("lk3_" + c.id + "_"));
      if (cls) {
        const kind = root.slice(("lk3_" + cls.id + "_").length);
        if (!grants.some((g) => g.cid === cls.id)) return false;
        if (["students", "subjects"].includes(kind)) return !write && !rest.length;
        const student = () => (data["lk3_" + cls.id + "_students"] || []).some((s) => s.id === rest[0]);
        if (["scores", "gradeFlag", "roundOv"].includes(kind)) return rest.length === 2 && student() && has(cls.id, rest[1]);
        if (kind === "desc") return rest.length === 1 && (data["lk3_" + cls.id + "_subjects"] || []).some((s) => s.id === rest[0]) && has(cls.id, rest[0]);
        if (kind.startsWith("attendance_")) return rest.length === 3 && student() && has(cls.id, kind.slice(11));
        if (kind === "attendance") return rest.length === 3 && student() && has(cls.id, "*");
        if (kind === "attHours") return rest.length === 2 && has(cls.id, "*");
        if (kind.startsWith("attHours_")) return rest.length === 2 && has(cls.id, kind.slice(9));
        if (has(cls.id, "*")) return /^(clubs|character(?:_t[12])?|reading(?:_t[12])?|activity(?:_t[12])?|competency(?:_t[12])?|pp6note|desc|indicators(?:_t[12])?|gradeFlag|roundOv)$/.test(kind);
        return false;
      }
      return cs.some((c) => (data["lk3_" + c.id + "_subjects"] || []).some((s) => has(c.id, s.id) && prefixes.some((p2) => [1, 2].some((t) => root === p2 + s.id + "_t" + t))));
    }
    function validateRecord(op) {
      const [root, studentId, subjectId] = JSON.parse(op.id), v = op.value;
      if (root === "lk3_school") {
        const error = calendarError(v || {});
        if (error) throw Error(error);
      }
      if (root.endsWith("_desc")) {
        const p = JSON.parse(op.id);
        if (p.length !== 2 || !v || typeof v !== "object" || Array.isArray(v) || Object.keys(v).some((k) => !["desc", "indicators", "scorePlan"].includes(k)) || ["desc", "indicators"].some((k) => v[k] !== void 0 && (typeof v[k] !== "string" || v[k].length > 1e5))) throw Error("\u0E04\u0E33\u0E2D\u0E18\u0E34\u0E1A\u0E32\u0E22\u0E41\u0E25\u0E30\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E23\u0E32\u0E22\u0E27\u0E34\u0E0A\u0E32");
        const old = authContext.data[root]?.[studentId]?.scorePlan, plan = v.scorePlan;
        if (plan) {
          validatePlan(plan);
          if (v.indicators !== planText(plan)) throw Error("\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E04\u0E30\u0E41\u0E19\u0E19");
        }
        const records = Object.values(authContext.validation[root.replace(/_desc$/, "_scores")] || {}).map((st) => st[studentId]).filter(Boolean);
        validatePlanChange(old, plan, records);
      }
      if (root.endsWith("_scores")) {
        if (!v || typeof v !== "object" || Array.isArray(v)) throw Error("\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E04\u0E30\u0E41\u0E19\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
        const cls = (authContext.validation.lk3_classes || []).find((c) => root === "lk3_" + c.id + "_scores"), sj = (authContext.validation["lk3_" + cls?.id + "_subjects"] || []).find((s) => s.id === subjectId);
        if (!cls || !sj || (authContext.validation["lk3_" + cls.id + "_students"] || []).every((s) => s.id !== studentId)) throw Error("\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19\u0E2B\u0E23\u0E37\u0E2D\u0E27\u0E34\u0E0A\u0E32");
        const num = (x, max) => {
          if (x === "" || x === null || x === void 0) return;
          if (!["number", "string"].includes(typeof x) || !Number.isFinite(Number(x)) || Number(x) < 0 || Number(x) > max) throw Error("\u0E04\u0E30\u0E41\u0E19\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 0 \u0E16\u0E36\u0E07\u0E04\u0E30\u0E41\u0E19\u0E19\u0E40\u0E15\u0E47\u0E21");
        };
        for (const t of [1, 2]) {
          const a = v["t" + t + "slots"];
          if (a !== void 0 && !Array.isArray(a)) throw Error("\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E04\u0E30\u0E41\u0E19\u0E19\u0E22\u0E48\u0E2D\u0E22\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
          if (a?.length > 1e3) throw Error("\u0E04\u0E30\u0E41\u0E19\u0E19\u0E22\u0E48\u0E2D\u0E22\u0E21\u0E32\u0E01\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B");
          const plan = authContext.validation["lk3_" + cls.id + "_desc"]?.[subjectId]?.scorePlan;
          if (plan) validateLinkedScores(plan, v);
          const max = plan ? maxes(plan) : authContext.validation["__max_" + subjectId + "_t" + t] || [];
          for (let i = 0; i < (a || []).length; i++) num(a[i], Number(max[i] ?? 10));
          num(v["t" + t + "mraw"], Number(authContext.validation["__mmax_" + subjectId + "_t" + t] ?? 100));
          num(v["t" + t + "fraw"], Number(authContext.validation["__fmax_" + subjectId + "_t" + t] ?? (cls.scoreMode === "p50" ? 20 : cls.scoreMode === "p100" ? 50 : 100)));
        }
      }
      if (/_attendance(?:_|$)/.test(root) && !["", "/", "\u0E1B", "\u0E25", "\u0E02", "-", "\u0E2A"].includes(v)) throw Error("\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E40\u0E27\u0E25\u0E32\u0E40\u0E23\u0E35\u0E22\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
      if (/_attHours(?:_|$)/.test(root) && !(v === "" || Number.isFinite(Number(v)) && Number(v) >= 0 && Number(v) <= 24)) throw Error("\u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02 0\u201324 \u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E27\u0E49\u0E19\u0E27\u0E48\u0E32\u0E07");
    }
    function validate(v, d = 0) {
      if (d > 30) throw Error("\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E0B\u0E49\u0E2D\u0E19\u0E25\u0E36\u0E01\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B");
      if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) {
        if (["__proto__", "constructor", "prototype"].includes(k)) throw Error("\u0E1F\u0E34\u0E25\u0E14\u0E4C\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
        validate(x, d + 1);
      }
      if (typeof v === "string" && (/[<>]/.test(v) || v.length > 5e6)) throw Error("\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E2B\u0E23\u0E37\u0E2D\u0E02\u0E19\u0E32\u0E14\u0E44\u0E21\u0E48\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A");
    }
    return { access, validateRecord, validate };
  }

  // backend/core.mjs
  var clone = (x) => JSON.parse(JSON.stringify(x));
  var fail = (status, message) => {
    throw Object.assign(Error(message), { status });
  };
  var pub = (u) => ({ id: u.id, username: u.username, name: u.name, role: u.role, active: !!u.active, department: u.department || "", position: u.position || "teacher" });
  function dispatch(db, request, crypto2, now = Date.now()) {
    const path = request.path, method = request.method || "GET", b = request.body || {}, query = request.query || {};
    if (!["GET", "POST"].includes(method)) fail(405, "\u0E44\u0E21\u0E48\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E27\u0E34\u0E18\u0E35\u0E40\u0E23\u0E35\u0E22\u0E01\u0E19\u0E35\u0E49");
    const audit = (u2, action) => {
      db.audit.push({ at: new Date(now).toISOString(), uid: u2?.id || "", action });
      db.audit = db.audit.slice(-2e3);
    };
    const session = db.sessions[crypto2.hash(request.token || "")];
    const u = session && session.expires > now ? db.users.find((x) => x.id === session.uid && x.active && session.authHash === x.hash) : null;
    if (path === "/api/status") return { setup: false, user: u ? pub(u) : null };
    if (path === "/api/teacher-search") {
      const q = String(query.q || "").trim();
      if (q.length < 2) return { users: [] };
      if (q.length > 100) fail(400, "\u0E0A\u0E37\u0E48\u0E2D\u0E22\u0E32\u0E27\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B");
      return { users: db.users.filter((x) => x.active && x.role === "teacher" && x.name.includes(q)).slice(0, 15).map(({ name, username }) => ({ name, username })) };
    }
    if (path === "/api/login" && method === "POST") {
      const username = String(b.username || "").toLowerCase();
      if (username.length > 100 || typeof b.password !== "string" || b.password.length > 200) fail(400, "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
      const a = Object.hasOwn(db.attempts, username) ? db.attempts[username] : null;
      if (a && a.until > now && a.n >= 8) fail(429, "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E2D 15 \u0E19\u0E32\u0E17\u0E35\u0E41\u0E25\u0E49\u0E27\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48");
      const target = db.users.find((x) => x.username === username);
      if (!target?.active || !crypto2.verify(b.password, target.salt, target.hash)) {
        Object.defineProperty(db.attempts, username, { value: { n: a?.until > now ? a.n + 1 : 1, until: now + 9e5 }, writable: true, enumerable: true, configurable: true });
        return { __error: 401, error: "\u0E0A\u0E37\u0E48\u0E2D\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E2B\u0E23\u0E37\u0E2D\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07" };
      }
      delete db.attempts[username];
      for (const [k, v] of Object.entries(db.sessions)) if (v.expires <= now) delete db.sessions[k];
      const token = crypto2.random();
      db.sessions[crypto2.hash(token)] = { uid: target.id, expires: now + 216e5, authHash: target.hash };
      audit(target, "login");
      return { user: pub(target), token };
    }
    if (!u) fail(401, "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A");
    const grants = db.grants.filter((g) => g.uid === u.id), data = unpack(db.records), cs = data.lk3_classes || [];
    const ctx = { data, grants, validation: data }, rules = policy(ctx);
    const admin = () => {
      if (u.role !== "admin") fail(403, "\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E41\u0E2D\u0E14\u0E21\u0E34\u0E19");
    };
    const exists = (cid, sid) => cs.some((c) => c.id === cid) && (sid === "*" || (data["lk3_" + cid + "_subjects"] || []).some((s) => s.id === sid));
    const has = (cid, sid) => u.role === "admin" || grants.some((g) => g.cid === cid && (g.sid === sid || g.sid === "*"));
    function options() {
      return cs.map((c) => ({ id: c.id, name: c.level + "/" + c.room + " \u0E1B\u0E35 " + c.year, level: c.level, room: String(c.room), year: String(c.year), plan: c.curriculumPlan || "", subjects: (data["lk3_" + c.id + "_subjects"] || []).map((s) => ({ id: s.id, name: s.name, code: s.code || "", vterm: s.vterm || "", hours: s.hours ?? null })) }));
    }
    if (path === "/api/logout" && method === "POST") {
      delete db.sessions[crypto2.hash(request.token)];
      return { ok: true };
    }
    if (path === "/api/teaching-options") return { classes: options(), grants };
    if (path === "/api/my-teaching" && method === "POST") {
      if (u.role !== "teacher" || b.sid === "*" || !exists(b.cid, b.sid)) fail(403, "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E0A\u0E31\u0E49\u0E19\u0E41\u0E25\u0E30\u0E27\u0E34\u0E0A\u0E32\u0E17\u0E35\u0E48\u0E21\u0E35\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A");
      if (!grants.some((g) => g.cid === b.cid && g.sid === b.sid)) db.grants.push({ uid: u.id, cid: b.cid, sid: b.sid });
      audit(u, "self-assignment " + b.cid + " " + b.sid);
      return { ok: true };
    }
    if (path === "/api/users" && method === "GET") {
      admin();
      return { users: db.users.map(pub), grants: db.grants };
    }
    if (path === "/api/users" && method === "POST") {
      admin();
      if (!/^[\w@.-]{3,100}$/.test(b.username || "") || typeof b.name !== "string" || !b.name.trim() || b.name.length > 200 || typeof b.password !== "string" || b.password.length < 12 || b.password.length > 200 || !["admin", "teacher"].includes(b.role)) fail(400, "\u0E01\u0E23\u0E2D\u0E01\u0E0A\u0E37\u0E48\u0E2D\u0E1A\u0E31\u0E0D\u0E0A\u0E35 \u0E0A\u0E37\u0E48\u0E2D \u0E41\u0E25\u0E30\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 12 \u0E15\u0E31\u0E27");
      rules.validate(b.name);
      if (db.users.some((x) => x.username === b.username.toLowerCase())) fail(409, "\u0E0A\u0E37\u0E48\u0E2D\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E0B\u0E49\u0E33");
      const salt = crypto2.random();
      db.users.push({ id: crypto2.random(), username: b.username.toLowerCase(), name: b.name, role: b.role, salt, hash: crypto2.password(b.password, salt), active: 1 });
      audit(u, "create-user");
      return { ok: true };
    }
    if (path === "/api/user" && method === "POST") {
      admin();
      const t = db.users.find((x) => x.id === b.id);
      if (!t) fail(404, "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1A\u0E31\u0E0D\u0E0A\u0E35");
      if (b.active === false && (t.id === u.id || t.role === "admin" && db.users.filter((x) => x.role === "admin" && x.active).length <= 1)) fail(400, "\u0E1B\u0E34\u0E14\u0E41\u0E2D\u0E14\u0E21\u0E34\u0E19\u0E04\u0E19\u0E2A\u0E38\u0E14\u0E17\u0E49\u0E32\u0E22\u0E2B\u0E23\u0E37\u0E2D\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E15\u0E19\u0E40\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49");
      if (b.password) {
        if (typeof b.password !== "string" || b.password.length < 12 || b.password.length > 200) fail(400, "\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 12 \u0E15\u0E31\u0E27");
        t.salt = crypto2.random();
        t.hash = crypto2.password(b.password, t.salt);
      }
      if (typeof b.active === "boolean") t.active = b.active ? 1 : 0;
      for (const [k, v] of Object.entries(db.sessions)) if (v.uid === t.id) delete db.sessions[k];
      audit(u, "update-user");
      return { ok: true };
    }
    if (path === "/api/grant" && method === "POST") {
      admin();
      if (!db.users.some((x) => x.id === b.uid && x.role === "teacher") || !exists(b.cid, b.sid)) fail(400, "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E04\u0E23\u0E39 \u0E2B\u0E49\u0E2D\u0E07 \u0E2B\u0E23\u0E37\u0E2D\u0E27\u0E34\u0E0A\u0E32");
      db.grants = db.grants.filter((g) => !(g.uid === b.uid && g.cid === b.cid && g.sid === b.sid));
      if (!b.remove) db.grants.push({ uid: b.uid, cid: b.cid, sid: b.sid });
      audit(u, "assignment");
      return { ok: true };
    }
    if (path === "/api/workspace") {
      const records = cs.filter((c) => u.role === "admin" || grants.some((g) => g.cid === c.id)).map((c) => ({ id: "class:" + c.id, rev: 1, value: { name: c.level + "/" + c.room, students: [], subjects: (data["lk3_" + c.id + "_subjects"] || []).filter((s) => has(c.id, s.id)).map((s) => ({ id: s.id, name: s.name })) } }));
      return { user: pub(u), records };
    }
    if (path === "/api/audit") {
      admin();
      return { events: db.audit.slice(-100).reverse() };
    }
    if (path === "/api/export") {
      admin();
      return { format: "SaintTheresaDrive1", records: db.records, revisions: db.revisions };
    }
    if (path === "/api/legacy" && method === "GET") {
      const records = {}, revisions = {};
      for (const [id, rev] of Object.entries(db.revisions)) {
        if (!rules.access(u, id)) continue;
        revisions[id] = rev;
        if (!Object.hasOwn(db.records, id)) continue;
        let v = clone(db.records[id]);
        const [root] = JSON.parse(id);
        if (u.role !== "admin") {
          if (root === "lk3_classes") v = v.filter((c2) => grants.some((g) => g.cid === c2.id));
          if (root === "lk3_school") {
            const allowed = ["name", "nameEn", "affil", "tambon", "amphoe", "prov", "principal", "principalTitleMode", "principalTitleCustom", "sjSignerMode", "pp6SignerMode", "schoolType", "educationOffice", "licensee", "manager", "registrar", "teacherRepresentative", "registrationHead", "deputyDirector", "academicHead", "measurementHead", "signers", "term1Start", "term1End", "term2Start", "term2End", "holidays", "removedDefaultHolidays"];
            v = Object.fromEntries(Object.entries(v).filter(([k]) => allowed.includes(k)));
          }
          const c = cs.find((c2) => root === "lk3_" + c2.id + "_subjects");
          if (c) v = v.filter((s) => has(c.id, s.id));
        }
        records[id] = v;
      }
      return { records, revisions, user: pub(u), grants, staff: u.role === "admin" ? db.users.filter((x) => x.active && x.role === "teacher").map((x) => x.name) : [], teacherAssignments: db.grants.filter((g) => u.role === "admin" || g.uid === u.id).flatMap((g) => {
        const t = db.users.find((x) => x.id === g.uid && x.active);
        return t ? [{ cid: g.cid, sid: g.sid, name: t.name }] : [];
      }) };
    }
    if (path === "/api/legacy" && method === "POST") {
      if (!Array.isArray(b.operations) || b.operations.length > 2e4) fail(400, "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
      const next = clone(db.records), ids = /* @__PURE__ */ new Set();
      for (const o of b.operations) {
        if (!o || typeof o.id !== "string" || ids.has(o.id) || !rules.access(u, o.id, true)) fail(403, "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E19\u0E35\u0E49");
        ids.add(o.id);
        if (!Number.isSafeInteger(o.rev) || o.rev !== (db.revisions[o.id] || 0)) fail(409, "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E16\u0E39\u0E01\u0E41\u0E01\u0E49\u0E08\u0E32\u0E01\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E2D\u0E37\u0E48\u0E19 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E07\u0E32\u0E19\u0E41\u0E25\u0E49\u0E27\u0E42\u0E2B\u0E25\u0E14\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14");
        if (o.deleted) delete next[o.id];
        else next[o.id] = o.value;
      }
      ctx.validation = unpack(next);
      for (const o of b.operations) {
        if (!o.deleted) {
          rules.validate(o.value);
          rules.validateRecord(o);
        } else {
          const p = JSON.parse(o.id);
          if (p[0].endsWith("_desc") && p.length === 2) {
            const d = data[p[0]]?.[p[1]];
            if (d?.scorePlan) {
              rules.validateRecord({ id: o.id, value: { desc: d.desc || "", indicators: "" } });
            }
          }
        }
      }
      db.records = next;
      for (const o of b.operations) db.revisions[o.id] = o.rev + 1;
      const nd = ctx.validation;
      db.grants = db.grants.filter((g) => (nd.lk3_classes || []).some((c) => c.id === g.cid) && (g.sid === "*" || (nd["lk3_" + g.cid + "_subjects"] || []).some((s) => s.id === g.sid)));
      audit(u, "legacy-write " + b.operations.length);
      return { revisions: Object.fromEntries(b.operations.map((o) => [o.id, o.rev + 1])) };
    }
    if (path === "/api/subject-weight" && method === "POST") {
      if (!exists(b.cid, b.sid) || !has(b.cid, b.sid)) fail(403, "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19");
      if (![70, 80].includes(b.wt)) fail(400, "\u0E40\u0E25\u0E37\u0E2D\u0E01 70:30 \u0E2B\u0E23\u0E37\u0E2D 80:20");
      const id = JSON.stringify(["lk3_" + b.cid + "_subjects"]);
      if (b.rev !== db.revisions[id]) fail(409, "\u0E23\u0E32\u0E22\u0E27\u0E34\u0E0A\u0E32\u0E16\u0E39\u0E01\u0E41\u0E01\u0E49\u0E44\u0E02\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E42\u0E2B\u0E25\u0E14\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14");
      if (data["lk3_" + b.cid + "_desc"]?.[b.sid]?.scorePlan?.fourParts) fail(400, "\u0E1B\u0E23\u0E31\u0E1A\u0E43\u0E19\u0E2B\u0E19\u0E49\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E04\u0E30\u0E41\u0E19\u0E19 4 \u0E2A\u0E48\u0E27\u0E19");
      const subjects = clone(db.records[id]), sj = subjects.find((x) => x.id === b.sid), c = cs.find((c2) => c2.id === b.cid), mid = Number(sj.wmid ?? 30);
      if ((c.scoreMode === "sec" || c.level.startsWith("\u0E21.")) && (!Number.isFinite(mid) || mid < 0 || mid >= b.wt)) fail(400, "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E01\u0E25\u0E32\u0E07\u0E20\u0E32\u0E04\u0E40\u0E14\u0E34\u0E21\u0E44\u0E21\u0E48\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A");
      sj.wt = b.wt;
      sj.wf = 100 - b.wt;
      db.records[id] = subjects;
      db.revisions[id]++;
      for (const key of Object.keys(db.records)) {
        const p = JSON.parse(key);
        if (p.length === 3 && p[0] === "lk3_" + b.cid + "_roundOv" && p[2] === b.sid) {
          delete db.records[key];
          db.revisions[key] = (db.revisions[key] || 0) + 1;
        }
      }
      audit(u, "subject-weight");
      return { ok: true };
    }
    fail(404, "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07");
  }

  // backend/crypto.mjs
  var import_scrypt = __toESM(require_scrypt(), 1);

  // vendor/noble-ciphers/esm/utils.js
  /*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */
  function isBytes(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
  }
  function abool(b) {
    if (typeof b !== "boolean")
      throw new Error(`boolean expected, not ${b}`);
  }
  function abytes(b, ...lengths) {
    if (!isBytes(b))
      throw new Error("Uint8Array expected");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
  }
  function aexists(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function aoutput(out, instance) {
    abytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error("digestInto() expects output buffer of length at least " + min);
    }
  }
  function u8(arr) {
    return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
  }
  function u32(arr) {
    return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
  }
  function clean(...arrays) {
    for (let i = 0; i < arrays.length; i++) {
      arrays[i].fill(0);
    }
  }
  function createView(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  }
  var isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
  function utf8ToBytes(str) {
    if (typeof str !== "string")
      throw new Error("string expected");
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function toBytes(data) {
    if (typeof data === "string")
      data = utf8ToBytes(data);
    else if (isBytes(data))
      data = copyBytes(data);
    else
      throw new Error("Uint8Array expected, got " + typeof data);
    return data;
  }
  function equalBytes(a, b) {
    if (a.length !== b.length)
      return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++)
      diff |= a[i] ^ b[i];
    return diff === 0;
  }
  var wrapCipher = /* @__NO_SIDE_EFFECTS__ */ (params, constructor) => {
    function wrappedCipher(key, ...args) {
      abytes(key);
      if (!isLE)
        throw new Error("Non little-endian hardware is not yet supported");
      if (params.nonceLength !== void 0) {
        const nonce = args[0];
        if (!nonce)
          throw new Error("nonce / iv required");
        if (params.varSizeNonce)
          abytes(nonce);
        else
          abytes(nonce, params.nonceLength);
      }
      const tagl = params.tagLength;
      if (tagl && args[1] !== void 0) {
        abytes(args[1]);
      }
      const cipher = constructor(key, ...args);
      const checkOutput = (fnLength, output) => {
        if (output !== void 0) {
          if (fnLength !== 2)
            throw new Error("cipher output not supported");
          abytes(output);
        }
      };
      let called = false;
      const wrCipher = {
        encrypt(data, output) {
          if (called)
            throw new Error("cannot encrypt() twice with same key + nonce");
          called = true;
          abytes(data);
          checkOutput(cipher.encrypt.length, output);
          return cipher.encrypt(data, output);
        },
        decrypt(data, output) {
          abytes(data);
          if (tagl && data.length < tagl)
            throw new Error("invalid ciphertext length: smaller than tagLength=" + tagl);
          checkOutput(cipher.decrypt.length, output);
          return cipher.decrypt(data, output);
        }
      };
      return wrCipher;
    }
    Object.assign(wrappedCipher, params);
    return wrappedCipher;
  };
  function getOutput(expectedLength, out, onlyAligned = true) {
    if (out === void 0)
      return new Uint8Array(expectedLength);
    if (out.length !== expectedLength)
      throw new Error("invalid output length, expected " + expectedLength + ", got: " + out.length);
    if (onlyAligned && !isAligned32(out))
      throw new Error("invalid output, must be aligned");
    return out;
  }
  function setBigUint64(view, byteOffset, value, isLE2) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE2);
    const _32n = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE2 ? 4 : 0;
    const l = isLE2 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE2);
    view.setUint32(byteOffset + l, wl, isLE2);
  }
  function u64Lengths(dataLength, aadLength, isLE2) {
    abool(isLE2);
    const num = new Uint8Array(16);
    const view = createView(num);
    setBigUint64(view, 0, BigInt(aadLength), isLE2);
    setBigUint64(view, 8, BigInt(dataLength), isLE2);
    return num;
  }
  function isAligned32(bytes2) {
    return bytes2.byteOffset % 4 === 0;
  }
  function copyBytes(bytes2) {
    return Uint8Array.from(bytes2);
  }

  // vendor/noble-ciphers/esm/_polyval.js
  var BLOCK_SIZE = 16;
  var ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
  var ZEROS32 = u32(ZEROS16);
  var POLY = 225;
  var mul2 = (s0, s1, s2, s3) => {
    const hiBit = s3 & 1;
    return {
      s3: s2 << 31 | s3 >>> 1,
      s2: s1 << 31 | s2 >>> 1,
      s1: s0 << 31 | s1 >>> 1,
      s0: s0 >>> 1 ^ POLY << 24 & -(hiBit & 1)
      // reduce % poly
    };
  };
  var swapLE = (n) => (n >>> 0 & 255) << 24 | (n >>> 8 & 255) << 16 | (n >>> 16 & 255) << 8 | n >>> 24 & 255 | 0;
  function _toGHASHKey(k) {
    k.reverse();
    const hiBit = k[15] & 1;
    let carry = 0;
    for (let i = 0; i < k.length; i++) {
      const t = k[i];
      k[i] = t >>> 1 | carry;
      carry = (t & 1) << 7;
    }
    k[0] ^= -hiBit & 225;
    return k;
  }
  var estimateWindow = (bytes2) => {
    if (bytes2 > 64 * 1024)
      return 8;
    if (bytes2 > 1024)
      return 4;
    return 2;
  };
  var GHASH = class {
    // We select bits per window adaptively based on expectedLength
    constructor(key, expectedLength) {
      this.blockLen = BLOCK_SIZE;
      this.outputLen = BLOCK_SIZE;
      this.s0 = 0;
      this.s1 = 0;
      this.s2 = 0;
      this.s3 = 0;
      this.finished = false;
      key = toBytes(key);
      abytes(key, 16);
      const kView = createView(key);
      let k0 = kView.getUint32(0, false);
      let k1 = kView.getUint32(4, false);
      let k2 = kView.getUint32(8, false);
      let k3 = kView.getUint32(12, false);
      const doubles = [];
      for (let i = 0; i < 128; i++) {
        doubles.push({ s0: swapLE(k0), s1: swapLE(k1), s2: swapLE(k2), s3: swapLE(k3) });
        ({ s0: k0, s1: k1, s2: k2, s3: k3 } = mul2(k0, k1, k2, k3));
      }
      const W = estimateWindow(expectedLength || 1024);
      if (![1, 2, 4, 8].includes(W))
        throw new Error("ghash: invalid window size, expected 2, 4 or 8");
      this.W = W;
      const bits = 128;
      const windows = bits / W;
      const windowSize = this.windowSize = 2 ** W;
      const items = [];
      for (let w = 0; w < windows; w++) {
        for (let byte = 0; byte < windowSize; byte++) {
          let s0 = 0, s1 = 0, s2 = 0, s3 = 0;
          for (let j = 0; j < W; j++) {
            const bit = byte >>> W - j - 1 & 1;
            if (!bit)
              continue;
            const { s0: d0, s1: d1, s2: d2, s3: d3 } = doubles[W * w + j];
            s0 ^= d0, s1 ^= d1, s2 ^= d2, s3 ^= d3;
          }
          items.push({ s0, s1, s2, s3 });
        }
      }
      this.t = items;
    }
    _updateBlock(s0, s1, s2, s3) {
      s0 ^= this.s0, s1 ^= this.s1, s2 ^= this.s2, s3 ^= this.s3;
      const { W, t, windowSize } = this;
      let o0 = 0, o1 = 0, o2 = 0, o3 = 0;
      const mask = (1 << W) - 1;
      let w = 0;
      for (const num of [s0, s1, s2, s3]) {
        for (let bytePos = 0; bytePos < 4; bytePos++) {
          const byte = num >>> 8 * bytePos & 255;
          for (let bitPos = 8 / W - 1; bitPos >= 0; bitPos--) {
            const bit = byte >>> W * bitPos & mask;
            const { s0: e0, s1: e1, s2: e2, s3: e3 } = t[w * windowSize + bit];
            o0 ^= e0, o1 ^= e1, o2 ^= e2, o3 ^= e3;
            w += 1;
          }
        }
      }
      this.s0 = o0;
      this.s1 = o1;
      this.s2 = o2;
      this.s3 = o3;
    }
    update(data) {
      aexists(this);
      data = toBytes(data);
      abytes(data);
      const b32 = u32(data);
      const blocks = Math.floor(data.length / BLOCK_SIZE);
      const left = data.length % BLOCK_SIZE;
      for (let i = 0; i < blocks; i++) {
        this._updateBlock(b32[i * 4 + 0], b32[i * 4 + 1], b32[i * 4 + 2], b32[i * 4 + 3]);
      }
      if (left) {
        ZEROS16.set(data.subarray(blocks * BLOCK_SIZE));
        this._updateBlock(ZEROS32[0], ZEROS32[1], ZEROS32[2], ZEROS32[3]);
        clean(ZEROS32);
      }
      return this;
    }
    destroy() {
      const { t } = this;
      for (const elm of t) {
        elm.s0 = 0, elm.s1 = 0, elm.s2 = 0, elm.s3 = 0;
      }
    }
    digestInto(out) {
      aexists(this);
      aoutput(out, this);
      this.finished = true;
      const { s0, s1, s2, s3 } = this;
      const o32 = u32(out);
      o32[0] = s0;
      o32[1] = s1;
      o32[2] = s2;
      o32[3] = s3;
      return out;
    }
    digest() {
      const res = new Uint8Array(BLOCK_SIZE);
      this.digestInto(res);
      this.destroy();
      return res;
    }
  };
  var Polyval = class extends GHASH {
    constructor(key, expectedLength) {
      key = toBytes(key);
      abytes(key);
      const ghKey = _toGHASHKey(copyBytes(key));
      super(ghKey, expectedLength);
      clean(ghKey);
    }
    update(data) {
      data = toBytes(data);
      aexists(this);
      const b32 = u32(data);
      const left = data.length % BLOCK_SIZE;
      const blocks = Math.floor(data.length / BLOCK_SIZE);
      for (let i = 0; i < blocks; i++) {
        this._updateBlock(swapLE(b32[i * 4 + 3]), swapLE(b32[i * 4 + 2]), swapLE(b32[i * 4 + 1]), swapLE(b32[i * 4 + 0]));
      }
      if (left) {
        ZEROS16.set(data.subarray(blocks * BLOCK_SIZE));
        this._updateBlock(swapLE(ZEROS32[3]), swapLE(ZEROS32[2]), swapLE(ZEROS32[1]), swapLE(ZEROS32[0]));
        clean(ZEROS32);
      }
      return this;
    }
    digestInto(out) {
      aexists(this);
      aoutput(out, this);
      this.finished = true;
      const { s0, s1, s2, s3 } = this;
      const o32 = u32(out);
      o32[0] = s0;
      o32[1] = s1;
      o32[2] = s2;
      o32[3] = s3;
      return out.reverse();
    }
  };
  function wrapConstructorWithKey(hashCons) {
    const hashC = (msg, key) => hashCons(key, msg.length).update(toBytes(msg)).digest();
    const tmp = hashCons(new Uint8Array(16), 0);
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (key, expectedLength) => hashCons(key, expectedLength);
    return hashC;
  }
  var ghash = wrapConstructorWithKey((key, expectedLength) => new GHASH(key, expectedLength));
  var polyval = wrapConstructorWithKey((key, expectedLength) => new Polyval(key, expectedLength));

  // vendor/noble-ciphers/esm/aes.js
  var BLOCK_SIZE2 = 16;
  var BLOCK_SIZE32 = 4;
  var EMPTY_BLOCK = /* @__PURE__ */ new Uint8Array(BLOCK_SIZE2);
  var POLY2 = 283;
  function mul22(n) {
    return n << 1 ^ POLY2 & -(n >> 7);
  }
  function mul(a, b) {
    let res = 0;
    for (; b > 0; b >>= 1) {
      res ^= a & -(b & 1);
      a = mul22(a);
    }
    return res;
  }
  var sbox = /* @__PURE__ */ (() => {
    const t = new Uint8Array(256);
    for (let i = 0, x = 1; i < 256; i++, x ^= mul22(x))
      t[i] = x;
    const box = new Uint8Array(256);
    box[0] = 99;
    for (let i = 0; i < 255; i++) {
      let x = t[255 - i];
      x |= x << 8;
      box[t[i]] = (x ^ x >> 4 ^ x >> 5 ^ x >> 6 ^ x >> 7 ^ 99) & 255;
    }
    clean(t);
    return box;
  })();
  var rotr32_8 = (n) => n << 24 | n >>> 8;
  var rotl32_8 = (n) => n << 8 | n >>> 24;
  function genTtable(sbox2, fn) {
    if (sbox2.length !== 256)
      throw new Error("Wrong sbox length");
    const T0 = new Uint32Array(256).map((_, j) => fn(sbox2[j]));
    const T1 = T0.map(rotl32_8);
    const T2 = T1.map(rotl32_8);
    const T3 = T2.map(rotl32_8);
    const T01 = new Uint32Array(256 * 256);
    const T23 = new Uint32Array(256 * 256);
    const sbox22 = new Uint16Array(256 * 256);
    for (let i = 0; i < 256; i++) {
      for (let j = 0; j < 256; j++) {
        const idx = i * 256 + j;
        T01[idx] = T0[i] ^ T1[j];
        T23[idx] = T2[i] ^ T3[j];
        sbox22[idx] = sbox2[i] << 8 | sbox2[j];
      }
    }
    return { sbox: sbox2, sbox2: sbox22, T0, T1, T2, T3, T01, T23 };
  }
  var tableEncoding = /* @__PURE__ */ genTtable(sbox, (s) => mul(s, 3) << 24 | s << 16 | s << 8 | mul(s, 2));
  var xPowers = /* @__PURE__ */ (() => {
    const p = new Uint8Array(16);
    for (let i = 0, x = 1; i < 16; i++, x = mul22(x))
      p[i] = x;
    return p;
  })();
  function expandKeyLE(key) {
    abytes(key);
    const len = key.length;
    if (![16, 24, 32].includes(len))
      throw new Error("aes: invalid key size, should be 16, 24 or 32, got " + len);
    const { sbox2 } = tableEncoding;
    const toClean = [];
    if (!isAligned32(key))
      toClean.push(key = copyBytes(key));
    const k32 = u32(key);
    const Nk = k32.length;
    const subByte = (n) => applySbox(sbox2, n, n, n, n);
    const xk = new Uint32Array(len + 28);
    xk.set(k32);
    for (let i = Nk; i < xk.length; i++) {
      let t = xk[i - 1];
      if (i % Nk === 0)
        t = subByte(rotr32_8(t)) ^ xPowers[i / Nk - 1];
      else if (Nk > 6 && i % Nk === 4)
        t = subByte(t);
      xk[i] = xk[i - Nk] ^ t;
    }
    clean(...toClean);
    return xk;
  }
  function apply0123(T01, T23, s0, s1, s2, s3) {
    return T01[s0 << 8 & 65280 | s1 >>> 8 & 255] ^ T23[s2 >>> 8 & 65280 | s3 >>> 24 & 255];
  }
  function applySbox(sbox2, s0, s1, s2, s3) {
    return sbox2[s0 & 255 | s1 & 65280] | sbox2[s2 >>> 16 & 255 | s3 >>> 16 & 65280] << 16;
  }
  function encrypt(xk, s0, s1, s2, s3) {
    const { sbox2, T01, T23 } = tableEncoding;
    let k = 0;
    s0 ^= xk[k++], s1 ^= xk[k++], s2 ^= xk[k++], s3 ^= xk[k++];
    const rounds = xk.length / 4 - 2;
    for (let i = 0; i < rounds; i++) {
      const t02 = xk[k++] ^ apply0123(T01, T23, s0, s1, s2, s3);
      const t12 = xk[k++] ^ apply0123(T01, T23, s1, s2, s3, s0);
      const t22 = xk[k++] ^ apply0123(T01, T23, s2, s3, s0, s1);
      const t32 = xk[k++] ^ apply0123(T01, T23, s3, s0, s1, s2);
      s0 = t02, s1 = t12, s2 = t22, s3 = t32;
    }
    const t0 = xk[k++] ^ applySbox(sbox2, s0, s1, s2, s3);
    const t1 = xk[k++] ^ applySbox(sbox2, s1, s2, s3, s0);
    const t2 = xk[k++] ^ applySbox(sbox2, s2, s3, s0, s1);
    const t3 = xk[k++] ^ applySbox(sbox2, s3, s0, s1, s2);
    return { s0: t0, s1: t1, s2: t2, s3: t3 };
  }
  function ctr32(xk, isLE2, nonce, src, dst) {
    abytes(nonce, BLOCK_SIZE2);
    abytes(src);
    dst = getOutput(src.length, dst);
    const ctr = nonce;
    const c32 = u32(ctr);
    const view = createView(ctr);
    const src32 = u32(src);
    const dst32 = u32(dst);
    const ctrPos = isLE2 ? 0 : 12;
    const srcLen = src.length;
    let ctrNum = view.getUint32(ctrPos, isLE2);
    let { s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]);
    for (let i = 0; i + 4 <= src32.length; i += 4) {
      dst32[i + 0] = src32[i + 0] ^ s0;
      dst32[i + 1] = src32[i + 1] ^ s1;
      dst32[i + 2] = src32[i + 2] ^ s2;
      dst32[i + 3] = src32[i + 3] ^ s3;
      ctrNum = ctrNum + 1 >>> 0;
      view.setUint32(ctrPos, ctrNum, isLE2);
      ({ s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]));
    }
    const start = BLOCK_SIZE2 * Math.floor(src32.length / BLOCK_SIZE32);
    if (start < srcLen) {
      const b32 = new Uint32Array([s0, s1, s2, s3]);
      const buf = u8(b32);
      for (let i = start, pos = 0; i < srcLen; i++, pos++)
        dst[i] = src[i] ^ buf[pos];
      clean(b32);
    }
    return dst;
  }
  function computeTag(fn, isLE2, key, data, AAD) {
    const aadLength = AAD ? AAD.length : 0;
    const h = fn.create(key, data.length + aadLength);
    if (AAD)
      h.update(AAD);
    const num = u64Lengths(8 * data.length, 8 * aadLength, isLE2);
    h.update(data);
    h.update(num);
    const res = h.digest();
    clean(num);
    return res;
  }
  var gcm = /* @__PURE__ */ wrapCipher({ blockSize: 16, nonceLength: 12, tagLength: 16, varSizeNonce: true }, function aesgcm(key, nonce, AAD) {
    if (nonce.length < 8)
      throw new Error("aes/gcm: invalid nonce length");
    const tagLength = 16;
    function _computeTag(authKey, tagMask, data) {
      const tag = computeTag(ghash, false, authKey, data, AAD);
      for (let i = 0; i < tagMask.length; i++)
        tag[i] ^= tagMask[i];
      return tag;
    }
    function deriveKeys() {
      const xk = expandKeyLE(key);
      const authKey = EMPTY_BLOCK.slice();
      const counter = EMPTY_BLOCK.slice();
      ctr32(xk, false, counter, counter, authKey);
      if (nonce.length === 12) {
        counter.set(nonce);
      } else {
        const nonceLen = EMPTY_BLOCK.slice();
        const view = createView(nonceLen);
        setBigUint64(view, 8, BigInt(nonce.length * 8), false);
        const g = ghash.create(authKey).update(nonce).update(nonceLen);
        g.digestInto(counter);
        g.destroy();
      }
      const tagMask = ctr32(xk, false, counter, EMPTY_BLOCK);
      return { xk, authKey, counter, tagMask };
    }
    return {
      encrypt(plaintext) {
        const { xk, authKey, counter, tagMask } = deriveKeys();
        const out = new Uint8Array(plaintext.length + tagLength);
        const toClean = [xk, authKey, counter, tagMask];
        if (!isAligned32(plaintext))
          toClean.push(plaintext = copyBytes(plaintext));
        ctr32(xk, false, counter, plaintext, out.subarray(0, plaintext.length));
        const tag = _computeTag(authKey, tagMask, out.subarray(0, out.length - tagLength));
        toClean.push(tag);
        out.set(tag, plaintext.length);
        clean(...toClean);
        return out;
      },
      decrypt(ciphertext) {
        const { xk, authKey, counter, tagMask } = deriveKeys();
        const toClean = [xk, authKey, tagMask, counter];
        if (!isAligned32(ciphertext))
          toClean.push(ciphertext = copyBytes(ciphertext));
        const data = ciphertext.subarray(0, -tagLength);
        const passedTag = ciphertext.subarray(-tagLength);
        const tag = _computeTag(authKey, tagMask, data);
        toClean.push(tag);
        if (!equalBytes(tag, passedTag))
          throw new Error("aes/gcm: invalid ghash tag");
        const out = ctr32(xk, false, counter, data);
        clean(...toClean);
        return out;
      }
    };
  });

  // backend/crypto.mjs
  var hex = (a) => Array.from(a, (x) => x.toString(16).padStart(2, "0")).join("");
  var bytes = (s) => {
    if (typeof s !== "string" || s.length % 2 || !/^[a-f0-9]+$/i.test(s)) throw Error("Invalid hexadecimal value");
    return Uint8Array.from(s.match(/../g), (x) => parseInt(x, 16));
  };
  function makeCrypto(io) {
    const password = (p, s) => hex(import_scrypt.default.syncScrypt(io.encode(p), io.encode(s), 16384, 8, 1, 64));
    return { hash: io.hash, random: io.random, password, verify: (p, s, h) => {
      const candidate = password(p, s);
      if (candidate.length !== h.length) return false;
      let diff = 0;
      for (let i = 0; i < h.length; i++) diff |= h.charCodeAt(i) ^ candidate.charCodeAt(i);
      return diff === 0;
    } };
  }
  function seal(value, key, nonce, encode2) {
    const iv = bytes(nonce).slice(0, 12);
    return { format: "SaintTheresaEncrypted1", iv: hex(iv), ciphertext: hex(gcm(bytes(key), iv).encrypt(encode2(JSON.stringify(value)))) };
  }
  function open(envelope, key, decode2) {
    if (envelope?.format !== "SaintTheresaEncrypted1" || envelope.iv.length !== 24) throw Error("Invalid encrypted database");
    return JSON.parse(decode2(gcm(bytes(key), bytes(envelope.iv)).decrypt(bytes(envelope.ciphertext))));
  }

  // backend/gas-entry.mjs
  if (typeof globalThis.setImmediate === "undefined") globalThis.setImmediate = () => {
    throw Error("Async crypto is not supported");
  };
  var props = () => PropertiesService.getScriptProperties();
  var encode = (s) => Uint8Array.from(Utilities.newBlob(s).getBytes(), (b) => (b + 256) % 256);
  var decode = (a) => Utilities.newBlob(Array.from(a, (b) => b > 127 ? b - 256 : b)).getDataAsString("UTF-8");
  var hex2 = (a) => Array.from(a, (b) => ((b + 256) % 256).toString(16).padStart(2, "0")).join("");
  var hash = (s) => hex2(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(s), Utilities.Charset.UTF_8));
  var random = () => hash(Utilities.getUuid() + Utilities.getUuid() + Date.now());
  var crypto = makeCrypto({ encode, hash, random });
  function settings() {
    const p = props(), key = p.getProperty("ST_DATABASE_KEY"), origin = p.getProperty("ST_SITE_ORIGIN");
    if (!key || !/^[a-f0-9]{64}$/.test(key) || !origin || !/^https:\/\/[^/]+$/.test(origin)) throw Error("\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E23\u0E30\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A");
    return { p, key, origin };
  }
  function page(e) {
    const { origin } = settings(), nonce = String(e?.parameter?.channel || "");
    if (!/^[a-f0-9]{48}$/.test(nonce)) return HtmlService.createHtmlOutput("Saint Theresa API: open the school website.");
    const t = HtmlService.createTemplateFromFile("Bridge");
    t.origin = origin;
    t.channel = nonce;
    return t.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  function rpc(request) {
    const lock = LockService.getScriptLock();
    if (!lock.tryLock(15e3)) return { status: 503, body: { error: "\u0E21\u0E35\u0E1C\u0E39\u0E49\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E01\u0E31\u0E19 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48" } };
    try {
      const { p, key, origin } = settings();
      if (!request || request.origin !== origin || typeof request.path !== "string" || !request.path.startsWith("/api/") || JSON.stringify(request).length > 12e6) return { status: 400, body: { error: "\u0E04\u0E33\u0E02\u0E2D\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07" } };
      const fileId = p.getProperty("ST_DATABASE_FILE");
      if (!fileId) return { status: 503, body: { error: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25" } };
      const file = DriveApp.getFileById(fileId), db = open(JSON.parse(file.getBlob().getDataAsString()), key, decode);
      const cache = CacheService.getScriptCache(), tokenKey = hash(request.token || ""), savedSession = cache.get("st-session-" + tokenKey);
      db.sessions = {};
      if (savedSession) db.sessions[tokenKey] = JSON.parse(savedSession);
      const username = String(request.body?.username || "").toLowerCase(), attemptKey = "st-attempt-" + hash(username), attempt = cache.get(attemptKey);
      db.attempts = {};
      if (attempt) db.attempts[username] = JSON.parse(attempt);
      let result;
      try {
        result = dispatch(db, request, crypto);
      } catch (e) {
        if (!e.status) e.status = 400;
        throw e;
      }
      if (request.path === "/api/login") {
        if (db.attempts[username]) cache.put(attemptKey, JSON.stringify(db.attempts[username]), 900);
        else cache.remove(attemptKey);
        if (result.token) {
          const k = hash(result.token);
          cache.put("st-session-" + k, JSON.stringify(db.sessions[k]), 21600);
        }
      } else if (request.path === "/api/logout") cache.remove("st-session-" + tokenKey);
      const write = request.method === "POST" && !["/api/login", "/api/logout"].includes(request.path);
      if (write && !result.__error) {
        db.sessions = {};
        db.attempts = {};
        db.generation = (db.generation || 0) + 1;
        file.setContent(JSON.stringify(seal(db, key, random(), encode)));
      }
      if (result.__error) return { status: result.__error, body: { error: result.error } };
      return { status: 200, body: result };
    } catch (e) {
      return { status: e.status || 500, body: { error: e.status ? e.message : "\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48\u0E2B\u0E23\u0E37\u0E2D\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E14\u0E39\u0E41\u0E25" } };
    } finally {
      lock.releaseLock();
    }
  }
  function initialize() {
    const { p, key } = settings();
    if (p.getProperty("ST_DATABASE_FILE")) throw Error("Database already initialized");
    const incoming = p.getProperty("ST_IMPORT_FILE");
    if (!incoming) throw Error("Set ST_IMPORT_FILE to the encrypted migration file");
    const source = DriveApp.getFileById(incoming), raw = source.getBlob().getDataAsString(), db = open(JSON.parse(raw), key, decode);
    if (db.format !== "SaintTheresaDriveDB1" || !db.users?.some((u) => u.role === "admin" && u.active) || !db.records || !db.revisions) throw Error("Invalid migration");
    const folder = DriveApp.createFolder("Saint Theresa \u2014 \u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E31\u0E27");
    folder.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);
    const file = folder.createFile("database.encrypted.json", raw, MimeType.PLAIN_TEXT);
    file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);
    p.setProperties({ ST_DATABASE_FILE: file.getId(), ST_PRIVATE_FOLDER: folder.getId(), ST_BACKUP_FOLDER: "1khpXrVLvw3ERl22OUwzApbnL27uAKdVs" });
    p.deleteProperty("ST_IMPORT_FILE");
    return { ok: true, users: db.users.length };
  }
  function backup() {
    const { p, key } = settings(), lock = LockService.getScriptLock();
    lock.waitLock(15e3);
    try {
      const file = DriveApp.getFileById(p.getProperty("ST_DATABASE_FILE")), db = open(JSON.parse(file.getBlob().getDataAsString()), key, decode);
      const envelope = JSON.stringify(seal(db, key, random(), encode)), folder = DriveApp.getFolderById(p.getProperty("ST_BACKUP_FOLDER"));
      const out = folder.createFile("Saint-Theresa-cloud-" + Utilities.formatDate(/* @__PURE__ */ new Date(), "Asia/Bangkok", "yyyyMMdd-HHmmss") + ".encrypted.json", envelope, MimeType.PLAIN_TEXT);
      return { ok: true, id: out.getId() };
    } finally {
      lock.releaseLock();
    }
  }
  return __toCommonJS(gas_entry_exports);
})();

function doGet(e){return STCloud.page(e)}
function stRpc(r){return STCloud.rpc(r)}
function initializeDatabase_(){return STCloud.initialize()}
function backupToSchoolDrive_(){return STCloud.backup()}
