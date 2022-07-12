const express = require('express');
const router = express.Router();

const getMoonPhase = () => {
  var today = new Date()
  var year = today.getFullYear()
  var month = today.getMonth() + 1
  var day = today.getDate()

  if (month <= 2) {
    year--
    month += 12
  }

  var A = Math.floor(year / 100)
  var B = Math.floor(A / 4)
  var C = 2 - A + B
  var E = 365.25 * (year + 4716)
  var F = 30.6001 * (month + 1)
  var JD = C + day + E + F - 1524.5

  var day_since_new = JD - 2451549.5
  var new_moons = day_since_new / 29.53
  return (new_moons % 1) * 29.53
}


router.get('/', async (req, res) => {
    try {
        res.json({
          moon_percent: getMoonPhase()
        });
    } catch {
        console.error(error);
        return res.status(500).send("Server error");
    }
})

module.exports = router;