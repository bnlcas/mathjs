'use strict'

function factory (type, config, load, typed) {
  const matrix = load(require('../../type/matrix/function/matrix'))

  /**
   * Create an array of linearly spaced values.
   * The array spans from start to start (inclusive), with the specified number of points.
   *
   * Syntax:
   *
   *     math.linspace(start, end, n_steps)           // Create a linearly space array that ranges from start to stop with n_points in between
   *
   * Examples:
   *
   *     math.linspace(0, 3, 4)       // [0, 1, 2, 3]
   *     math.linspace(0, 3, 7)      // [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0]
   *     math.range('2:1:6')     // [2, 3, 4, 5]
   *
   * See also:
   *
   *     range, ones, zeros, size, subset
   *
   * @param {*} args   Parameters describing the ranges `start`, `end`, and ``n_points`.
   * @return {Array | Matrix} range
   */

   const linspace = typed('linspace', {
     'number | BigNumber | Fraction, number | BigNumber | Fraction, number | BigNumber | Fraction': function (start, end, step) {
       // now, start, end, step can be different numeric types
       // this works fine here as long as we use functions like addScalar and multiplyScalar
       // to operate on them, instead of + and * which only work on numbers
      return _out(_linspace(start, end, step))
    }
  })

  //linspace.toTex = undefined // use default template

  return linspace

  function _out (arr) {
    return config.matrix === 'Array' ? arr : matrix(arr)
  }

  /**
   * Create a linspace with numbers.
   * @param {number} start
   * @param {number} end
   * @param {number} step
   * @returns {Array} range
   * @private
   */
  function _linspace (start, end, n_points) {
    let array = []
    let step = (end - start) / (n_points - 1)
    for(var i = 0; i < n_points; i += 1)
    {
      array.push(start + i * step)
    }
    return array
  }
}

exports.name = 'linspace'
exports.factory = factory
