import * as React from 'react'
import { Button, NativeModules, Text, View } from 'react-native'
import styles from './styles'

export const addOne = (input: number) => input + 1

export const Counter = () => {
  const [count, setCount] = React.useState(0)

  return (
    <View style={styles.container}>
      <Text>You pressed {count} times</Text>
      <Button onPress={() => setCount(addOne(count))} title='Press Me' />
    </View>
  )
}

export default NativeModules.RNModuleTemplate
