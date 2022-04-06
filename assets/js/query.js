const query = {}

query.new = () => {
  return {
    'w': [],
    'r': [],
    'o': [],
    'p': {},
    'j': []
  }
}

query.toF = (q, arrKv, arrKm) => {
  for (var i in arrKv) {
    query.toR(q, i, arrKv[i], arrKm[i])
  }
  return q
}

query.toR = (q, k, v, m, n, t) => {
  if (v === '') {
    return q
  }
  if (m !== 'IS') {
    if (v === null) {
      return q
    }
  }
  if (typeof m === 'undefined') {
    m = 'LK'
  }
  if (typeof n === 'undefined') {
    n = 'a1'
  }
  if (typeof t === 'undefined') {
    t = 'and'
  }
  let rObj = null
  q.r.forEach(function (val, i) {
    if (val.n === n) {
      rObj = val
    }
  })
  if (rObj) {
    rObj.w.push({
      'k': k,
      'v': v,
      'm': m
    })
  } else {
    q.r.push({
      'n': n,
      't': t,
      'w': [{
        'k': k,
        'v': v,
        'm': m
      }]
    })
  }
  return q
}

query.toW = (q, k, v, m) => {
  if (v === '') {
    return q
  }
  if (m !== 'IS') {
    if (v === null) {
      return q
    }
  }
  if (typeof m === 'undefined') {
    m = 'LK'
  }
  q.w.push({
    'k': k,
    'v': v,
    'm': m
  })
  return q
}

query.toWNull = (q, k) => {
  q.w.push({
    'k': k,
    'v': null,
    'm': 'IS'
  })
  return q
}

query.toWNotNull = (q, k) => {
  q.w.push({
    'k': k,
    'v': null,
    'm': 'NIS'
  })
  return q
}
// 简单处理，单个join on 条件
query.toJ = (q, k, v, m, n) => {
  if (v === null || v === '') {
    return q
  }
  if (typeof m === 'undefined') {
    m = 'LK'
  }
  let rObj = null
  q.j.forEach(function (val, i) {
    if (val.n === n) {
      rObj = val
    }
  })
  if (rObj) {
    rObj.r.w.push({
      'k': k,
      'v': v,
      'm': m
    })
  } else {
    q.j.push({
      'n': n,
      'r': [{
        't': 'and',
        'w': [{
          'k': k,
          'v': v,
          'm': m
        }]
      }]
    })
  }
  return q
}

query.toO = (q, k, t) => {
  if (typeof k === 'undefined' || k === '') {
    return q
  }
  if (typeof t === 'undefined') {
    t = 'desc'
  }
  q.o.push({
    'k': k,
    't': t
  })
  return q
}

query.toP = (q, n, s, c) => {
  q.p = {
    'n': n,
    's': s,
    'c': c
  }
  return q
}

query.toJsonStr = (q) => {
  return JSON.stringify(q)
}

query.toEncode = (q) => {
  return encodeURIComponent(JSON.stringify(q))
}

export default query
