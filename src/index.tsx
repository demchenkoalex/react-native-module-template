import * as React from 'react'
import { Button, NativeModules, Text, View } from 'react-native'

const addOne = (input: number) => input + 1

const Counter = () => {
  const [count, setCount] = React.useState(0)

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
      }}
    >
      <Text>You pressed {count} times</Text>
      <Button onPress={() => setCount(addOne(count))} title='Press Me'></Button>
    </View>
  )
}

export { addOne, Counter }

export default NativeModules.RNModuleTemplate
