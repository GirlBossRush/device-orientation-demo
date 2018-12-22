demoDirection = 'unknown'

function updateDemo (position) {
  if (position.horizontalChanged && position.verticalChanged) {
    demoDirection = `${position.horizontal} & ${position.vertical}`
  } else if (position.horizontalChanged) {
    demoDirection = position.horizontal
  } else if (position.verticalChanged) {
    demoDirection = position.vertical
  }

  document.getElementById('alpha').textContent = position.alpha
  document.getElementById('beta').textContent = position.beta
  document.getElementById('gamma').textContent = position.gamma
  document.getElementById('horizontal-delta').textContent = position.horizontalDelta
  document.getElementById('vertical-delta').textContent = position.verticalDelta
  document.getElementById('direction').textContent = demoDirection
}

// Reject minor position adjustments
const deltaThreshold = 1.4
toPrecision = number => parseFloat(number.toFixed(4))


function getDefaultPosition () {
  return {
    orientation: window.innerHeight > window.innerWidth ? 'vertical' : 'horizontal',
    horizontal: 'left',
    horizontalDelta: 0,
    vertical: 'up',
    verticalDelta: 0,
    alpha: 0,
    beta: 0,
    gamma: 0
  }
}

let previousPosition = getDefaultPosition()

function handleDeviceOrientation (event) {
  const orientation = window.innerHeight > window.innerWidth ? 'vertical' : 'horizontal'
  const alpha = toPrecision(event.alpha) // Horizontal axis
  const beta = toPrecision(event.beta)   // Vertical axis
  const gamma = toPrecision(event.gamma) // Rotation axis

  const horizontalDelta = toPrecision(Math.abs(alpha) - Math.abs(previousPosition.alpha))
  const horizontalChanged = Math.abs(horizontalDelta) > 1

  const verticalDelta = toPrecision(Math.abs(beta) - Math.abs(previousPosition.beta))
  const verticalChanged = Math.abs(verticalDelta) > 1

  let horizontal
  if (horizontalChanged) {
    horizontal = alpha > previousPosition.alpha ? 'right' : 'left'
  } else {
    horizontal = previousPosition.horizontal
  }

  let vertical
  if (verticalChanged) {
    // if (gamma > 0)
    vertical = gamma > previousPosition.gamma ? 'down' : 'up'
  } else {
    vertical = previousPosition.vertical
  }

  const currentPosition = {
    horizontal,
    vertical,
    horizontalChanged,
    verticalChanged,
    horizontalDelta,
    verticalDelta,
    alpha,
    beta,
    gamma
  }

  console.log(currentPosition)
  updateDemo(currentPosition)

  previousPosition = currentPosition
}

function init () {
  if (!window.DeviceOrientationEvent) {
    // alert('Device orientation not supported')
    console.log('Device orientation not supported')
    return
  }

  window.addEventListener('deviceorientation', handleDeviceOrientation);

  window.addEventListener('resize', () => {
    previousPosition = getDefaultPosition()
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
