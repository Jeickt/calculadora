import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

import Button from './components/Button'
import Display from './components/Display'

export default () => {
  const [values, setValues] = useState([0, 0])
  const [displayValue, setDisplayValue] = useState('0')
  const [operation, setOperation] = useState(null)
  const [clearDisplay, setClearDisplay] = useState(false)
  const [current, setCurrent] = useState(0)

  const changeDigit = valor => {
    const clear = displayValue === '0' || clearDisplay

    if (valor === '.' && !clear && displayValue.includes('.')) return

    const currentValue = clear ? '' : displayValue
    const display = currentValue + valor
    setDisplayValue(display)
    setClearDisplay(false)

    if (valor !== '.') {
      const newValue = parseFloat(display)
      const vals = [...values]
      vals[current] = newValue
      setValues(vals)
    }
  }

  const clearMemory = () => {
    setValues([0, 0])
    setDisplayValue('0')
    setOperation(null)
    setClearDisplay(false)
    setCurrent(0)
  }

  const makeSingleOperation = op => {
    let currentValue = parseFloat(displayValue)
    switch (op) {
      case 'CE': currentValue = 0; break
      case '%': currentValue /= 100; break
      case '1/x': currentValue = 1 / currentValue; break
      case 'x^2': currentValue = Math.pow(currentValue, 2); break
      case '2√x': currentValue = Math.sqrt(currentValue); break
      default: currentValue = currentValue * -1
    }
    setDisplayValue(`${currentValue}`)
    setClearDisplay(true)

    const vals = [...values]
    vals[current] = currentValue
    setValues(vals)
  }

  const makeOperation = op => {
    if (current === 0) {
      if (op === '=') {
        setClearDisplay(true)
      } else {
        setOperation(op)
        setCurrent(1)
        setClearDisplay(true)
      }
    } else {
      const equals = op === '='
      const vals = [...values]
      try {
        vals[0] = eval(`${values[0]} ${operation} ${values[1]}`)
      } catch (e) {
        vals[0] = values[0]
      }
      vals[1] = 0
      setValues(vals)
      setDisplayValue(`${vals[0]}`)
      setOperation(equals ? null : op)
      setCurrent(equals ? 0 : 1)
      setClearDisplay(true)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label='%' operation onClick={makeSingleOperation} />
        <Button label='CE' base onClick={makeSingleOperation} />
        <Button label='C' base onClick={clearMemory} />
        <Button label='1/x' operation onClick={makeSingleOperation} />
        <Button label='x^2' operation onClick={makeSingleOperation} />
        <Button label='2√x' operation onClick={makeSingleOperation} />
        <Button label='/' operation onClick={makeOperation} />
        <Button label='7' onClick={changeDigit} />
        <Button label='8' onClick={changeDigit} />
        <Button label='9' onClick={changeDigit} />
        <Button label='*' operation onClick={makeOperation} />
        <Button label='4' onClick={changeDigit} />
        <Button label='5' onClick={changeDigit} />
        <Button label='6' onClick={changeDigit} />
        <Button label='-' operation onClick={makeOperation} />
        <Button label='1' onClick={changeDigit} />
        <Button label='2' onClick={changeDigit} />
        <Button label='3' onClick={changeDigit} />
        <Button label='+' operation onClick={makeOperation} />
        <Button label='+/-' operation onClick={makeSingleOperation} />
        <Button label='0' onClick={changeDigit} />
        <Button label='.' onClick={changeDigit} />
        <Button label='=' operation onClick={makeOperation} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})
