import React from 'react'
import { StyleSheet, Text, Dimensions, TouchableHighlight } from 'react-native'

export default props => {
  const stylesButton = [styles.button]
  if (props.operation) stylesButton.push(styles.operationButton)
  if (props.base) stylesButton.push(styles.baseButton)
  return (
    <TouchableHighlight onPress={() => props.onClick(props.label)}>
      <Text style={stylesButton}>{props.label}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    height: Dimensions.get('window').height / 8,
    width: Dimensions.get('window').width / 4,
    padding: 20,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#888',
  },
  operationButton: {
    color: '#fff',
    backgroundColor: '#fa8231',
  },
  baseButton: {
    color: '#fff',
    backgroundColor: '#A44',
    width: (Dimensions.get('window').width / 4) * 1.5,
  },
})