type Numbers = [number, number, number, number, number]

const operators = ['+', '-', '*', '/']
const n = 4

export const calcJamaica = (numbers: Numbers, answer: number) => {
  const results: string[] = []

  // 数字を総当たりで並び替え
  // 12345, 12354, 12435, 12453, ...
  for (let a of numbers) {
    for (let b of numbers) {
      if (a === b) continue
      for (let c of numbers) {
        if (a === c || b === c) continue
        for (let d of numbers) {
          if (a === d || b === d || c === d) continue
          for (let e of numbers) {
            if (a === e || b === e || c === e || d === e) continue

            operatorPermute([a, b, c, d, e])
          }
        }
      }
    }
  }

  // 記号を総当たりで並び替え
  // ++++, +++-, +++*, +++/, ++-+, ++*+, ++/+, ...
  function operatorPermute(
    nums: Numbers,
    strOperators: string = '',
    len: number = 0,
  ) {
    // 記号が4つで計算する
    // ex) res = 1 + 2 + 3 + 4 + 5
    if (len === 4) {
      const calcFormula = `${nums[0]}${strOperators[0]}${nums[1]}${strOperators[1]}${nums[2]}${strOperators[2]}${nums[3]}${strOperators[3]}${nums[4]}`
      const calcResult = looseJsonParse(calcFormula)

      if (calcResult !== answer) return

      results.push(`${calcFormula}=${calcResult}`)

      return
    }

    // 1つずつ記号を取り出して、strSymbolsに追加して再帰する
    for (let i = 0; i < n; i++) {
      operatorPermute(nums, strOperators + operators[i], len + 1)
    }
  }

  return results
}

// 文字列からJSの計算を実行
function looseJsonParse(obj: any) {
  return Function('"use strict";return (' + obj + ')')()
}
