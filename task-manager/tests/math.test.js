const { calculateTip } = require('../src/math')

test('Calculate total price with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Calculate total price with default tip value', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test