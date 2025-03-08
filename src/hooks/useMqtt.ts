import { onBeforeUnmount, onMounted } from 'vue'
// useMqtt.js
import { mqttServer } from '@/utils/mqtt'

export function useMqtt<T>(mqttHooks: Record<string, (payload: T) => void>) {
  // 主题Map
  const topicMap = new Map()

  onMounted(subscribeTopic)
  onBeforeUnmount(unsubscribeTopic)

  function subscribeTopic() {
    Object.keys(mqttHooks).forEach((topic) => {
      if (mqttServer.isConnected()) {
        subscribe(topic, mqttHooks[topic])
      }
    })
    mqttServer.mqttClient.on('message', handleMqttMessage)
  }

  function unsubscribeTopic() {
    Array.from(topicMap).forEach((item) => {
      if (mqttServer.isConnected()) {
        unsubscribe(item[0])
      }
    })
    mqttServer.mqttClient?.off?.('message', handleMqttMessage)
  }

  // 消息监听处理
  function handleMqttMessage(messageTopic: string, message: any) {
    if (topicMap.has(messageTopic)) {
      const objectData = JSON.parse(message)
      const callback = topicMap.get(messageTopic)
      if (typeof callback === 'function') {
        callback(objectData)
      }
    }
  }

  // 发送消息
  function publish(topic, message) {
    mqttServer.publish(topic, {
      ...message,
      // ...一些公用的参数
    })
  }

  // 订阅某个主题
  function subscribe(topic: string, callback: (payload: any) => void) {
    mqttServer.subscribe(topic)
    topicMap.set(topic, callback)
  }

  // 取消订阅某个主题
  function unsubscribe(topic) {
    mqttServer.unsubscribe(topic)
    topicMap.delete(topic)
  }

  return {
    subscribe,
    unsubscribe,
    publish,
  }
}
