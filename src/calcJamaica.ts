export type Numbers = [number, number, number, number, number]

const operators = ['+', '-', '*', '/']
const n = 4

export const calcJamaica = (numbers: Numbers, answer: number) => {
  console.time()
  const results: string[] = []
  let resultCount = 0

  // 数字を総当たりで並び替え
  // 12345, 12354, 12435, 12453, ...
  for (let ai = 0; ai < 5; ai++) {
    const a = numbers[ai]
    for (let bi = 0; bi < 5; bi++) {
      const b = numbers[bi]
      if (ai === bi) continue
      for (let ci = 0; ci < 5; ci++) {
        const c = numbers[ci]
        if (ai === ci || bi === ci) continue
        for (let di = 0; di < 5; di++) {
          const d = numbers[di]
          if (ai === di || bi === di || ci === di) continue
          for (let ei = 0; ei < 5; ei++) {
            const e = numbers[ei]

            if (ai === ei || bi === ei || ci === ei || di === ei) continue
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
    if (resultCount > 10) {
      return
    }

    // 記号が4つで計算する
    // ex) res = 1 + 2 + 3 + 4 + 5
    if (len === 4) {
      const [a, b, c, d, e] = nums
      const [O1, O2, O3, O4] = strOperators

      const bracketsPatterns = [
        `${a}${O1}${b}${O2}${c}${O3}${d}${O4}${e}`,
        `(${a}${O1}${b})${O2}${c}${O3}${d}${O4}${e}`,
        `${a}${O1}(${b}${O2}${c})${O3}${d}${O4}${e}`,
        `${a}${O1}${b}${O2}(${c}${O3}${d})${O4}${e}`,
        `${a}${O1}${b}${O2}${c}${O3}(${d}${O4}${e})`,
        `(${a}${O1}${b}${O2}${c})${O3}${d}${O4}${e}`,
        `${a}${O1}(${b}${O2}${c}${O3}${d})${O4}${e}`,
        `${a}${O1}${b}${O2}(${c}${O3}${d}${O4}${e})`,
        `(${a}${O1}${b}${O2}${c}${O3}${d})${O4}${e}`,
        `${a}${O1}(${b}${O2}${c}${O3}${d}${O4}${e})`,
        `(${a}${O1}${b})${O2}(${c}${O3}${d})${O4}${e}`,
        `${a}${O1}(${b}${O2}${c})${O3}(${d}${O4}${e})`,
        `(${a}${O1}${b})${O2}${c}${O3}(${d}${O4}${e})`,
        `(${a}${O1}${b}${O2}${c})${O3}(${d}${O4}${e})`,
        `(${a}${O1}${b})${O2}(${c}${O3}${d}${O4}${e})`,
        `((${a}${O1}${b})${O2}${c})${O3}${d}${O4}${e}`,
        `${a}${O1}((${b}${O2}${c})${O3}${d})${O4}${e}`,
        `${a}${O1}${b}${O2}((${c}${O3}${d})${O4}${e})`,
        `(${a}${O1}(${b}${O2}${c}))${O3}${d}${O4}${e}`,
        `${a}${O1}(${b}${O2}(${c}${O3}${d}))${O4}${e}`,
        `${a}${O1}${b}${O2}(${c}${O3}(${d}${O4}${e}))`,
        `((${a}${O1}${b})${O2}${c}${O3}${d})${O4}${e}`,
        `(${a}${O1}(${b}${O2}${c})${O3}${d})${O4}${e}`,
        `(${a}${O1}${b}${O2}(${c}${O3}${d}))${O4}${e}`,
        `${a}${O1}((${b}${O2}${c})${O3}${d}${O4}${e})`,
        `${a}${O1}(${b}${O2}(${c}${O3}${d})${O4}${e})`,
        `${a}${O1}(${b}${O2}${c}${O3}(${d}${O4}${e}))`,
        `((${a}${O1}${b}${O2}${c})${O3}${d})${O4}${e}`,
        `(${a}${O1}(${b}${O2}${c}${O3}${d}))${O4}${e}`,
        `${a}${O1}((${b}${O2}${c}${O3}${d})${O4}${e})`,
        `${a}${O1}(${b}${O2}(${c}${O3}${d}${O4}${e}))`,
        `((${a}${O1}${b})${O2}${c})${O3}(${d}${O4}${e})`,
        `(${a}${O1}(${b}${O2}${c}))${O3}(${d}${O4}${e})`,
        `(${a}${O1}${b})${O2}((${c}${O3}${d})${O4}${e})`,
        `(${a}${O1}${b})${O2}(${c}${O3}(${d}${O4}${e}))`,
        `((${a}${O1}${b})${O2}(${c}${O3}${d}))${O4}${e}`,
        `${a}${O1}((${b}${O2}${c})${O3}(${d}${O4}${e}))`,
        `(((${a}${O1}${b})${O2}${c})${O3}${d})${O4}${e}`,
        `((${a}${O1}(${b}${O2}${c}))${O3}${d})${O4}${e}`,
        `(${a}${O1}((${b}${O2}${c})${O3}${d}))${O4}${e}`,
        `(${a}${O1}(${b}${O2}(${c}${O3}${d})))${O4}${e}`,
        `${a}${O1}(((${b}${O2}${c})${O3}${d})${O4}${e})`,
        `${a}${O1}((${b}${O2}(${c}${O3}${d}))${O4}${e})`,
        `${a}${O1}(${b}${O2}((${c}${O3}${d})${O4}${e}))`,
        `${a}${O1}(${b}${O2}(${c}${O3}(${d}${O4}${e})))`,
      ]

      for (let i = 0; i < bracketsPatterns.length; i++) {
        const calcFormula = bracketsPatterns[i]
        const calcResult = looseJsonParse(calcFormula)

        if (calcResult !== answer) continue

        resultCount++
        if (resultCount > 10) {
          return
        }
        results.push(`${calcFormula}=${calcResult}`)
      }

      return
    }

    // 1つずつ記号を取り出して、strSymbolsに追加して再帰する
    for (let i = 0; i < n; i++) {
      operatorPermute(nums, strOperators + operators[i], len + 1)
    }
  }

  console.timeEnd()
  return results
}

// 文字列からJSの計算を実行
function looseJsonParse(obj: any) {
  return Function('"use strict";return (' + obj + ')')()
}
