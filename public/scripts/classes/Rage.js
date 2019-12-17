class Rage {
  constructor(player) {
    this.current = 0
    this.conversionValue = 0.0091107836 * player.lvl**2 + 3.225598133 * player.lvl + 4.2652911

    this.player = player
  }

  // Methods

  unbridledWrath() {
    return (Math.random() <= this.player.extraRageChance) ? 1 : 0
  }

  // https://blue.mmo-champion.com/topic/18325-the-new-rage-formula-by-kalgan/
  gainFromSwing(dmg) {
    let gain = dmg / this.conversionValue * 7.5
    gain += this.unbridledWrath(gain)
    this.current = clamp(m.round(this.current + gain))
  }

  gain(value) {
    this.current = clamp(m.round(this.current + value))
  }

  use(value) {
    if (value > this.current) {
      throw new Error(`Trying use ${value} rage while only has ${this.current}`)
    }

    this.current = clamp(m.round(this.current - value))
  }

  has(value) {
    return this.current >= value
  }

  lessThan(value) {
    return this.current <= value
  }
}