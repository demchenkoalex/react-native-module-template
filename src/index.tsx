import * as React from 'react'
import { Button, Text, View } from 'react-native'

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
      <Button onPress={() => setCount(count + 1)} title='Press Me'></Button>
    </View>
  )
}

export default Counter
