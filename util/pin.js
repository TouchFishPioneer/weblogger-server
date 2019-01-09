/**
 * 生成n个k位的PIN，每位数字范围是0～9,均匀分布
 * @param n
 * @param k
 * @returns {Array}
 */
function getNRandomPins (n, k) {
  if ((n * k) % 10 !== 0) {
    console.error('Invalid parameter! n should be divided by 10')
    return []
  }
  let numPerDigit = n * k / 10
  let digitSequence = getDigitSequence(numPerDigit)
  let sequence = permutation(digitSequence)
  let nums = getNumsFromSequence(sequence, k)
  return getPinsFromNums(nums, k)
}

function getValidPins (n, k) {
  let pins = getNRandomPins(n, k)
  while (!isPinValid(pins, k)) {
    pins = getNRandomPins(n, k)
  }
  return pins
}

function isPinValid (pins, k) {
  let nums = pins.map((pin) => {
    return Number(pin)
  })
  if (k > 1 && isArrayRepeat(nums)) {
    return false
  }

  let map = {}
  pins.forEach((pin) => {
    for (let i = 0; i < pin.length; i++) {
      if (map[pin[i]] === undefined) {
        map[pin[i]] = 0
      }
      map[pin[i]] += 1
    }
  })

  let nDigit = pins.length * k / 10
  for (let index in map) {
    if (map.hasOwnProperty(index)) {
      if (map[index] !== nDigit) {
        console.log(`map[${index}] = ${map[index]}`)
        return false
      }
    }
  }
  return true
}

function getDigitSequence (numPerDigit) {
  let s = []
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < numPerDigit; j++) {
      s.push(i)
    }
  }
  return s
}

function permutation (sequence) {
  for (let i = 1; i < sequence.length; i++) {
    let j = getRandomIntInclusive(0, i)
    let tmp = sequence[i]
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
  let hash = {}
  for (let i = 0; i < arr.length; i++) {
    if (hash[arr[i]]) {
      console.log(`arr has repeat element: ${arr[i]}`)
      return true
    }
    hash[arr[i]] = true
  }
  return false
}

function getNumsFromSequence (sequence, k) {
  if (sequence.length % k !== 0) {
    console.error(`Illegal sequence! ${sequence.length} can not divided by ${k}.`)
    return
  }
  let nums = []
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
