const log = require('./log')

// Generate valid pin array, which satisfies the uniform distribution
function getValidPins (n, k) {
  let pins = getNRandomPins(n, k)
  while (!isPinValid(pins, k)) {
    pins = getNRandomPins(n, k)
  }
  return pins
}

function getNRandomPins (n, k) {
  if ((n * k) % 10 !== 0) {
    log(3, 'Invalid parameter! The amount of pins must be an integer that is divisible by 10.')
    return []
  }
  const numPerDigit = n * k / 10
  const digitSequence = getDigitSequence(numPerDigit)
  const sequence = permutation(digitSequence)
  const nums = getNumsFromSequence(sequence, k)
  return getPinsFromNums(nums, k)
}

function isPinValid (pins, k) {
  const nums = pins.map((pin) => {
    return Number(pin)
  })
  if (k > 1 && isArrayRepeat(nums)) {
    return false
  }

  const map = {}
  pins.forEach((pin) => {
    for (let i = 0; i < pin.length; i++) {
      if (map[pin[i]] === undefined) {
        map[pin[i]] = 0
      }
      map[pin[i]] += 1
    }
  })

  const nDigit = pins.length * k / 10
  for (const index in map) {
    if (Object.prototype.hasOwnProperty.call(map, index)) {
      if (map[index] !== nDigit) {
        console.log(`map[${index}] = ${map[index]}`)
        return false
      }
    }
  }
  return true
}

function getDigitSequence (numPerDigit) {
  const s = []
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < numPerDigit; j++) {
      s.push(i)
    }
  }
  return s
}

function permutation (sequence) {
  for (let i = 1; i < sequence.length; i++) {
    const j = getRandomIntInclusive(0, i)
    const tmp = sequence[i]
    sequence[i] = sequence[j]
    sequence[j] = tmp
  }
  return sequence
}

function getPinsFromNums (nums, k) {
  return nums.map((num) => {
    return num2pin(num, k)
  })
}

function isArrayRepeat (arr) {
  const hash = {}
  for (let i = 0; i < arr.length; i++) {
    if (hash[arr[i]]) {
      log(2, `arr has repeat element: ${arr[i]}`)
      return true
    }
    hash[arr[i]] = true
  }
  return false
}

function getNumsFromSequence (sequence, k) {
  if (sequence.length % k !== 0) {
    log(3, `Illegal sequence! ${sequence.length} can not divided by ${k}.`)
    return
  }
  const nums = []
  while (sequence.length) {
    nums.push(arr2num(sequence.splice(0, k)))
  }
  return nums
}

function arr2num (arr) {
  return Number(arr.join(''))
}

function num2pin (num, k) {
  let pin = num.toString()
  while (pin.length < k) {
    pin = '0' + pin
  }
  return pin
}

function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

exports.getValidPins = getValidPins
